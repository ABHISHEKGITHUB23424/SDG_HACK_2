import { PrismaClient } from "./generated-client/index.js";

const prisma = new PrismaClient();

async function main() {
    // Clear existing data
    await prisma.callLog.deleteMany({});
    await prisma.participation.deleteMany({});
    await prisma.contest.deleteMany({});
    await prisma.student.deleteMany({});

    const students = [
        { name: "Abhishek Kumar S A", rollNo: "24CS0018", phone: "+919876543210", email: "abhishek@example.com", leetcodeId: "LC_STUDENT_01", skillrackId: "SR_STUDENT_01" },
        { name: "Akash Arul Kumar", rollNo: "24CS0037", phone: "+919876543211", email: "akash@example.com", leetcodeId: "LC_STUDENT_02", skillrackId: "SR_STUDENT_02" },
        { name: "Rakesh A", rollNo: "24CS0726", phone: "+919876543212", email: "rakesh@example.com", leetcodeId: "LC_STUDENT_03", skillrackId: "SR_STUDENT_03" },
        { name: "Richard Ruban Kumar R", rollNo: "24CS0742", phone: "+919876543213", email: "richard@example.com", leetcodeId: "LC_STUDENT_04", skillrackId: "SR_STUDENT_04" }
    ];

    const createdStudents = await Promise.all(
        students.map((s) => prisma.student.create({ data: s }))
    );

    const now = new Date();
    const twoMinutesFromNow = new Date(now.getTime() + 2 * 60 * 1000);
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const contests = [
        {
            name: "Weekly Contest #42 (Testing)",
            platform: "LeetCode",
            externalId: "weekly-42",
            scheduledAt: twoMinutesFromNow,
            durationMins: 90,
            status: "SCHEDULED"
        },
        {
            name: "Past Coding Sprint",
            platform: "SkillRack",
            externalId: "sprint-101",
            scheduledAt: yesterday,
            durationMins: 60,
            status: "COMPLETED"
        }
    ];

    for (const contestData of contests) {
        const contest = await prisma.contest.create({ data: contestData });

        // Create participations for all students
        await Promise.all(
            createdStudents.map((student) =>
                prisma.participation.create({
                    data: {
                        studentId: student.id,
                        contestId: contest.id,
                        status: "PENDING"
                    }
                })
            )
        );
    }

    console.log("Seeding complete!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
