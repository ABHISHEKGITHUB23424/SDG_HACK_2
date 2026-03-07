import { PrismaClient } from "../../prisma/generated-client/index.js";

const prisma = new PrismaClient();

async function main() {
    const contestId = "cmmf9835p000voxnac11m15qc";
    const studentPhone = "+918870149706";
    const studentName = "Abhishek (Demo)";
    const studentRollNo = "DEMO001";

    console.log("Searching for contest...");
    const contest = await prisma.contest.findUnique({
        where: { id: contestId }
    });

    if (!contest) {
        console.error("Contest NOT found in DB!");
        return;
    }

    console.log("Contest found:", contest.name);

    console.log("Checking for demo student...");
    let student = await prisma.student.findFirst({
        where: { phone: studentPhone }
    });

    if (!student) {
        console.log("Creating demo student...");
        student = await prisma.student.create({
            data: {
                name: studentName,
                rollNo: studentRollNo,
                phone: studentPhone,
                email: "demo@example.com",
                cgpa: 9.0,
                leetcodeId: "AB_LC_DEMO",
                skillrackId: "AB_SR_DEMO"
            }
        });
    } else {
        console.log("Student already exists:", student.name);
    }

    console.log("Adding participation for student in contest...");
    const existingParticipation = await prisma.participation.findFirst({
        where: {
            contestId: contestId,
            studentId: student.id
        }
    });

    if (!existingParticipation) {
        await prisma.participation.create({
            data: {
                contestId: contestId,
                studentId: student.id,
                status: "MISSING" // Start as missing to trigger auto-pilot call
            }
        });
        console.log("Participation added as MISSING.");
    } else {
        await prisma.participation.update({
            where: { id: existingParticipation.id },
            data: { status: "MISSING" }
        });
        console.log("Existing participation updated to MISSING.");
    }

    console.log("Setup complete! अभिषेक, now you will appear in the dashboard and receive the call.");
}

main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});
