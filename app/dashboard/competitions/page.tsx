"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Medal, Search, Plus, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CompetitionsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                        <Medal className="w-8 h-8 text-amber-500" /> Competitions Registration
                    </h1>
                    <p className="text-slate-400 mt-2">Manage external hackathons, global events, and student registrations.</p>
                </div>
                <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                    <Plus className="w-4 h-4 mr-2" /> Add Competition
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-slate-900 border-slate-800 col-span-2">
                    <CardHeader>
                        <CardTitle className="text-lg">Active Competitions</CardTitle>
                        <CardDescription className="text-slate-500">Upcoming global & national events.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader className="bg-slate-950/50">
                                <TableRow className="border-slate-800">
                                    <TableHead className="text-slate-300">Event</TableHead>
                                    <TableHead className="text-slate-300">Registration Deadline</TableHead>
                                    <TableHead className="text-slate-300">Registered</TableHead>
                                    <TableHead className="text-slate-300">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow className="border-slate-800 hover:bg-slate-800/50">
                                    <TableCell className="font-medium text-slate-200">Google Code Jam 2026</TableCell>
                                    <TableCell className="text-slate-400">Mar 25, 2026</TableCell>
                                    <TableCell><Badge className="bg-blue-500/20 text-blue-400 border-none">120 Students</Badge></TableCell>
                                    <TableCell><Button variant="ghost" size="sm" className="text-indigo-400"><ExternalLink className="w-4 h-4 mr-2" /> Track</Button></TableCell>
                                </TableRow>
                                <TableRow className="border-slate-800 hover:bg-slate-800/50">
                                    <TableCell className="font-medium text-slate-200">Smart India Hackathon</TableCell>
                                    <TableCell className="text-slate-400">Apr 10, 2026</TableCell>
                                    <TableCell><Badge className="bg-purple-500/20 text-purple-400 border-none">45 Teams</Badge></TableCell>
                                    <TableCell><Button variant="ghost" size="sm" className="text-indigo-400"><ExternalLink className="w-4 h-4 mr-2" /> Track</Button></TableCell>
                                </TableRow>
                                <TableRow className="border-slate-800 hover:bg-slate-800/50">
                                    <TableCell className="font-medium text-slate-200">ICPC Regionals</TableCell>
                                    <TableCell className="text-slate-400">May 05, 2026</TableCell>
                                    <TableCell><Badge className="bg-amber-500/20 text-amber-400 border-none">8 Teams</Badge></TableCell>
                                    <TableCell><Button variant="ghost" size="sm" className="text-indigo-400"><ExternalLink className="w-4 h-4 mr-2" /> Track</Button></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card className="bg-slate-900 border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-lg">Registration Tracking</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                            <Input
                                placeholder="Find student..."
                                className="pl-9 bg-slate-950 border-slate-800 text-slate-200"
                            />
                        </div>
                        <div className="space-y-3 mt-4">
                            <div className="flex items-center justify-between p-3 rounded-md bg-slate-950/50 border border-slate-800">
                                <div>
                                    <p className="text-sm font-medium text-slate-200">Arjun K</p>
                                    <p className="text-xs text-slate-500">Google Code Jam</p>
                                </div>
                                <Badge className="bg-green-500/20 text-green-400 border-none">Registered</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-md bg-slate-950/50 border border-slate-800">
                                <div>
                                    <p className="text-sm font-medium text-slate-200">Priya S</p>
                                    <p className="text-xs text-slate-500">Smart India Hackathon</p>
                                </div>
                                <Badge className="bg-amber-500/20 text-amber-400 border-none">Pending Team</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-md bg-slate-950/50 border border-slate-800">
                                <div>
                                    <p className="text-sm font-medium text-slate-200">Naveen M</p>
                                    <p className="text-xs text-slate-500">ICPC Regionals</p>
                                </div>
                                <Badge className="bg-red-500/20 text-red-500 border-none">Not Started</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
