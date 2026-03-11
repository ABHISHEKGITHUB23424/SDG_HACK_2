"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CoursesPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                    <BookOpen className="w-8 h-8 text-indigo-400" /> Course Completion Tracking
                </h1>
                <p className="text-slate-400 mt-2">Monitor student progress on enrolled platform courses.</p>
            </div>

            <div className="flex justify-between items-center gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <Input
                        placeholder="Search student or course..."
                        className="pl-9 bg-slate-900 border-slate-800 text-slate-200"
                    />
                </div>
                <Button variant="outline" className="border-slate-800 bg-slate-900 text-slate-300">
                    <Filter className="w-4 h-4 mr-2" /> Filter
                </Button>
            </div>

            <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                    <CardTitle className="text-lg">Recent Progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader className="bg-slate-950/50">
                            <TableRow className="border-slate-800">
                                <TableHead className="text-slate-300">Student</TableHead>
                                <TableHead className="text-slate-300">Course</TableHead>
                                <TableHead className="text-slate-300">Platform</TableHead>
                                <TableHead className="text-slate-300">Progress</TableHead>
                                <TableHead className="text-slate-300">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow className="border-slate-800 hover:bg-slate-800/50">
                                <TableCell className="font-medium text-slate-200">Rakesh A</TableCell>
                                <TableCell className="text-slate-400">Advanced Java Masterclass</TableCell>
                                <TableCell><Badge variant="outline" className="border-blue-500/50 text-blue-400">SkillRack</Badge></TableCell>
                                <TableCell className="text-slate-400">85%</TableCell>
                                <TableCell><Badge className="bg-green-500/20 text-green-400 border-none">On Track</Badge></TableCell>
                            </TableRow>
                            <TableRow className="border-slate-800 hover:bg-slate-800/50">
                                <TableCell className="font-medium text-slate-200">Sruthi M</TableCell>
                                <TableCell className="text-slate-400">Data Structures & Algorithms</TableCell>
                                <TableCell><Badge variant="outline" className="border-yellow-500/50 text-yellow-400">LeetCode Explore</Badge></TableCell>
                                <TableCell className="text-slate-400">30%</TableCell>
                                <TableCell><Badge className="bg-red-500/20 text-red-400 border-none">Falling Behind</Badge></TableCell>
                            </TableRow>
                            <TableRow className="border-slate-800 hover:bg-slate-800/50">
                                <TableCell className="font-medium text-slate-200">Vikram S</TableCell>
                                <TableCell className="text-slate-400">AWS Cloud Practitioner</TableCell>
                                <TableCell><Badge variant="outline" className="border-orange-500/50 text-orange-400">Coursera</Badge></TableCell>
                                <TableCell className="text-slate-400">100%</TableCell>
                                <TableCell><Badge className="bg-blue-500/20 text-blue-400 border-none">Completed</Badge></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
