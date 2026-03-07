"use client";

import { useQuery } from "@tanstack/react-query";
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
import { Card, CardContent } from "@/components/ui/card";
import {
    Phone,
    PhoneOff,
    MessageSquare,
    Download,
    AlertTriangle,
    CheckCircle,
    Filter,
    Search
} from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function CallLogsPage() {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const { data, isLoading } = useQuery({
        queryKey: ["call-logs", page],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/api/call-logs?page=${page}`);
            const json = await res.json();
            return json.data;
        },
    });

    const exportToCSV = () => {
        if (!data?.logs) return;

        const headers = ["Student", "Contest", "Status", "Date", "Triggered By", "WhatsApp"];
        const rows = data.logs.map((log: any) => [
            log.student.name,
            log.contest.name,
            log.callStatus,
            format(new Date(log.initiatedAt), "yyyy-MM-dd HH:mm"),
            log.triggeredBy,
            log.whatsappSent ? "Yes" : "No"
        ]);

        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `call_logs_${format(new Date(), "yyyyMMdd")}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const logs = data?.logs || [];
    const total = data?.total || 0;

    return (
        <div className="p-6 space-y-6 bg-slate-950 min-h-screen text-slate-100">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Call History</h1>
                    <p className="text-slate-400 mt-1">Audit trail for all AI voice and WhatsApp nudges</p>
                </div>
                <Button
                    variant="outline"
                    className="border-slate-800 bg-slate-900"
                    onClick={exportToCSV}
                >
                    <Download className="mr-2 h-4 w-4" /> Export CSV
                </Button>
            </div>

            {/* Stats Summary Area (Optional Placeholder) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-slate-900 border-slate-800">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-2 bg-indigo-500/10 rounded-full">
                            <Phone className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Total Calls</p>
                            <p className="text-xl font-bold">{total}</p>
                        </div>
                    </CardContent>
                </Card>
                {/* More cards can be added here if backend supported counts for all */}
            </div>

            <div className="rounded-md border border-slate-800 bg-slate-900">
                <div className="p-4 border-b border-slate-800 flex justify-between gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                        <Input
                            placeholder="Search students or contests..."
                            className="pl-9 bg-slate-950 border-slate-800"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="border-slate-800">
                        <Filter className="mr-2 h-4 w-4" /> Filters
                    </Button>
                </div>
                <Table>
                    <TableHeader className="bg-slate-950/50">
                        <TableRow className="border-slate-800 hover:bg-transparent">
                            <TableHead className="text-slate-300">Student</TableHead>
                            <TableHead className="text-slate-300">Contest</TableHead>
                            <TableHead className="text-slate-300">Status</TableHead>
                            <TableHead className="text-slate-300">Date & Time</TableHead>
                            <TableHead className="text-slate-300">WhatsApp</TableHead>
                            <TableHead className="text-slate-300 text-right">Trigger</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10 text-slate-500">
                                    Loading history...
                                </TableCell>
                            </TableRow>
                        ) : logs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10 text-slate-500">
                                    No records matching criteria.
                                </TableCell>
                            </TableRow>
                        ) : (
                            logs.map((log: any) => (
                                <TableRow key={log.id} className="border-slate-800 hover:bg-slate-800/50">
                                    <TableCell>
                                        <div className="font-medium text-slate-200">{log.student.name}</div>
                                        <div className="text-xs text-slate-500 font-mono tracking-tighter">{log.student.phone}</div>
                                    </TableCell>
                                    <TableCell className="text-slate-300 text-sm">{log.contest.name}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1.5">
                                            {log.callStatus === "COMPLETED" ? <CheckCircle className="w-3 h-3 text-green-500" /> :
                                                log.callStatus === "FAILED" ? <AlertTriangle className="w-3 h-3 text-red-500" /> :
                                                    <Phone className="w-3 h-3 text-blue-500" />}
                                            <span className={`text-xs font-semibold ${log.callStatus === "COMPLETED" ? "text-green-500" :
                                                    log.callStatus === "FAILED" ? "text-red-500" :
                                                        "text-slate-300"
                                                }`}>{log.callStatus}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-slate-400 text-sm">
                                        {format(new Date(log.initiatedAt), "d MMM yyyy, h:mm a")}
                                    </TableCell>
                                    <TableCell>
                                        {log.whatsappSent ? (
                                            <div className="flex items-center text-xs text-green-500">
                                                <MessageSquare className="w-3 h-3 mr-1" /> Sent
                                            </div>
                                        ) : (
                                            <span className="text-slate-600">—</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant="outline" className="border-slate-700 text-[10px] uppercase font-bold text-slate-500">
                                            {log.triggeredBy}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>

                <div className="p-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
                    <div>Showing {logs.length} of {total} records</div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-slate-800"
                            disabled={page === 1}
                            onClick={() => setPage(p => p - 1)}
                        >Previous</Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-slate-800"
                            disabled={logs.length < 20}
                            onClick={() => setPage(p => p + 1)}
                        >Next</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
