import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'mockDb.json');

// Get hackathons for a student
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const regNo = searchParams.get('regNo');

    try {
        const rawData = fs.readFileSync(dbPath, 'utf-8');
        const db = JSON.parse(rawData);

        if (regNo) {
            const studentData = db.filter((h: any) => h.regNo.toLowerCase() === regNo.toLowerCase());
            return NextResponse.json(studentData);
        }

        return NextResponse.json(db);
    } catch (error) {
        return NextResponse.json([]);
    }
}

// Add a hackathon
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const rawData = fs.readFileSync(dbPath, 'utf-8');
        const db = JSON.parse(rawData);

        const newEntry = {
            id: `h-${Date.now()}`,
            ...body,
            submittedAt: new Date().toISOString()
        };

        db.push(newEntry);
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

        return NextResponse.json({ success: true, entry: newEntry });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add record' }, { status: 500 });
    }
}
