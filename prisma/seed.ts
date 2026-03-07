import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.riskReport.deleteMany({});
    await prisma.oDRequest.deleteMany({});
    await prisma.participant.deleteMany({});
    await prisma.contest.deleteMany({});
    await prisma.student.deleteMany({});
    await prisma.user.deleteMany({});

    await prisma.user.create({
        data: {
            name: "Staff",
            email: "staff@academy.edu",
            role: "STAFF",
            passwordHash: "staff123" // Note: in real world, hash this!
        }
    });

    const students = await Promise.all([
        prisma.student.create({
            data: {
                name: "Alice Johnson",
                rollNo: "CS101",
                cgpa: 8.5,
                githubId: "alicejs",
                hackathonCount: 3,
                semesterHistory: JSON.stringify([10, 8, 9]) // e.g. events attended per semester
            }
        }),
        prisma.student.create({
            data: {
                name: "Bob Smith",
                rollNo: "CS102",
                cgpa: 7.2,
                githubId: "bobcoder",
                hackathonCount: 1,
                semesterHistory: JSON.stringify([5, 4, 1]) // significant drop
            }
        }),
        prisma.student.create({
            data: {
                name: "Charlie Brown",
                rollNo: "CS103",
                cgpa: 9.0,
                githubId: "charlieops",
                hackathonCount: 5,
                semesterHistory: JSON.stringify([8, 9, 10])
            }
        })
    ]);

    const now = new Date();
    const contest = await prisma.contest.create({
        data: {
            title: "Global AI Hackathon 2026",
            startTime: new Date(now.getTime() - 20 * 60000), // 20 mins ago
            participants: {
                create: [
                    { studentId: students[0].id, status: "JOINED" },
                    { studentId: students[1].id, status: "NOT_JOINED" }, // Not joined, passed 15 minutes!
                    { studentId: students[2].id, status: "PENDING" }
                ]
            }
        }
    });

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
