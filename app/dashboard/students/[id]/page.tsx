"use client";

import { useEffect, useState } from "react";
import { StudentChart } from "@/components/StudentChart";
import { RiskSummaryModal } from "@/components/RiskSummaryModal";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Target, Brain, AlertTriangle, BookOpen } from "lucide-react";

export default function StudentProfilePage({ params }: { params: { id: string } }) {
    const [student, setStudent] = useState<any>(null);

    useEffect(() => {
        fetch(`/api/students/${params.id}`).then(res => res.json()).then(setStudent);
    }, [params.id]);

    if (!student) return <div className="text-slate-400">Loading student profile...</div>;

    const history = JSON.parse(student.semesterHistory as string) as number[];
    const currentSem = history.length;
    const currentEvents = history[currentSem - 1] || 0;
    const prevEvents = history[currentSem - 2] || 0;

    const participationDrop = prevEvents > 0 ? ((prevEvents - currentEvents) / prevEvents) * 100 : 0;
    const isAtRisk = participationDrop > 50;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        {student.name}
                        {isAtRisk && (
                            <Badge className="bg-red-900/50 text-red-400 hover:bg-red-900 ml-2 animate-pulse">
                                <AlertTriangle className="w-4 h-4 mr-1" /> Risk: &gt;50% Drop
                            </Badge>
                        )}
                    </h2>
                    <p className="text-slate-400 mt-1 flex items-center gap-2">
                        Roll No: <span className="text-slate-200">{student.rollNo}</span>
                    </p>
                </div>

                {isAtRisk && (
                    <RiskSummaryModal
                        student={student}
                        semester={currentSem}
                        participationDrop={participationDrop}
                        prevEvents={prevEvents}
                        currentEvents={currentEvents}
                    />
                )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-slate-900 border-slate-800 text-slate-100">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-indigo-900/50 rounded-lg text-indigo-400"><BookOpen className="w-5 h-5" /></div>
                        <div>
                            <p className="text-sm text-slate-400">Cumulative CGPA</p>
                            <p className="text-xl font-bold font-mono">{student.cgpa.toFixed(2)}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-slate-900 border-slate-800 text-slate-100">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-blue-900/50 rounded-lg text-blue-400"><Github className="w-5 h-5" /></div>
                        <div>
                            <p className="text-sm text-slate-400">GitHub Activity</p>
                            <p className="text-xl font-bold truncate">{student.githubId || "None"}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-slate-900 border-slate-800 text-slate-100">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-green-900/50 rounded-lg text-green-400"><Target className="w-5 h-5" /></div>
                        <div>
                            <p className="text-sm text-slate-400">Total Hackathons</p>
                            <p className="text-xl font-bold font-mono">{student.hackathonCount}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-slate-900 border-slate-800 text-slate-100">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-orange-900/50 rounded-lg text-orange-400"><Brain className="w-5 h-5" /></div>
                        <div>
                            <p className="text-sm text-slate-400">Latest Sem Events</p>
                            <p className="text-xl font-bold font-mono">{currentEvents}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card className="bg-slate-900 border-slate-800 text-slate-100 h-full">
                        <CardHeader>
                            <CardTitle>Semantic Trajectory</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <StudentChart history={history} />
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-1 border-l border-slate-800 pl-6 h-full overflow-y-auto">
                    <h3 className="text-lg font-semibold text-slate-300 mb-4 sticky top-0 bg-slate-950/80 p-2 z-10">AI Risk Handover Reports</h3>
                    <div className="space-y-4">
                        {student.riskReports?.map((report: any) => (
                            <Card key={report.id} className="bg-slate-900/50 border-slate-800 text-slate-100 shadow-none">
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <Badge variant="outline" className="border-red-900/50 text-red-400">Sem {report.semester}</Badge>
                                        <span className="text-xs text-slate-500">{new Date(report.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed border-l-2 border-indigo-500 pl-3">
                                        {report.aiSummary}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                        {(!student.riskReports || student.riskReports.length === 0) && (
                            <p className="text-slate-500 text-sm text-center py-8">No reports generated.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
