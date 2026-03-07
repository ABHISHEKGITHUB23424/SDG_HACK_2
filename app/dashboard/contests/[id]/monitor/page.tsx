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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    Zap
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function ContestMonitorPage({ params }: { params: { id: string } }) {
    const queryClient = useQueryClient();
    const [now, setNow] = useState(new Date());
    const [systemLogs, setSystemLogs] = useState<{ id: string; text: string; time: string; type: 'info' | 'success' | 'warn' | 'error' }[]>([]);

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

    const participations = contest?.participations || [];
    const joinedCount = participations.filter((p: any) => p.status === "JOINED").length;
    const missingCount = participations.filter((p: any) => p.status === "MISSING").length;
    const pendingCount = participations.filter((p: any) => p.status === "PENDING").length;
    const totalCount = participations.length;

    // Effect to auto-target students based on call logs
    useEffect(() => {
        if (!contest?.callLogs) return;
        const active = contest.callLogs.find((cl: any) =>
            ["INITIATED", "RINGING", "IN_PROGRESS"].includes(cl.callStatus)
        );
        if (active) {
            const student = participations.find((p: any) => p.studentId === active.studentId)?.student;
            setActiveCallStudent(student?.name || null);
        } else {
            setActiveCallStudent(null);
        }
    }, [contest?.callLogs, participations]);

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
                                <h1 className="text-3xl font-bold tracking-tight">{contest.name}</h1>
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
                        onClick={() => checkMutation.mutate()}
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

            {/* Main Table */}
            <Card className="bg-slate-900 border-slate-800 overflow-hidden relative z-10">
                <CardHeader className="bg-slate-950/50 border-b border-slate-800">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">Real-time Participation</CardTitle>
                        <div className="text-xs text-slate-500 flex items-center">
                            <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                            Auto-refreshing every 10s
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-950/20">
                            <TableRow className="border-slate-800 hover:bg-transparent">
                                <TableHead className="w-[80px] text-slate-400">#</TableHead>
                                <TableHead className="text-slate-300">Student Name</TableHead>
                                <TableHead className="text-slate-300">Roll No</TableHead>
                                <TableHead className="text-slate-300">Platform ID</TableHead>
                                <TableHead className="text-slate-300">Status</TableHead>
                                <TableHead className="text-slate-300">Call Status</TableHead>
                                <TableHead className="text-slate-300 text-center">Nudges</TableHead>
                                <TableHead className="text-slate-300 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {participations.map((p: any, idx: number) => {
                                const callLog = contest.callLogs?.filter((cl: any) => cl.studentId === p.studentId).sort((a: any, b: any) => new Date(b.initiatedAt).getTime() - new Date(a.initiatedAt).getTime())[0];
                                const identifier = contest.platform === "LeetCode" ? p.student.leetcodeId : p.student.skillrackId;
                                const isCalling = callLog?.callStatus === "INITIATED" || callLog?.callStatus === "RINGING" || callLog?.callStatus === "IN_PROGRESS";

                                return (
                                    <TableRow key={p.id} className={`border-slate-800 hover:bg-slate-800/30 transition-colors ${p.status === 'MISSING' ? 'bg-red-500/5' : ''} ${isCalling ? 'bg-indigo-500/10' : ''}`}>
                                        <TableCell className="text-slate-500">{idx + 1}</TableCell>
                                        <TableCell className="font-medium text-slate-200">
                                            <div className="flex items-center gap-2">
                                                {p.student.name}
                                                {isCalling && <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-500 animate-ping" />}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-slate-400 text-sm">{p.student.rollNo}</TableCell>
                                        <TableCell className="font-mono text-xs text-slate-400">{identifier || "—"}</TableCell>
                                        <TableCell>
                                            <Badge className={
                                                p.status === "JOINED" ? "bg-green-500/20 text-green-400 border-green-500/50" :
                                                    p.status === "MISSING" ? "bg-red-500/20 text-red-500 border-red-500/50 pulse-missing" :
                                                        p.status === "PENDING" ? "bg-amber-500/20 text-amber-500 border-amber-500/50" :
                                                            "bg-slate-800 text-slate-400"
                                            }>
                                                {p.status === "JOINED" ? "✓ Joined" : p.status === "MISSING" ? "⚠ Missing" : "◌ Pending"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {!callLog ? (
                                                <span className="text-slate-600">—</span>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <div className={`text-xs font-semibold ${callLog.callStatus === "COMPLETED" ? "text-green-400" :
                                                        callLog.callStatus === "FAILED" || callLog.callStatus === "NO_ANSWER" ? "text-orange-400" :
                                                            "text-blue-400"
                                                        }`}>
                                                        {isCalling && <RefreshCw className="inline-block w-3 h-3 mr-1 animate-spin" />}
                                                        {callLog.callStatus}
                                                    </div>
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex justify-center gap-2">
                                                {callLog?.whatsappSent && <MessageSquare className="w-4 h-4 text-green-500" />}
                                                {!callLog?.whatsappSent && <MessageSquare className="w-4 h-4 text-slate-800" />}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {p.status === "MISSING" && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 disabled:opacity-50"
                                                    onClick={() => callMutation.mutate(p.studentId)}
                                                    disabled={isCalling || callMutation.isPending}
                                                >
                                                    <PhoneCall className="w-4 h-4" />
                                                </Button>
                                            )}
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                                                <MoreVertical className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

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
