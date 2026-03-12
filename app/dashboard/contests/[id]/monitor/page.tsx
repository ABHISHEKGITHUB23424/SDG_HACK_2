"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    PhoneCall,
    MessageSquare,
    Timer,
    Users,
    CheckCircle2,
    AlertCircle,
    ArrowLeft,
    RefreshCw,
    PhoneOff,
    UserCheck,
    MoreVertical,
    Calendar,
    Zap,
    Target,
    Phone,
    CheckCircle,
    Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { mockTeams } from "@/data/mockDatabase";
import Link from "next/link";
import { useState, useEffect } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function ContestMonitorPage({ params }: { params: { id: string } }) {
    const queryClient = useQueryClient();
    const [now, setNow] = useState(new Date());
    const [systemLogs, setSystemLogs] = useState<{ id: string; text: string; time: string; type: 'info' | 'success' | 'warn' | 'error' }[]>([]);
    const [hasSynced, setHasSynced] = useState(false);

    // Update clock every second
    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const addLog = (text: string, type: 'info' | 'success' | 'warn' | 'error' = 'info') => {
        setSystemLogs(prev => [{
            id: Math.random().toString(36).substr(2, 9),
            text,
            time: format(new Date(), "HH:mm:ss"),
            type
        }, ...prev].slice(0, 5));
    };

    const { data: contest, isLoading } = useQuery({
        queryKey: ["contest", params.id],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/api/contests/${params.id}`);
            const json = await res.json();
            return json.data;
        },
        refetchInterval: 10000,
    });

    const checkMutation = useMutation({
        mutationFn: async () => {
            addLog(`Initializing ${contest.platform} sync...`, 'info');
            const res = await fetch(`${API_URL}/api/contests/${params.id}/check`, {
                method: "POST",
            });
            return res.json();
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["contest", params.id] });
            const joined = data.data.joined.length;
            const missing = data.data.missing.length;
            addLog(`Scan complete: ${joined} Joined, ${missing} Missing.`, missing > 0 ? 'warn' : 'success');
            toast.success(`Check complete: ${joined} joined, ${missing} missing`);
        },
    });

    const callMutation = useMutation({
        mutationFn: async (studentId: string) => {
            const student = participations.find((p: any) => p.studentId === studentId)?.student;
            addLog(`Manual priority call triggered for ${student?.name || 'student'}`, 'info');
            const res = await fetch(`${API_URL}/api/contests/${params.id}/call/${studentId}`, {
                method: "POST",
            });
            return res.json();
        },
        onSuccess: (res) => {
            if (res.success) {
                queryClient.invalidateQueries({ queryKey: ["contest", params.id] });
                addLog("Call initiated successfully.", 'success');
                toast.success("AI Call initiated");
            } else {
                addLog(`Call failed: ${res.error}`, 'error');
                toast.error(res.error || "Failed to trigger call");
            }
        }
    });

    const autoMutation = useMutation({
        mutationFn: async () => {
            addLog("AUTO-PILOT ACTIVATED. Starting autonomous monitor sequence...", 'warn');
            const res = await fetch(`${API_URL}/api/contests/${params.id}/trigger-auto`, {
                method: "POST",
            });
            return res.json();
        },
        onSuccess: (res) => {
            if (res.success) {
                addLog("Background worker started. Analyzing platform credentials...", 'info');
                toast.success("Automated Pilot started.");
            }
        }
    });

    const [activeCallStudent, setActiveCallStudent] = useState<string | null>(null);
    const [activeWhatsAppStudent, setActiveWhatsAppStudent] = useState<string | null>(null);
    const [whatsappMessages, setWhatsappMessages] = useState<{ id: number, sender: string, text: string }[]>([]);

    const participations = contest?.participations || [];
    const joinedCount = participations.filter((p: any) => p.status === "JOINED").length;
    const missingCount = participations.filter((p: any) => p.status === "MISSING").length;
    const pendingCount = participations.filter((p: any) => p.status === "PENDING").length;
    const totalCount = participations.length;

    // Effect to auto-target students based on call logs
    useEffect(() => {
        if (!contest?.callLogs) return;
        const active = contest.callLogs
            .sort((a: any, b: any) => new Date(b.initiatedAt).getTime() - new Date(a.initiatedAt).getTime())
            .find((cl: any) =>
                ["INITIATED", "RINGING", "IN_PROGRESS"].includes(cl.callStatus) &&
                (new Date().getTime() - new Date(cl.initiatedAt).getTime() < 30000) // timeout if stuck
            );
        if (active) {
            const student = participations.find((p: any) => p.studentId === active.studentId)?.student;
            setActiveCallStudent(student?.name || null);
        } else {
            setActiveCallStudent(null);
        }
    }, [contest?.callLogs, participations]);

    // Effect to trigger WhatsApp simulation for failed calls
    useEffect(() => {
        if (!contest?.callLogs) return;

        const recentFallback = contest.callLogs
            .sort((a: any, b: any) => new Date(b.initiatedAt).getTime() - new Date(a.initiatedAt).getTime())
            .find((cl: any) =>
                cl.whatsappSent &&
                cl.callStatus === "FAILED" &&
                (new Date().getTime() - new Date(cl.initiatedAt).getTime() < 25000) // Trigger if it just failed
            );

        if (recentFallback && !activeCallStudent) {
            const student = participations.find((p: any) => p.studentId === recentFallback.studentId)?.student;
            // Ensure we don't re-trigger for the same student immediately
            if (student && student.name !== activeWhatsAppStudent) {
                setActiveWhatsAppStudent(student.name);
                startWhatsAppSimulation(student.name, contest.name);
            }
        }
    }, [contest?.callLogs, participations, activeCallStudent]);

    const startWhatsAppSimulation = (studentName: string, contestName: string) => {
        setWhatsappMessages([]);
        const sequence = [
            { sender: 'bot', text: `Hi ${studentName}, this is the Academic Success AI Bot 🤖.`, delay: 1000 },
            { sender: 'bot', text: `I just tried calling you but missed you! I noticed you haven't joined the ${contestName} yet.`, delay: 3000 },
            { sender: 'bot', text: `Please reply with an option:\n1️⃣ I am joining now\n2️⃣ Facing technical issues\n3️⃣ Need an extension / OD`, delay: 5000 },
            { sender: 'student', text: `1`, delay: 9000 }, // Simulated student response
            { sender: 'bot', text: `Great! I've updated your status to "JOINING NOW". Good luck! ✅`, delay: 11000 },
        ];

        sequence.forEach((msg, idx) => {
            setTimeout(() => {
                setWhatsappMessages(prev => [...prev, { ...msg, id: idx }]);

                // Auto-close after last message
                if (idx === sequence.length - 1) {
                    setTimeout(() => setActiveWhatsAppStudent(null), 5000);
                }
            }, msg.delay);
        });
    };

    // Effect to play sound when AI Outbound Call is active
    useEffect(() => {
        if (!activeCallStudent) return;

        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return;

        const ctx = new AudioContextClass();
        let interval: NodeJS.Timeout;

        const playPing = () => {
            if (ctx.state === 'closed') return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            // Tech/sci-fi dialing radar ping sound
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);

            gain.gain.setValueAtTime(0, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.5);
        };

        playPing();
        interval = setInterval(playPing, 1000); // play ping every 1 second

        return () => {
            clearInterval(interval);
            ctx.close().catch(() => { });
        };
    }, [activeCallStudent]);

    if (isLoading) return <div className="p-10 text-center text-slate-500">Loading monitor...</div>;
    if (!contest) return <div className="p-10 text-center text-red-500">Contest not found</div>;

    const scheduledTime = new Date(contest.scheduledAt);
    const isStarted = now > scheduledTime;
    const timeDiffStr = formatDistanceToNow(scheduledTime, { addSuffix: true });

    return (
        <div className="p-6 space-y-6 bg-slate-950 min-h-screen text-slate-100 relative overflow-hidden">
            {/* Visual Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[100px] -mr-64 -mt-64 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] -ml-64 -mb-64 pointer-events-none" />

            {/* WhatsApp Chatbot Overlay */}
            {activeWhatsAppStudent && (
                <div className="fixed inset-0 z-[60] flex items-center justify-end pr-12 bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-500 rounded-lg pointer-events-none">
                    <div className="w-[380px] h-[600px] bg-[#0b141a] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col slide-in-from-right-8 duration-500 relative pointer-events-auto">
                        {/* WhatsApp Header */}
                        <div className="bg-[#202c33] px-4 py-3 flex items-center gap-3 shadow-md z-10">
                            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center relative">
                                <MessageSquare className="w-5 h-5 text-white" />
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#202c33] rounded-full" />
                            </div>
                            <div>
                                <h3 className="text-white font-medium">Academic AI Bot</h3>
                                <p className="text-[#8696a0] text-xs">Chatting with {activeWhatsAppStudent}...</p>
                            </div>
                        </div>

                        {/* WhatsApp Body background */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-4" style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: 'cover' }}>
                            {whatsappMessages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-2`}>
                                    <div className={`max-w-[85%] rounded-lg px-3 py-2 text-sm shadow-sm ${msg.sender === 'bot' ? 'bg-[#202c33] text-slate-200 rounded-tl-sm' : 'bg-[#005c4b] text-white rounded-tr-sm'}`}>
                                        <p className="whitespace-pre-wrap">{msg.text}</p>
                                        <span className="text-[10px] text-[#8696a0] mt-1 block text-right">Just now</span>
                                    </div>
                                </div>
                            ))}
                            {whatsappMessages.length > 0 && whatsappMessages.length < 5 && (
                                <div className="text-xs text-[#8696a0] italic text-center animate-pulse">
                                    {whatsappMessages.length < 3 ? 'AI is typing...' : `${activeWhatsAppStudent} is typing...`}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Active Call Overlay */}
            {activeCallStudent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-500 pointer-events-none">
                    <div className="relative flex flex-col items-center">
                        <div className="absolute w-64 h-64 bg-indigo-500/20 rounded-full animate-ping" />
                        <div className="absolute w-48 h-48 bg-indigo-500/30 rounded-full animate-pulse" />
                        <div className="relative z-10 p-8 bg-slate-900 border border-indigo-500/50 rounded-3xl shadow-2xl shadow-indigo-500/40 text-center space-y-4">
                            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 scale-110">
                                <PhoneCall className="w-8 h-8 text-white animate-bounce" />
                            </div>
                            <p className="text-sm font-bold tracking-[0.2em] text-indigo-400 uppercase">AI Outbound Call Active</p>
                            <h2 className="text-4xl font-black text-white">{activeCallStudent}</h2>
                            <div className="flex items-center justify-center gap-2 text-slate-400">
                                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs font-mono">ENCRYPTED VOICE LINK ACTIVE</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 relative z-10">
                <div className="space-y-4">
                    <Link href="/dashboard/contests" className="flex items-center text-xs text-slate-400 hover:text-indigo-400 transition-colors">
                        <ArrowLeft className="w-3 h-3 mr-1" /> Back to List
                    </Link>
                    <div className="flex gap-4 items-start">
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-black text-white flex items-center gap-3">
                                    <Target className="w-8 h-8 text-indigo-400" />
                                    Staff Command Center: {contest.name}
                                </h1>
                                <Badge variant="outline" className="border-indigo-500/50 text-indigo-400">
                                    {contest.platform}
                                </Badge>
                                {autoMutation.isPending && (
                                    <Badge className="bg-amber-500 text-slate-950 animate-pulse border-none">
                                        Auto-Pilot Active
                                    </Badge>
                                )}
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                                <span className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1 text-slate-500" />
                                    {format(scheduledTime, "EEE, d MMM yyyy · h:mm a")}
                                </span>
                                <span className="flex items-center">
                                    <Timer className="w-4 h-4 mr-1 text-slate-500" />
                                    {isStarted ? `Started ${timeDiffStr}` : `Starts ${timeDiffStr}`}
                                </span>
                            </div>
                        </div>

                        {/* Demo Logs Card */}
                        <div className="hidden lg:block border-l border-slate-800 pl-4 max-w-sm">
                            <p className="text-[10px] uppercase font-bold text-slate-500 mb-2 tracking-widest">Live Activity Log</p>
                            <div className="space-y-2 h-[60px] overflow-hidden">
                                {systemLogs.length === 0 && <p className="text-xs text-slate-700 italic">No recent activity...</p>}
                                {systemLogs.map(log => (
                                    <div key={log.id} className="flex gap-2 items-start animate-in fade-in slide-in-from-left-2 duration-300">
                                        <span className="text-[10px] tabular-nums text-slate-600 mt-0.5">{log.time}</span>
                                        <p className={`text-[11px] leading-tight ${log.type === 'success' ? 'text-green-400' :
                                            log.type === 'warn' ? 'text-amber-400' :
                                                log.type === 'error' ? 'text-red-400' : 'text-slate-300'
                                            }`}>
                                            {log.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        className={`${autoMutation.isPending ? 'bg-amber-600' : 'bg-indigo-600'} hover:opacity-90 text-white border-none shadow-lg shadow-indigo-500/20 px-6 group transition-all`}
                        onClick={() => autoMutation.mutate()}
                        disabled={autoMutation.isPending}
                    >
                        {autoMutation.isPending ? (
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Zap className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                        )}
                        {autoMutation.isPending ? "Pilot Running..." : "Start Auto-Pilot"}
                    </Button>
                    <Button
                        variant="outline"
                        className="border-slate-800 bg-slate-900 hover:bg-slate-800"
                        onClick={() => {
                            checkMutation.mutate();
                            setHasSynced(true);
                        }}
                        disabled={checkMutation.isPending}
                    >
                        {checkMutation.isPending ? (
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin text-indigo-400" />
                        ) : (
                            <RefreshCw className="mr-2 h-4 w-4" />
                        )}
                        Sync Platform
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
                <Card className="bg-slate-900 border-slate-800">
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <p className="text-sm text-slate-400 font-medium">Total Enrolled</p>
                                <p className="text-3xl font-bold">{totalCount}</p>
                            </div>
                            <div className="p-2 bg-slate-800 rounded-lg">
                                <Users className="w-5 h-5 text-slate-300" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-slate-900 border-slate-800">
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <p className="text-sm text-slate-400 font-medium">Joined</p>
                                <p className="text-3xl font-bold text-green-400">{joinedCount}</p>
                            </div>
                            <div className="p-2 bg-green-500/10 rounded-lg">
                                <CheckCircle2 className="w-5 h-5 text-green-400" />
                            </div>
                        </div>
                        <Progress value={(joinedCount / totalCount) * 100} className="h-1 mt-4 bg-slate-800" />
                    </CardContent>
                </Card>
                <Card className={`bg-slate-900 border-slate-800 transition-all ${missingCount > 0 ? 'ring-1 ring-red-500/50' : ''}`}>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <p className="text-sm text-slate-400 font-medium">Missing</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-3xl font-bold text-red-400">{missingCount}</p>
                                    {isStarted && missingCount > 0 && (
                                        <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                                    )}
                                </div>
                            </div>
                            <div className="p-2 bg-red-500/10 rounded-lg">
                                <AlertCircle className="w-5 h-5 text-red-400" />
                            </div>
                        </div>
                        <Progress value={(missingCount / totalCount) * 100} className="h-1 mt-4 bg-slate-800" />
                    </CardContent>
                </Card>
                <Card className="bg-slate-900 border-slate-800">
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <p className="text-sm text-slate-400 font-medium">Pending</p>
                                <p className="text-3xl font-bold text-amber-400">{pendingCount}</p>
                            </div>
                            <div className="p-2 bg-amber-500/10 rounded-lg">
                                <Timer className="w-5 h-5 text-amber-400" />
                            </div>
                        </div>
                        <Progress value={(pendingCount / totalCount) * 100} className="h-1 mt-4 bg-slate-800" />
                    </CardContent>
                </Card>
            </div>

            {/* Command Center Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 relative z-10">
                {/* Module 1: Live Contest Monitor */}
                <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-xl shadow-xl overflow-hidden flex flex-col h-full">
                    <CardHeader className="border-b border-slate-800/50 bg-slate-900/40">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-xl text-white flex items-center gap-2">
                                <Target className="w-5 h-5 text-indigo-400" /> Live Contest Monitor
                            </CardTitle>
                            <div className="text-xs text-slate-500 flex items-center">
                                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                                Live DB Sync
                            </div>
                        </div>
                        <CardDescription className="text-slate-400">Track real-time contest participation and trigger auto-calls.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 flex-1 overflow-auto max-h-[600px]">
                        <Table>
                            <TableHeader className="bg-slate-950/50 sticky top-0 z-10">
                                <TableRow className="border-slate-800 hover:bg-transparent">
                                    <TableHead className="text-slate-400 font-bold uppercase text-xs">Student</TableHead>
                                    <TableHead className="text-slate-400 font-bold uppercase text-xs">Dept/Sec</TableHead>
                                    <TableHead className="text-slate-400 font-bold uppercase text-xs">Platform ID</TableHead>
                                    <TableHead className="text-slate-400 font-bold uppercase text-xs">Status</TableHead>
                                    <TableHead className="text-right text-slate-400 font-bold uppercase text-xs">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {participations.map((p: any) => {
                                    const callLog = contest.callLogs?.filter((cl: any) => cl.studentId === p.studentId).sort((a: any, b: any) => new Date(b.initiatedAt).getTime() - new Date(a.initiatedAt).getTime())[0];
                                    const identifier = contest.platform === "LeetCode" ? p.student.leetcodeId : p.student.skillrackId;
                                    const isCalling = callLog?.callStatus === "INITIATED" || callLog?.callStatus === "RINGING" || callLog?.callStatus === "IN_PROGRESS";
                                    const isCallSuccess = callLog?.callStatus === "COMPLETED";

                                    return (
                                        <TableRow key={p.id} className={`border-slate-800 hover:bg-slate-800/30 transition-colors ${p.status === 'MISSING' ? 'bg-red-500/5' : ''} ${isCalling ? 'bg-indigo-500/10' : ''}`}>
                                            <TableCell>
                                                <div className="font-semibold text-slate-200 flex items-center gap-2">
                                                    {p.student.name}
                                                    {isCalling && <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-500 animate-ping" />}
                                                </div>
                                                <div className="text-xs text-slate-500 font-mono">{p.student.rollNo}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-xs text-slate-300 font-medium">{p.student.department} - {p.student.section || "A"}</div>
                                            </TableCell>
                                            <TableCell className="font-mono text-xs text-slate-400">{identifier || "—"}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={`${p.status === 'JOINED' ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' : p.status === 'MISSING' ? 'border-red-500/30 text-red-400 bg-red-500/10 pulse-missing' : 'border-amber-500/30 text-amber-400 bg-amber-500/10'}`}>
                                                    {p.status === "JOINED" ? "Joined" : p.status === "MISSING" ? "Missing" : "Pending"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right align-top">
                                                {p.status === 'MISSING' ? (
                                                    <div className="flex flex-col items-end gap-2 mt-1">
                                                        <Button
                                                            size="sm"
                                                            onClick={() => callMutation.mutate(p.studentId)}
                                                            disabled={!hasSynced || isCalling || isCallSuccess || callMutation.isPending}
                                                            className={`w-36 transition-all shadow-md ${!hasSynced ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : isCallSuccess ? 'bg-emerald-600 hover:bg-emerald-600 outline-none ring-0 text-white' : 'bg-indigo-600 hover:bg-indigo-500 text-white'}`}
                                                        >
                                                            {isCalling || callMutation.isPending ? (
                                                                <span className="flex items-center gap-2 text-xs animate-pulse">
                                                                    Connecting...
                                                                </span>
                                                            ) : isCallSuccess ? (
                                                                <span className="flex items-center gap-2 text-xs">
                                                                    <CheckCircle className="w-3.5 h-3.5" /> Call Initiated
                                                                </span>
                                                            ) : (
                                                                <span className="flex items-center gap-2 text-xs">
                                                                    <Phone className="w-3.5 h-3.5" /> Trigger AI Call
                                                                </span>
                                                            )}
                                                        </Button>
                                                        <AnimatePresence>
                                                            {isCallSuccess && (
                                                                <motion.p
                                                                    initial={{ opacity: 0, height: 0 }}
                                                                    animate={{ opacity: 1, height: 'auto' }}
                                                                    className="text-[10px] text-emerald-400 mt-1 pb-1 origin-top text-right w-36"
                                                                >
                                                                    AI Voice Call Initiated: Contacting student.
                                                                </motion.p>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                ) : (
                                                    <Button size="sm" variant="ghost" className={`${p.status === 'JOINED' ? 'text-emerald-500/80 hover:text-emerald-500/80' : 'text-amber-500/80 hover:text-amber-500/80'} cursor-default hover:bg-transparent mt-1`}>
                                                        {p.status === 'JOINED' ? <CheckCircle className="w-4 h-4 mr-1.5" /> : <Clock className="w-4 h-4 mr-1.5" />}
                                                        {p.status === 'JOINED' ? 'Verified' : 'Waiting...'}
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Module 2: Milestone Follow-up (Hackathon Pipeline) */}
                <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-xl shadow-xl overflow-hidden flex flex-col h-full">
                    <CardHeader className="border-b border-slate-800/50 bg-slate-900/40">
                        <CardTitle className="text-xl text-white flex items-center gap-2">
                            <Clock className="w-5 h-5 text-fuchsia-400" /> Hackathon Pipeline
                        </CardTitle>
                        <CardDescription className="text-slate-400">Bridge the communication gap with deadline mapping.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 flex-1 overflow-auto max-h-[600px]">
                        <Table>
                            <TableHeader className="bg-slate-950/50 sticky top-0 z-10">
                                <TableRow className="border-slate-800 hover:bg-transparent">
                                    <TableHead className="text-slate-400 font-bold uppercase text-xs">Team</TableHead>
                                    <TableHead className="text-slate-400 font-bold uppercase text-xs">Stage</TableHead>
                                    <TableHead className="text-right text-slate-400 font-bold uppercase text-xs">Action / Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockTeams.map(team => (
                                    <TableRow key={team.id} className="border-slate-800 hover:bg-slate-800/30 transition-colors">
                                        <TableCell>
                                            <div className="font-semibold text-slate-200">{team.name}</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex">
                                                <Badge variant="outline" className={`
                                                    ${team.hackathon_status === 'Selected for Round 2' ? 'border-amber-500/30 text-amber-400 bg-amber-500/10' : ''}
                                                    ${team.hackathon_status === 'Registered' ? 'border-sky-500/30 text-sky-400 bg-sky-500/10' : ''}
                                                    ${team.hackathon_status === 'Round 1' ? 'border-purple-500/30 text-purple-400 bg-purple-500/10' : ''}
                                                `}>
                                                    {team.hackathon_status}
                                                </Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {team.hackathon_status === 'Selected for Round 2' ? (
                                                <div className="flex flex-col items-end gap-2">
                                                    <div className="text-[10px] text-amber-400 font-mono flex items-center gap-1.5 p-1 px-2 bg-amber-500/10 rounded border border-amber-500/20 shadow-sm">
                                                        <Clock className="w-3 h-3" /> 23h 45m remaining for PPT
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        className="w-[150px] shadow-md transition-all bg-emerald-600 hover:bg-emerald-500 text-white"
                                                    >
                                                        <span className="flex items-center gap-2 text-xs"><MessageSquare className="w-3.5 h-3.5" /> Automated Nudge</span>
                                                    </Button>
                                                </div>
                                            ) : (
                                                <Button size="sm" variant="outline" className="border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white text-xs">
                                                    View Details
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <style jsx global>{`
        @keyframes pulse-missing {
          0% { opacity: 1; }
          50% { opacity: 0.6; }
          100% { opacity: 1; }
        }
        .pulse-missing {
          animation: pulse-missing 2s infinite;
        }
      `}</style>
        </div>
    );
}
