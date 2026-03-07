"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRight } from "lucide-react";

export default function StudentsDirectory() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetch("/api/students").then(res => res.json()).then(setStudents);
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Students Directory</h2>
                    <p className="text-slate-400">View progress and tracking information for all students.</p>
                </div>
            </div>

            <Card className="bg-slate-900 border-slate-800 text-slate-100">
                <CardHeader>
                    <CardTitle>All Students</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="border-slate-800">
                                <TableHead>System ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Roll No</TableHead>
                                <TableHead className="text-center">CGPA</TableHead>
                                <TableHead className="text-center">Hackathons</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students.map((stu: any) => (
                                <TableRow key={stu.id} className="border-slate-800">
                                    <TableCell className="text-slate-500 text-xs font-mono">{stu.id}</TableCell>
                                    <TableCell className="font-semibold text-indigo-300">{stu.name}</TableCell>
                                    <TableCell>{stu.rollNo}</TableCell>
                                    <TableCell className="text-center font-mono">{stu.cgpa.toFixed(2)}</TableCell>
                                    <TableCell className="text-center bg-slate-950 rounded-md font-mono">{stu.hackathonCount}</TableCell>
                                    <TableCell className="text-right">
                                        <Link href={`/dashboard/students/${stu.id}`} className="inline-flex items-center text-sm text-slate-400 hover:text-indigo-400">
                                            View Profile <ArrowRight className="w-4 h-4 ml-1" />
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
