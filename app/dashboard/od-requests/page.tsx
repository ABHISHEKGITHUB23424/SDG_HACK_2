"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bot, CheckCircle2, AlertTriangle, XCircle, Award, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SimplifiedODDashboard() {
    const [regNo, setRegNo] = useState("");
    const [studentName, setStudentName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [history, setHistory] = useState<any[] | null>(null);
    const [mlRecommendation, setMlRecommendation] = useState<any>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setHistory(null);
        setMlRecommendation(null);

        // Fetch from the DB
        const res = await fetch(`/api/student-hackathons?regNo=${encodeURIComponent(regNo)}`);

        if (res.ok) {
            const data = await res.json();

            // Simulating ML Processing delay
            setTimeout(() => {
                setHistory(data);
                generateMLRecommendation(data);
                setIsLoading(false);
            }, 1200);
        } else {
            setIsLoading(false);
        }
    };

    const generateMLRecommendation = (data: any[]) => {
        if (data.length === 0) {
            setMlRecommendation({
                status: "REJECT",
                title: "Not Recommended",
                confidence: 89,
                color: "rose",
                icon: XCircle,
                reason: "No recognized hackathon history found in the database. The student does not meet the baseline criteria for automated OD."
            });
            return;
        }

        const wins = data.filter(d => d.positionSecured === "Winner" || d.positionSecured === "Runner Up");
        const finalists = data.filter(d => d.positionSecured === "Finalist");

        if (wins.length > 0) {
            setMlRecommendation({
                status: "APPROVE",
                title: "Highly Recommended",
                confidence: 96,
                color: "emerald",
                icon: CheckCircle2,
                reason: `Student has an excellent track record with ${wins.length} prior wins/podium finishes. Fast-track approval granted.`
            });
        } else if (finalists.length > 0) {
            setMlRecommendation({
                status: "APPROVE",
                title: "Recommended",
                confidence: 82,
                color: "emerald",
                icon: CheckCircle2,
                reason: "Student demonstrates strong potential and has reached finalist rounds recently. Recommended for OD."
            });
        } else {
            setMlRecommendation({
                status: "REVIEW",
                title: "Manual Review Needed",
                confidence: 64,
                color: "amber",
                icon: AlertTriangle,
                reason: `Student has participated in ${data.length} event(s) but has not secured notable positions yet. Staff discretion advised.`
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#020b18] text-slate-200 p-8 font-sans selection:bg-sky-500/30">
            {/* Header */}
            <div className="max-w-4xl mx-auto mb-10 pb-6 border-b border-sky-900/30">
                <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                    OD Smart Approval System
                </h1>
                <p className="text-slate-400 mt-2">Enter student details below to retrieve their hackathon records and get an AI recommendation for OD approval.</p>
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Search Form */}
                <Card className="bg-slate-900 border-sky-900/50 shadow-2xl shadow-sky-900/10 h-min">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Search className="text-sky-400" /> Student Lookup</CardTitle>
                        <CardDescription>Search the database to pull student credentials</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSearch} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-300">Registration Number</label>
                                <Input
                                    required placeholder="e.g. RA20110030101"
                                    className="bg-slate-950 border-slate-800 text-white h-11"
                                    value={regNo} onChange={e => setRegNo(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-300">Student Name</label>
                                <Input
                                    required placeholder="Arjun Kumar"
                                    className="bg-slate-950 border-slate-800 text-white h-11"
                                    value={studentName} onChange={e => setStudentName(e.target.value)}
                                />
                            </div>
                            <Button disabled={isLoading} type="submit" className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold h-11 mt-4">
                                {isLoading ? "Scanning Database..." : "Evaluate Student"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Results Area */}
                <div className="space-y-6">
                    <AnimatePresence>
                        {isLoading && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8 text-center text-slate-400">
                                <Bot className="w-12 h-12 text-sky-500 animate-pulse mx-auto mb-4" />
                                <p className="font-mono text-sm">ML Model analyzing database records...</p>
                            </motion.div>
                        )}

                        {history && mlRecommendation && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">

                                {/* ML Recommendation Card */}
                                <Card className={`bg-slate-900 border-2 shadow-2xl ${mlRecommendation.status === 'APPROVE' ? 'border-emerald-500/50 shadow-emerald-900/20' :
                                        mlRecommendation.status === 'REVIEW' ? 'border-amber-500/50 shadow-amber-900/20' : 'border-rose-500/50 shadow-rose-900/20'
                                    }`}>
                                    <CardHeader className="pb-3 border-b border-slate-800 bg-slate-950/30">
                                        <CardTitle className="flex justify-between items-center text-lg">
                                            <div className={`flex items-center gap-2 ${mlRecommendation.status === 'APPROVE' ? 'text-emerald-400' :
                                                    mlRecommendation.status === 'REVIEW' ? 'text-amber-400' : 'text-rose-400'
                                                }`}>
                                                <mlRecommendation.icon className="w-5 h-5" />
                                                {mlRecommendation.title}
                                            </div>
                                            <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${mlRecommendation.status === 'APPROVE' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                    mlRecommendation.status === 'REVIEW' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                                }`}>
                                                {mlRecommendation.confidence}% AI CONFIDENCE
                                            </span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-5">
                                        <p className="text-slate-300 leading-relaxed text-sm">
                                            {mlRecommendation.reason}
                                        </p>

                                        <div className="mt-6 flex gap-3">
                                            <Button className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-10">Approve OD</Button>
                                            <Button variant="outline" className="flex-1 border-rose-900 text-rose-400 hover:bg-rose-950 hover:text-rose-300 font-bold h-10">Reject</Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Database History List */}
                                <div>
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2"><BookOpen className="w-4 h-4" /> Found Records in Database ({history.length})</h3>

                                    {history.length === 0 ? (
                                        <div className="p-6 border border-slate-800 border-dashed rounded-xl bg-slate-900/30 text-center">
                                            <p className="text-slate-500 text-sm">No records found for {regNo}</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {history.map((h: any) => (
                                                <Card key={h.id} className="bg-slate-900 border-slate-800 p-4">
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <h4 className="font-bold text-slate-200">{h.hackathonName}</h4>
                                                            <div className="flex gap-2 mt-2">
                                                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${h.positionSecured === 'Winner' ? 'bg-amber-500/20 text-amber-400' :
                                                                        h.positionSecured === 'Participant' ? 'bg-slate-800 text-slate-300' :
                                                                            'bg-emerald-500/20 text-emerald-400'
                                                                    }`}>
                                                                    {h.positionSecured}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <a href={h.proofUrl} target="_blank" rel="noreferrer" className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 bg-sky-500/10 px-3 py-1.5 rounded-md border border-sky-500/20 transition-colors">
                                                            <Award className="w-3 h-3" /> View Proof
                                                        </a>
                                                    </div>
                                                </Card>
                                            ))}
                                        </div>
                                    )}
                                </div>

                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
}
