import { PrismaClient } from "./generated-client/index.js";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding backend db with massive departments...");

    await prisma.callLog.deleteMany({});
    await prisma.participation.deleteMany({});
    await prisma.contest.deleteMany({});
    await prisma.student.deleteMany({});
    const sections = ["A", "B", "C"];
    const departments = [
        { name: "CSE", code: "CS", count: 15 },
        { name: "IT", code: "IT", count: 5 },
    ];

    const studentBatch: any[] = [];
    const passwordHash = "password123";
    const year = 2024;

    for (const dept of departments) {
        for (let i = 1; i <= dept.count; i++) {
            const paddedNumber = String(i).padStart(4, "0");
            const rollNo = `24${dept.code}${paddedNumber}`;
            const section = sections[Math.floor(Math.random() * sections.length)];
            studentBatch.push({
                name: `Student ${dept.name} ${i}`,
                rollNo: rollNo,
                year,
                department: dept.name,
                section: section,
                passwordHash,
                phone: "+911234567890",
                email: `${rollNo.toLowerCase()}@academy.edu`,
                leetcodeId: `lc_${rollNo.toLowerCase()}`,
                skillrackId: `sr_${rollNo.toLowerCase()}`,
                cgpa: 8.5,
                githubId: `github_${rollNo.toLowerCase()}`,
                hackathonCount: Math.floor(Math.random() * 3),
                semesterHistory: JSON.stringify([10, 8, 9])
            });
        }
    }

    // Insert students
    for (const student of studentBatch) {
        await prisma.student.create({ data: student });
    }
    console.log(`Inserted ${studentBatch.length} students into backend`);

    // Create a live contest
    const contest = await prisma.contest.create({
        data: {
            name: "Weekly LeetCode #435",
            platform: "LeetCode",
            externalId: "weekly-435",
            scheduledAt: new Date(),
            durationMins: 90,
            status: "IN_PROGRESS"
        }
    });

    const students = await prisma.student.findMany({ take: 10 });
    for (let j = 0; j < students.length; j++) {
        const status = j < 4 ? "JOINED" : (j < 7 ? "MISSING" : "PENDING");
        await prisma.participation.create({
            data: {
                studentId: students[j].id,
                contestId: contest.id,
                status: status,
                joinedAt: status === "JOINED" ? new Date() : null
            }
        });
    }

    console.log("Seeding complete with contest and participations!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
