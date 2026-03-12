import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding databases with massive departments...");

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
            passwordHash: "staff123"
        }
    });

    await prisma.user.create({
        data: {
            name: "Admin",
            email: "admin@academy.edu",
            role: "ADMIN",
            passwordHash: "admin123"
        }
    });

    const departments = [
        { name: "CSE", code: "CS", count: 2000 },
        { name: "ECE", code: "EC", count: 100 },
        { name: "EEE", code: "EE", count: 100 },
        { name: "MECH", code: "ME", count: 100 },
        { name: "CIVIL", code: "CE", count: 100 },
        { name: "AIDS", code: "AD", count: 100 },
        { name: "AIML", code: "AL", count: 100 },
        { name: "VLSI", code: "VL", count: 100 },
        { name: "CSBS", code: "CB", count: 100 },
        { name: "BME", code: "BM", count: 100 },
        { name: "IT", code: "IT", count: 100 },
        { name: "ACT", code: "AC", count: 100 },
    ];

    const studentBatch: any[] = [];
    const passwordHash = "password123";
    const year = 2024;

    for (const dept of departments) {
        // --- STAFF GENERATION ---
        const staffCount = dept.code === "CS" ? 200 : 20;
        const staffBatch: any[] = [];
        for (let i = 1; i <= staffCount; i++) {
            const paddedNumber = String(i).padStart(4, "0");
            const uniqueId = `24${dept.code}${paddedNumber}`;
            staffBatch.push({
                name: `Staff ${dept.name} ${i}`,
                email: `${uniqueId.toLowerCase()}@academy.edu`,
                role: "STAFF",
                passwordHash: "password123"
            });
        }
        await prisma.user.createMany({ data: staffBatch });
        console.log(`Inserted ${staffCount} STAFF for ${dept.name}`);

        // --- STUDENT GENERATION ---
        for (let i = 1; i <= dept.count; i++) {
            const paddedNumber = String(i).padStart(4, "0");
            const rollNo = `24${dept.code}${paddedNumber}`;
            studentBatch.push({
                name: `Student ${dept.name} ${i}`,
                rollNo: rollNo,
                year,
                department: dept.name,
                passwordHash,
                cgpa: 8.5,
                githubId: `github_${rollNo.toLowerCase()}`,
                hackathonCount: Math.floor(Math.random() * 3),
                semesterHistory: JSON.stringify([10, 8, 9])
            });
        }
    }

    // SQLite has a maximum number of variables per query, so we chunk the inserts
    const chunkSize = 500;
    for (let i = 0; i < studentBatch.length; i += chunkSize) {
        const chunk = studentBatch.slice(i, i + chunkSize);
        await prisma.student.createMany({
            data: chunk
        });
        console.log(`Inserted ${i + chunk.length} / ${studentBatch.length} students`);
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
