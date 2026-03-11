"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, ShieldAlert, Users, Database } from "lucide-react";
import { useState } from "react";

export default function AdminDashboardPage() {
    const { data: rawData, isLoading } = useQuery({
        queryKey: ["admin-system-data"],
        queryFn: async () => {
            const res = await fetch("/api/admin/system-data");
            if (!res.ok) throw new Error("Failed to load");
            return res.json();
        }
    });

    const [activeTab, setActiveTab] = useState("STUDENTS"); // STUDENTS, USERS, OD, RISK, CONTESTS

    if (isLoading) {
        return <div className="animate-pulse space-y-4">
            <div className="h-32 bg-slate-800 rounded-lg w-full"></div>
            <div className="h-64 bg-slate-800 rounded-lg w-full"></div>
        </div>;
    }

    const { users = [], students = [], contests = [], odRequests = [], riskReports = [] } = rawData || {};

    const stats = [
        { title: "Total Users", value: users.length, icon: ShieldAlert, color: "purple" },
        { title: "Total Students", value: students.length, icon: Users, color: "blue" },
        { title: "Active Contests", value: contests.length, icon: Activity, color: "indigo" },
        { title: "System Records", value: odRequests.length + riskReports.length, icon: Database, color: "emerald" },
    ];

    const tabs = [
        { id: "STUDENTS", label: `Students (${students.length})` },
        { id: "USERS", label: `Staff/Admin Users (${users.length})` },
        { id: "OD", label: `OD Requests (${odRequests.length})` },
        { id: "RISK", label: `Risk Reports (${riskReports.length})` },
        { id: "CONTESTS", label: `Contests (${contests.length})` },
    ];

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Global Administrative Read-Only View
            </h1>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((s, i) => (
                    <Card key={i} className="bg-slate-900 border-slate-800 relative overflow-hidden group">
                        <div className={`absolute -right-6 -top-6 w-24 h-24 bg-${s.color}-500/10 rounded-full blur-2xl group-hover:bg-${s.color}-500/20 transition-all`}></div>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-400 mb-1">{s.title}</p>
                                    <h3 className="text-3xl font-bold text-slate-100">{s.value}</h3>
                                </div>
                                <div className={`p-3 bg-${s.color}-500/10 rounded-xl text-${s.color}-400`}>
                                    <s.icon className="w-6 h-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Data Tables Nav */}
            <div className="flex gap-2 p-1 bg-slate-900 rounded-lg border border-slate-800 shrink-0 self-start overflow-x-auto">
                {tabs.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setActiveTab(t.id)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === t.id
                                ? "bg-purple-600 text-white shadow-lg"
                                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                            }`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Read-Only Data Display */}
            <Card className="bg-slate-900 border-slate-800 overflow-hidden">
                <CardHeader>
                    <CardTitle className="text-slate-100 font-semibold">{tabs.find(t => t.id === activeTab)?.label} Data</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-300">
                            <thead className="bg-slate-800/50 text-xs uppercase font-medium text-slate-400 border-b border-slate-800">
                                {activeTab === "STUDENTS" && (
                                    <tr>
                                        <th className="px-6 py-4 rounded-tl-lg">Roll No</th>
                                        <th className="px-6 py-4">Name</th>
                                        <th className="px-6 py-4">CGPA</th>
                                        <th className="px-6 py-4">Hackathons</th>
                                        <th className="px-6 py-4">Github</th>
                                        <th className="px-6 py-4">Risk Reports</th>
                                        <th className="px-6 py-4 rounded-tr-lg">OD Requests</th>
                                    </tr>
                                )}
                                {activeTab === "USERS" && (
                                    <tr>
                                        <th className="px-6 py-4">ID / Name</th>
                                        <th className="px-6 py-4">Email</th>
                                        <th className="px-6 py-4">Role</th>
                                    </tr>
                                )}
                                {activeTab === "OD" && (
                                    <tr>
                                        <th className="px-6 py-4">Student</th>
                                        <th className="px-6 py-4">Team</th>
                                        <th className="px-6 py-4">CGPA / Wins</th>
                                        <th className="px-6 py-4">Reason</th>
                                        <th className="px-6 py-4">Status</th>
                                    </tr>
                                )}
                                {activeTab === "RISK" && (
                                    <tr>
                                        <th className="px-6 py-4">Student</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Drop %</th>
                                        <th className="px-6 py-4">AI Trigger Summary</th>
                                    </tr>
                                )}
                                {activeTab === "CONTESTS" && (
                                    <tr>
                                        <th className="px-6 py-4">Contest ID</th>
                                        <th className="px-6 py-4">Title</th>
                                        <th className="px-6 py-4">Start Time</th>
                                    </tr>
                                )}
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {activeTab === "STUDENTS" && students.map((s: any) => (
                                    <tr key={s.id} className="hover:bg-slate-800/20 transition-colors">
                                        <td className="px-6 py-4 text-purple-400 font-mono">{s.rollNo}</td>
                                        <td className="px-6 py-4 text-slate-100">{s.name}</td>
                                        <td className="px-6 py-4 font-mono">{s.cgpa}</td>
                                        <td className="px-6 py-4">{s.hackathonCount}</td>
                                        <td className="px-6 py-4">{s.githubId || "-"}</td>
                                        <td className="px-6 py-4 text-red-400">{s._count?.riskReports || 0}</td>
                                        <td className="px-6 py-4 text-blue-400">{s._count?.odRequests || 0}</td>
                                    </tr>
                                ))}
                                {activeTab === "USERS" && users.map((u: any) => (
                                    <tr key={u.id} className="hover:bg-slate-800/20 transition-colors">
                                        <td className="px-6 py-4 text-slate-100">{u.name}<br /><span className="text-xs text-slate-500 font-mono">{u.id}</span></td>
                                        <td className="px-6 py-4">{u.email}</td>
                                        <td className="px-6 py-4">
                                            <Badge className={u.role === "ADMIN" ? "bg-purple-900/50 text-purple-400" : "bg-indigo-900/50 text-indigo-400"}>
                                                {u.role}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                                {activeTab === "OD" && odRequests.map((od: any) => (
                                    <tr key={od.id} className="hover:bg-slate-800/20 transition-colors">
                                        <td className="px-6 py-4 text-slate-100">{od.student.name}<br /><span className="text-xs text-slate-500 font-mono">{od.student.rollNo}</span></td>
                                        <td className="px-6 py-4">{od.teamId}</td>
                                        <td className="px-6 py-4">{od.cgpa} / {od.hackathonCount}</td>
                                        <td className="px-6 py-4 max-w-xs truncate">{od.reason}</td>
                                        <td className="px-6 py-4">
                                            <Badge className={od.status === "APPROVED" ? "bg-emerald-900/50 text-emerald-400" : "bg-amber-900/50 text-amber-400"}>
                                                {od.status}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                                {activeTab === "RISK" && riskReports.map((rr: any) => (
                                    <tr key={rr.id} className="hover:bg-slate-800/20 transition-colors">
                                        <td className="px-6 py-4 text-slate-100">{rr.student.name}<br /><span className="text-xs text-slate-500 font-mono">{rr.student.rollNo}</span></td>
                                        <td className="px-6 py-4 text-slate-400">{new Date(rr.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-red-400 font-bold">{rr.participationDrop}%</td>
                                        <td className="px-6 py-4 max-w-md truncate text-xs">{rr.aiSummary}</td>
                                    </tr>
                                ))}
                                {activeTab === "CONTESTS" && contests.map((c: any) => (
                                    <tr key={c.id} className="hover:bg-slate-800/20 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs">{c.id}</td>
                                        <td className="px-6 py-4 text-slate-100">{c.title}</td>
                                        <td className="px-6 py-4">{new Date(c.startTime).toLocaleString()}</td>
                                    </tr>
                                ))}
                                {/* Empty State Handlers */}
                                {rawData && ((activeTab === "STUDENTS" && students.length === 0) || (activeTab === "USERS" && users.length === 0) || (activeTab === "OD" && odRequests.length === 0) || (activeTab === "RISK" && riskReports.length === 0) || (activeTab === "CONTESTS" && contests.length === 0)) && (
                                    <tr>
                                        <td colSpan={10} className="px-6 py-12 text-center text-slate-500">
                                            No records found for {activeTab.toLowerCase()}.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
