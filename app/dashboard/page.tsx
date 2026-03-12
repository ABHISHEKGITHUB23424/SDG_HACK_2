"use client";

import { mockStudents } from "@/lib/mockData";
import { calculateCandidateScore } from "@/lib/fitnessScorer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Trophy, Users, AlertTriangle, Clock, Target, BarChart3, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { motion } from "framer-motion";
import { getBadgeColor } from "@/lib/utils";

export default function DashboardPage() {
    // Calculate all scores
    const studentsWithScores = mockStudents.map(s => ({
        ...s,
        result: calculateCandidateScore(s, mockStudents)
    }));

    const stats = {
        total: studentsWithScores.length,
        elite: studentsWithScores.filter(s => s.result.badge === 'ELITE').length,
        highRisk: studentsWithScores.filter(s => s.result.badge === 'HIGH_RISK').length,
        ready: studentsWithScores.filter(s => s.result.badge === 'ELIGIBLE').length
    };

    const distributionData = [
        { name: 'Elite', count: stats.elite, color: '#ca8a04' },
        { name: 'Eligible', count: stats.ready, color: '#059669' },
        { name: 'High Risk', count: stats.highRisk, color: '#d97706' },
        { name: 'Remedial', count: studentsWithScores.filter(s => s.result.badge === 'REMEDIAL').length, color: '#dc2626' }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-sora tracking-tight text-white flex items-center gap-3">
                        <Target className="w-8 h-8 text-indigo-500" />
                        Eligibility Intelligence Dashboard
                    </h1>
                    <p className="text-slate-400 mt-1 font-outfit">
                        Multi-factor candidate fitness monitoring & deep-scanning system
                    </p>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 flex items-center gap-4">
                    <div className="text-right">
                        <div className="text-xs text-slate-500 font-mono uppercase tracking-wider">System Status</div>
                        <div className="text-sm font-bold text-emerald-400 flex items-center gap-2 justify-end">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Live Audit Active
                        </div>
                    </div>
                </div>
            </div>

            {/* Critical Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Total Students", value: stats.total, icon: Users, color: "text-blue-400", bg: "bg-blue-500/10" },
                    { label: "Elite Tier", value: stats.elite, icon: Trophy, color: "text-amber-500", bg: "bg-amber-500/10" },
                    { label: "High Risk / Flagged", value: stats.highRisk, icon: AlertTriangle, color: "text-red-500", bg: "bg-red-500/10" },
                    { label: "Audit Required", value: studentsWithScores.length - stats.elite - stats.ready, icon: Clock, color: "text-purple-400", bg: "bg-purple-500/10" }
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="bg-[#0f0f1a] border-slate-800 shadow-lg hover:border-slate-700 transition-all">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">{stat.label}</p>
                                        <h3 className="text-3xl font-bold text-white mt-1 font-ibm">{stat.value}</h3>
                                    </div>
                                    <div className={`${stat.bg} p-3 rounded-xl`}>
                                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Distribution and Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 bg-[#0f0f1a] border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-lg font-sora flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-indigo-400" />
                            Global Score Distribution
                        </CardTitle>
                        <CardDescription>Department-wide fitness bracket allocation</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={distributionData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Tooltip 
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    contentStyle={{ backgroundColor: '#0f0f1a', border: '1px solid #1a1a2e', color: '#fff' }}
                                />
                                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                    {distributionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="bg-[#0f0f1a] border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-lg font-sora flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-emerald-400" />
                            Tier Insights
                        </CardTitle>
                        <CardDescription>Live auditing observations</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                            <div className="text-xs font-mono text-indigo-400 mb-1 tracking-widest uppercase">Elite Velocity</div>
                            <div className="text-sm text-slate-300">
                                {Math.round((stats.elite / stats.total) * 100)}% of students have reached ELITE tier this semester.
                            </div>
                        </div>
                        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                            <div className="text-xs font-mono text-amber-500 mb-1 tracking-widest uppercase">Capacity Warning</div>
                            <div className="text-sm text-slate-300">
                                High risk count increased by 2. Primary factor: Attendance drop in MECH.
                            </div>
                        </div>
                        <div className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/20">
                            <div className="text-xs font-mono text-indigo-400 mb-1 tracking-widest uppercase">Scan Recommendation</div>
                            <div className="text-sm text-indigo-100">
                                Internal Hackathon scheduled for April requires 12 shortlist candidates.
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
