"use client";

import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, PhoneCall, MessageCircle } from "lucide-react";

export function ContestTable({ contests, refresh }: { contests: any[], refresh: () => void }) {
    const [expanded, setExpanded] = useState<string | null>(null);
    const [callStatuses, setCallStatuses] = useState<Record<string, boolean>>({});
    const [nudgeStatuses, setNudgeStatuses] = useState<Record<string, boolean | "triggering">>({});

    useEffect(() => {
        const poll = setInterval(() => {
            refresh();
            const now = new Date();
            contests.forEach(contest => {
                const startTime = new Date(contest.startTime);
                const windowPassed = now.getTime() > startTime.getTime() + 15 * 60000;
                if (windowPassed) {
                    contest.participants.forEach(async (p: any) => {
                        if (p.status === "NOT_JOINED") {
                            const callKey = `${contest.id}-${p.studentId}`;
                            if (!callStatuses[callKey]) {
                                const res = await fetch("/api/contests/trigger-call", {
                                    method: "POST",
                                    body: JSON.stringify({ studentId: p.studentId, contestId: contest.id })
                                });
                                if (res.ok) {
                                    setCallStatuses(prev => ({ ...prev, [callKey]: true }));
                                }
                            }
                        }
                    });
                }
            });
        }, 60000);

        return () => clearInterval(poll);
    }, [contests, callStatuses, refresh]);

    const sendNudge = async (studentId: string, contestId: string) => {
        const key = `${contestId}-${studentId}`;
        setNudgeStatuses(prev => ({ ...prev, [key]: "triggering" as any }));
        await fetch("/api/contests/nudge", {
            method: "POST",
            body: JSON.stringify({ phone: "+1234567890", message: "Reminder to join the contest!" })
        });
        setNudgeStatuses(prev => ({ ...prev, [key]: true }));
    };

    return (
        <Table className="text-slate-200">
            <TableHeader>
                <TableRow className="border-slate-800 hover:bg-slate-800/50">
                    <TableHead className="w-8"></TableHead>
                    <TableHead>Contest Title</TableHead>
                    <TableHead>Scheduled Time</TableHead>
                    <TableHead className="text-center">Participants</TableHead>
                    <TableHead className="text-center">Joined Count</TableHead>
                    <TableHead className="text-center">Not Joined Count</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {contests.map((contest) => {
                    const joined = contest.participants.filter((p: any) => p.status === "JOINED").length;
                    const notJoined = contest.participants.filter((p: any) => p.status === "NOT_JOINED").length;

                    return (
                        <React.Fragment key={contest.id}>
                            <TableRow className="border-slate-800 hover:bg-slate-800/30 cursor-pointer" onClick={() => setExpanded(expanded === contest.id ? null : contest.id)}>
                                <TableCell>
                                    {expanded === contest.id ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                                </TableCell>
                                <TableCell className="font-semibold">{contest.title}</TableCell>
                                <TableCell>{new Date(contest.startTime).toLocaleString()}</TableCell>
                                <TableCell className="text-center">{contest.participants.length}</TableCell>
                                <TableCell className="text-center text-green-400 md">{joined}</TableCell>
                                <TableCell className="text-center text-red-400 md">{notJoined}</TableCell>
                            </TableRow>
                            {expanded === contest.id && (
                                <TableRow className="bg-slate-900/40 border-slate-800">
                                    <TableCell colSpan={6} className="p-0 border-b border-slate-800">
                                        <div className="p-4 pl-12 bg-slate-900 shadow-inner">
                                            <Table className="bg-slate-950 border border-slate-800 rounded-md overflow-hidden">
                                                <TableHeader className="bg-slate-900 border-slate-800">
                                                    <TableRow className="border-slate-800">
                                                        <TableHead>Student</TableHead>
                                                        <TableHead>Status</TableHead>
                                                        <TableHead>Automations</TableHead>
                                                        <TableHead className="text-right border-slate-800">Actions</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {contest.participants.map((p: any) => (
                                                        <TableRow key={p.id} className="border-slate-800">
                                                            <TableCell className="font-medium flex items-center gap-2">
                                                                <div className="text-indigo-400">{p.student?.name}</div>
                                                                <div className="text-xs text-slate-600">({p.student?.rollNo})</div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Badge className={
                                                                    p.status === "JOINED" ? "bg-green-900/50 text-green-400 hover:bg-green-900" :
                                                                        p.status === "NOT_JOINED" ? "bg-red-900/50 text-red-400 hover:bg-red-900" :
                                                                            "bg-yellow-900/50 text-yellow-500 hover:bg-yellow-900"
                                                                }>{p.status}</Badge>
                                                            </TableCell>
                                                            <TableCell>
                                                                {callStatuses[`${contest.id}-${p.studentId}`] && (
                                                                    <Badge className="bg-indigo-900/50 text-indigo-300 hover:bg-indigo-900 inline-flex items-center gap-1">
                                                                        <PhoneCall className="w-3 h-3" /> Call Triggered
                                                                    </Badge>
                                                                )}
                                                            </TableCell>
                                                            <TableCell className="text-right">
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 h-8"
                                                                    onClick={(e) => { e.stopPropagation(); sendNudge(p.studentId, contest.id); }}
                                                                    disabled={!!nudgeStatuses[`${contest.id}-${p.studentId}`]}
                                                                >
                                                                    {nudgeStatuses[`${contest.id}-${p.studentId}`] === true ? "Sent" : nudgeStatuses[`${contest.id}-${p.studentId}`] === "triggering" ? "Sending..." : <><MessageCircle className="w-4 h-4 mr-2" /> Nudge</>}
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </React.Fragment>
                    );
                })}
                {contests.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center h-24 text-slate-500">No contests found.</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
