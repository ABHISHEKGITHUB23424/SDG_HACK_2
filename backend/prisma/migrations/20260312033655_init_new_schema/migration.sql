-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "rollNo" TEXT NOT NULL,
    "year" INTEGER NOT NULL DEFAULT 2024,
    "department" TEXT NOT NULL DEFAULT 'CSE',
    "section" TEXT DEFAULT 'A',
    "passwordHash" TEXT NOT NULL DEFAULT 'password123',
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "leetcodeId" TEXT,
    "skillrackId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cgpa" REAL DEFAULT 0,
    "githubId" TEXT,
    "hackathonCount" INTEGER DEFAULT 0,
    "semesterHistory" TEXT DEFAULT '[]'
);

-- CreateTable
CREATE TABLE "Contest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "scheduledAt" DATETIME NOT NULL,
    "durationMins" INTEGER NOT NULL,
    "cronJobId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'SCHEDULED',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Participation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" TEXT NOT NULL,
    "contestId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "joinedAt" DATETIME,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Participation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Participation_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CallLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" TEXT NOT NULL,
    "contestId" TEXT NOT NULL,
    "vapiCallId" TEXT,
    "callStatus" TEXT NOT NULL DEFAULT 'INITIATED',
    "whatsappSent" BOOLEAN NOT NULL DEFAULT false,
    "whatsappStatus" TEXT,
    "initiatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "answeredAt" DATETIME,
    "completedAt" DATETIME,
    "triggeredBy" TEXT NOT NULL,
    "errorMessage" TEXT,
    CONSTRAINT "CallLog_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CallLog_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_rollNo_key" ON "Student"("rollNo");

-- CreateIndex
CREATE UNIQUE INDEX "Participation_studentId_contestId_key" ON "Participation"("studentId", "contestId");
