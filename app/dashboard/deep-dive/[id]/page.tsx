"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { mockStudents } from "@/lib/mockData";
import { calculateCandidateScore } from "@/lib/fitnessScorer";
import { generateAIRecommendation } from "@/lib/aiRecommendation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
    ArrowLeft, TrendingDown, Zap, ShieldAlert, CheckCircle2, 
    Printer, Activity, BarChart3, AlertTriangle, Trophy, 
    Cpu, Target, Medal, Phone, FileText, ChevronRight, Loader2,
    Calendar, ExternalLink, BookOpen, Rocket, History, Search,
    Filter, ArrowRightLeft, TrendingUp, Minus, BrainCircuit
} from "lucide-react";
import { getBadgeColor, getDepartmentColor, formatDate } from "@/lib/utils";
import { CompetencyRadar } from "@/components/scanner/CompetencyRadar";
import { ActivityTimeline } from "@/components/scanner/ActivityTimeline";
import { analyzePaceReduction } from "@/lib/paceAnalyzer";
import { 
    ResponsiveContainer, XAxis, YAxis, Tooltip, 
    AreaChart, Area, CartesianGrid 
} from 'recharts';
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function StudentDeepDivePage() {
    const params = useParams();
    const router = useRouter();
    const [student, setStudent] = useState<any>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [isIntervening, setIsIntervening] = useState(false);
    
    // Comparison States
    const [fromSem, setFromSem] = useState(1);
    const [toSem, setToSem] = useState(4);
    const [compareParam, setCompareParam] = useState("Academic marks");
    const [analysisResult, setAnalysisResult] = useState<any>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const studentId = params.id as string;
        const found = mockStudents.find(s => s.id === studentId);
        if (found) {
            const initialAnalysis = analyzePaceReduction(found, fromSem, toSem, compareParam);
            setStudent({
                ...found,
                result: calculateCandidateScore(found, mockStudents),
                pace: initialAnalysis
            });
            setAnalysisResult(initialAnalysis);
        }
    }, [params.id]);

    // Recalculate analysis WITH ANIMATION when inputs change
    useEffect(() => {
        if (student) {
            setIsAnalyzing(true);
            const timer = setTimeout(() => {
                const newAnalysis = analyzePaceReduction(student, fromSem, toSem, compareParam);
                setAnalysisResult(newAnalysis);
                setIsAnalyzing(false);
            }, 1200); // Simulate ML processing time
            return () => clearTimeout(timer);
        }
    }, [fromSem, toSem, compareParam]);

    // Memoized growth trend to prevent flicker
    const growthTrend = useMemo(() => {
        if (!student) return [];
        return student.academicHistory.map((h: any) => ({
            name: `Sem ${h.semester}`,
            cgpa: (h.cgpa * 10).toFixed(1),
            ia: h.internalAssessmentScore
        }));
    }, [student]);

    const timelineItems = useMemo(() => {
        if (!student) return [];
        return [
            ...student.hackathons.map((h: any) => ({
                type: 'hackathon',
                title: h.name,
                date: h.date,
                description: h.position ? `Won ${h.position}nd Place` : 'Participated',
                color: 'blue'
            })),
            ...(student.projects || []).map((p: any) => ({
                type: 'project',
                title: p.title,
                date: p.startDate,
                description: `${p.domain} • ${p.status}`,
                color: 'emerald'
            }))
        ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [student]);

    if (!isMounted) return null;
    if (!student) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                <div className="text-slate-500 font-mono text-sm uppercase tracking-widest text-center">
                    ACCESSING ENCRYPTED STUDENT RECORDS...<br/>
                    INITIALIZING ML AUDIT ENGINE...
                </div>
            </div>
        );
    }

    const deployIntervention = (type: string) => {
        setIsIntervening(true);
        setTimeout(() => {
            setStudent({
                ...student,
                currentStatus: 'Under Intervention'
            });
            setIsIntervening(false);
            toast.success("Intervention Deployed", {
                description: "Corrective path pushed to student terminal."
            });
        }, 1500);
    };

    const recommendation = student ? generateAIRecommendation(student, student.result) : "";

    const radarData = student ? [
        { subject: 'Innovation', A: student.result.innovationScore || 0, fullMark: 100 },
        { subject: 'Academics', A: student.result.academicScore || 0, fullMark: 100 },
        { subject: 'Consistency', A: student.result.consistencyScore || 0, fullMark: 100 },
        { subject: 'Tech Load', A: student.result.technicalLoadScore || 0, fullMark: 100 },
        { subject: 'Teamwork', A: student.teamworkScore || 0, fullMark: 100 },
    ] : [];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 pb-20 max-w-7xl mx-auto"
        >
            {/* Header + Action Bar */}
            <div className="flex items-center justify-between">
                <Button 
                    variant="ghost" 
                    onClick={() => router.push('/dashboard/deep-dive')}
                    className="text-slate-400 hover:text-white hover:bg-slate-800"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    BACK TO SCANNER
                </Button>
                <div className="flex items-center gap-4">
                     <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 font-mono text-[10px] py-1 px-3">
                        DATABASE SIZE: 1,000+ RECORDS
                    </Badge>
                    <Button 
                        onClick={() => toast.success("Selection Report generated successfully!")}
                        variant="outline" 
                        className="border-slate-800 bg-slate-900 text-slate-300 font-mono text-xs"
                    >
                        <Printer className="w-4 h-4 mr-2" />
                        GENERATE AUDIT REPORT
                    </Button>
                </div>
            </div>

            {/* Top Identity Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className={`lg:col-span-2 bg-[#0a0a14] border-2 shadow-2xl relative overflow-hidden transition-all duration-500 ${student.currentStatus === 'Under Intervention' ? 'border-blue-500/40 shadow-blue-500/5' : 'border-slate-800'}`}>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 blur-[120px] -mr-32 -mt-32" />
                    <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-3xl font-bold border-2 shadow-[0_0_30px_rgba(79,70,229,0.15)] bg-slate-950/80" style={{ borderColor: getDepartmentColor(student.department) + '80', color: getDepartmentColor(student.department) }}>
                                    {student.photoInitials}
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold text-slate-300 shadow-xl">
                                    YEAR {student.year}
                                </div>
                            </div>
                            
                            <div className="flex-1 space-y-1">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h2 className="text-3xl font-bold font-sora text-white tracking-tight">{student.name}</h2>
                                    {student.currentStatus === 'Under Intervention' ? (
                                        <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/40 flex items-center gap-2 px-3 py-1 font-mono animate-pulse">
                                            <Loader2 className="w-3 h-3 animate-spin" />
                                            UNDER INTERVENTION
                                        </Badge>
                                    ) : (
                                        <Badge style={{ backgroundColor: getBadgeColor(student.result.badge) + '20', color: getBadgeColor(student.result.badge), borderColor: getBadgeColor(student.result.badge) + '40' }} className="font-mono tracking-tighter shadow-sm border px-3">
                                            {student.result.badge}
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-slate-500 font-mono tracking-[0.2em] text-[12px] flex items-center gap-2 uppercase">
                                    {student.registerNumber} • {student.department} • {student.email}
                                </p>
                            </div>

                            <div className="flex flex-col items-center justify-center p-6 bg-slate-950/80 rounded-2xl border border-slate-800/60 min-w-[180px] shadow-inner">
                                <div className="text-[10px] font-mono text-slate-600 mb-3 uppercase tracking-[0.3em]">Fitness Index</div>
                                <div className="relative flex items-center justify-center">
                                    <svg className="w-24 h-24 transform -rotate-90">
                                        <circle cx="48" cy="48" r="42" fill="transparent" stroke="#1e1b4b" strokeWidth="6" />
                                        <motion.circle 
                                            cx="48" cy="48" r="42" 
                                            fill="transparent" stroke={getBadgeColor(student.result.badge)} 
                                            strokeWidth="6" 
                                            initial={{ strokeDashoffset: 264 }}
                                            animate={{ strokeDashoffset: 264 * (1 - student.result.fitnessScore / 100) }}
                                            style={{ strokeDasharray: 264 }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                        />
                                    </svg>
                                    <span className="absolute text-2xl font-bold font-ibm text-white">{Math.round(student.result.fitnessScore)}</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className={`bg-[#0a0a14] border-2 shadow-xl overflow-hidden ${student.result.redFlags?.length > 0 ? 'border-red-900/40' : 'border-slate-800'}`}>
                    <CardHeader className="bg-slate-950/50 border-b border-slate-900/50 pb-3">
                        <CardTitle className="text-[10px] font-mono flex items-center gap-2 text-slate-500 uppercase tracking-widest">
                            <ShieldAlert className={`w-4 h-4 ${student.result.redFlags?.length > 0 ? 'text-red-500' : 'text-slate-600'}`} />
                            Audit Risk Detection
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-5 space-y-3">
                        {student.result.redFlags?.length > 0 ? (
                            student.result.redFlags.map((flag: string, i: number) => (
                                <motion.div 
                                    initial={{ x: 20, opacity: 0 }} 
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    key={i} 
                                    className="flex gap-3 p-3 bg-red-500/5 rounded-lg border border-red-500/10"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0 animate-pulse" />
                                    <div className="text-xs text-red-200/80 font-ibm leading-relaxed">{flag}</div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="p-4 text-center">
                                <CheckCircle2 className="w-10 h-10 text-emerald-500/10 mx-auto mb-3" />
                                <div className="text-[10px] text-slate-600 font-mono uppercase tracking-[0.3em]">Zero Critical Flags</div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Granular Performance Comparison Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Comparison Control Panel */}
                <Card className="bg-[#0a0a14] border-slate-800 shadow-xl overflow-hidden self-start">
                    <CardHeader className="bg-slate-950/80 border-b border-slate-900/80 pb-4">
                        <CardTitle className="text-sm font-mono text-indigo-400 flex items-center gap-2 uppercase tracking-widest">
                            <ArrowRightLeft className="w-4 h-4" />
                            Audit Parameter
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-5 space-y-6">
                        <div className="space-y-3">
                            <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block pl-1">Target Parameter</label>
                            <div className="grid grid-cols-1 gap-2">
                                {['Academic marks', 'Competitions', 'Leetcode', 'Coding', 'Projects'].map(p => (
                                    <button 
                                        key={p}
                                        disabled={isAnalyzing}
                                        onClick={() => setCompareParam(p)}
                                        className={`text-left px-4 py-3 rounded-xl text-xs font-mono transition-all border outline-none ${compareParam === p ? 'bg-indigo-600/30 border-indigo-500/50 text-indigo-300 shadow-[0_0_15px_rgba(79,70,229,0.15)]' : 'bg-slate-950/40 border-slate-800/60 text-slate-600 hover:border-slate-700'}`}
                                    >
                                        <span className="flex items-center justify-between">
                                            {p}
                                            {compareParam === p && <motion.div layoutId="activeDot" className="w-1.5 h-1.5 rounded-full bg-indigo-400Shadow" />}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest pl-1">From Sem</label>
                                <select 
                                    disabled={isAnalyzing}
                                    value={fromSem}
                                    onChange={(e) => setFromSem(Number(e.target.value))}
                                    className="w-full bg-slate-950 border border-slate-800/80 rounded-xl p-3 text-xs font-mono text-indigo-400 outline-none focus:ring-1 focus:ring-indigo-500/50"
                                >
                                    {[1,2,3,4].map(s => <option key={s} value={s}>Sem {s}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest pl-1">To Sem</label>
                                <select 
                                    disabled={isAnalyzing}
                                    value={toSem}
                                    onChange={(e) => setToSem(Number(e.target.value))}
                                    className="w-full bg-slate-950 border border-slate-800/80 rounded-xl p-3 text-xs font-mono text-indigo-400 outline-none focus:ring-1 focus:ring-indigo-500/50"
                                >
                                    {[1,2,3,4].map(s => <option key={s} value={s}>Sem {s}</option>)}
                                </select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Growth Analysis Results */}
                <div className="lg:col-span-3 space-y-6">
                    <Card className={`bg-[#0a0a14] shadow-2xl relative overflow-hidden transition-all duration-500 border-l-4 min-h-[340px] ${analysisResult?.parameterDecline?.trend === 'declining' ? 'border-l-red-500' : 'border-l-emerald-500'}`}>
                        <div className="absolute top-3 right-5 text-[9px] font-mono text-slate-700 uppercase tracking-[0.4em]">ML_CROSS_PARAMETER_CORRELATION_V4</div>
                        
                        <AnimatePresence mode="wait">
                            {isAnalyzing ? (
                                <motion.div 
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-10 bg-[#0a0a14]/90 flex flex-col items-center justify-center space-y-6 backdrop-blur-sm"
                                >
                                    <div className="relative">
                                        <div className="w-20 h-20 border-2 border-indigo-500/20 rounded-full animate-ping absolute" />
                                        <div className="w-20 h-20 border-t-2 border-indigo-500 rounded-full animate-spin relative flex items-center justify-center">
                                            <BrainCircuit className="w-8 h-8 text-indigo-500" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="text-[11px] font-mono text-indigo-400 animate-pulse tracking-widest uppercase">Analyzing Multi-Factor Dynamics</div>
                                        <div className="text-[9px] font-mono text-slate-600 uppercase">Fetching historical delta from database...</div>
                                    </div>
                                </motion.div>
                            ) : (
                                <CardContent className="p-10">
                                    <div className="flex flex-col gap-8">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-2xl ${analysisResult?.parameterDecline?.trend === 'declining' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'}`}>
                                                {analysisResult?.parameterDecline?.trend === 'declining' ? <TrendingDown className="w-7 h-7" /> : <TrendingUp className="w-7 h-7" />}
                                            </div>
                                            <div>
                                                <h3 className="text-white font-bold text-2xl font-sora tracking-tight">{compareParam} Audit</h3>
                                                <p className="text-slate-500 text-sm font-outfit">Longitudinal Comparative: Sem {fromSem} <ArrowRightLeft className="inline w-3 h-3 mx-2 opacity-30" /> Sem {toSem}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-900 border-l-4 border-l-indigo-500 shadow-inner">
                                                <div className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest mb-3 font-bold flex justify-between items-center">
                                                    <span>Delta Variance</span>
                                                    <span className={`px-2 py-0.5 rounded text-[14px] font-bold ${analysisResult?.parameterDecline?.change < 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                                                        {analysisResult?.parameterDecline?.change > 0 ? '+' : ''}{analysisResult?.parameterDecline?.change}
                                                    </span>
                                                </div>
                                                <div className="text-slate-200 text-lg font-ibm leading-tight font-medium">
                                                    {analysisResult?.parameterDecline?.trend === 'declining' 
                                                        ? `Decline detected in ${compareParam.toLowerCase()} metrics.` 
                                                        : `Positive velocity in ${compareParam.toLowerCase()} sector.`}
                                                </div>
                                            </div>

                                            <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-900 border-l-4 border-l-amber-500 shadow-inner group relative">
                                                <div className="text-[10px] font-mono text-amber-500 uppercase tracking-widest mb-3 font-bold flex items-center justify-between">
                                                    <span>ML Context Analysis</span>
                                                    <Badge className="bg-amber-500/10 text-amber-500 border-none text-[8px] font-mono px-1">98.4% CONF</Badge>
                                                </div>
                                                <div className="text-slate-300 text-[13px] font-ibm leading-relaxed italic border-l border-amber-500/20 pl-4 py-1">
                                                    "{analysisResult?.parameterDecline?.reason}"
                                                </div>
                                                
                                                {/* Meta-Action Injection */}
                                                <AnimatePresence>
                                                    {analysisResult?.parameterDecline?.suggestedSolution && (
                                                        <motion.div 
                                                            initial={{ opacity: 0, y: 5 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="mt-6 space-y-4"
                                                        >
                                                            <div className="pt-4 border-t border-slate-900">
                                                                <div className="text-[9px] font-mono text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                                    <Rocket className="w-3 h-3" />
                                                                    ML Generative Feedback
                                                                </div>
                                                                <div className="text-[#a5b4fc] text-[12px] font-medium leading-relaxed bg-indigo-500/5 p-3 rounded-lg border border-indigo-500/10 shadow-inner">
                                                                    {analysisResult?.parameterDecline?.suggestedSolution}
                                                                </div>
                                                            </div>

                                                            {analysisResult?.parameterDecline?.adminInstruction && (
                                                                <div className="pt-2">
                                                                    <div className="text-[9px] font-mono text-red-500 uppercase tracking-widest mb-2 flex items-center gap-2 font-bold">
                                                                        <ShieldAlert className="w-3 h-3 animate-pulse" />
                                                                        CRITICAL ADMIN DIRECTIVE (MANDATORY)
                                                                    </div>
                                                                    <div className="text-red-200 text-[12px] font-bold leading-relaxed bg-red-500/10 p-3 rounded-lg border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                                                                        {analysisResult?.parameterDecline?.adminInstruction}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                        
                                        {analysisResult?.parameterDecline?.trend === 'declining' && (
                                            <motion.div 
                                                initial={{ opacity: 0, y: 10 }} 
                                                animate={{ opacity: 1, y: 0 }}
                                                className="bg-red-500/10 p-5 rounded-2xl border border-red-500/20 flex flex-col md:flex-row items-center justify-between gap-4"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                                                        <AlertTriangle className="w-5 h-5 text-red-500" />
                                                    </div>
                                                    <div>
                                                        <div className="text-white font-bold text-sm">Automated Block Applied</div>
                                                        <div className="text-[11px] text-red-200/50 font-mono uppercase tracking-widest">ML has flagged all OD requests for manual override rejection</div>
                                                    </div>
                                                </div>
                                                <Button 
                                                    onClick={() => deployIntervention('Remedial')}
                                                    className="bg-red-600 hover:bg-red-500 text-white font-bold px-8 h-12 rounded-xl shadow-lg active:scale-95 transition-all w-full md:w-auto"
                                                >
                                                    ENFORCE OD BLOCK
                                                </Button>
                                            </motion.div>
                                        )}
                                    </div>
                                </CardContent>
                            )}
                        </AnimatePresence>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="bg-[#0a0a14] border-slate-800 shadow-xl">
                            <CardHeader className="pb-0 border-b border-slate-900/50 mb-4 px-6 py-4">
                                <CardTitle className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">Skill Radar Distribution</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 pb-6">
                                <CompetencyRadar data={radarData} />
                            </CardContent>
                        </Card>
                        
                        <Card className="bg-[#0a0a14] border-slate-800 shadow-xl">
                            <CardHeader className="pb-0 border-b border-slate-900/50 mb-4 px-6 py-4">
                                <CardTitle className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">Historical Data Stream</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[250px] p-6">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={growthTrend}>
                                        <defs>
                                            <linearGradient id="glowColor" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" vertical={false} />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10, fontFamily: 'monospace' }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10, fontFamily: 'monospace' }} />
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', fontSize: '10px', borderRadius: '8px' }}
                                            itemStyle={{ color: '#8b5cf6' }}
                                        />
                                        <Area type="monotone" dataKey="cgpa" stroke="#8b5cf6" fill="url(#glowColor)" strokeWidth={3} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* AI Recommendation Context */}
            <Card className="bg-[#0a0a14] border-slate-800 border-l-4 border-l-indigo-600 shadow-xl max-w-4xl mx-auto overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600/0 via-indigo-600/50 to-indigo-600/0" />
                <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6 text-[11px] font-mono text-indigo-400 uppercase tracking-[0.3em]">
                        <div className="p-2 bg-indigo-500/10 rounded-lg">
                            <BrainCircuit className="w-4 h-4" />
                        </div>
                        Strategic Audit Intelligence Summary
                    </div>
                    <div className="bg-slate-950/80 p-8 rounded-2xl border border-slate-900 shadow-inner relative group">
                        <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Quote className="w-12 h-12 text-indigo-500" />
                        </div>
                        <p className="text-slate-300 font-mono text-sm leading-relaxed whitespace-pre-line italic relative z-10">
                            <span className="text-indigo-500 font-bold mr-3">{'>'}</span>
                            {recommendation}
                            <span className="inline-block w-2 h-4 bg-indigo-500/60 ml-1 animate-pulse" />
                        </p>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

function Quote(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
        </svg>
    )
}
