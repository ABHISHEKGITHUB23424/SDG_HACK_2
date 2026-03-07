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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Activity, LayoutDashboard, Calendar } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { format } from "date-fns";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function ContestsListPage() {
    const queryClient = useQueryClient();
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const { data: contests, isLoading } = useQuery({
        queryKey: ["contests"],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/api/contests`);
            const json = await res.json();
            return json.data;
        },
        refetchInterval: 10000,
    });

    const createMutation = useMutation({
        mutationFn: async (newContest: any) => {
            const res = await fetch(`${API_URL}/api/contests`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newContest),
            });
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contests"] });
            setIsCreateOpen(false);
        },
    });

    const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // Pass the TargetClass to the custom payload so the API filters appropriately
        createMutation.mutate({
            name: formData.get("name"),
            platform: formData.get("platform"),
            externalId: formData.get("externalId"),
            scheduledAt: formData.get("scheduledAt"),
            durationMins: parseInt(formData.get("duration") as string),
            targetClass: formData.get("targetClass") // Simulated backend link
        });
    };

    return (
        <div className="p-6 space-y-6 bg-slate-950 min-h-screen text-slate-100">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Contests Management</h1>
                    <p className="text-slate-400 mt-1">Schedule and monitor automated participation tracking</p>
                </div>

                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger render={<Button className="bg-indigo-600 hover:bg-indigo-700" />}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Create Contest
                    </DialogTrigger>
                    <DialogContent className="bg-slate-900 border-slate-800 text-slate-100">
                        <DialogHeader>
                            <DialogTitle>Schedule New Contest</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleCreate} className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Contest Name</Label>
                                <Input id="name" name="name" required className="bg-slate-950 border-slate-800" placeholder="Weekly Contest #42" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="platform">Platform</Label>
                                    <Select name="platform" defaultValue="LeetCode">
                                        <SelectTrigger className="bg-slate-950 border-slate-800">
                                            <SelectValue placeholder="Select platform" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-slate-800 text-slate-100">
                                            <SelectItem value="LeetCode">LeetCode</SelectItem>
                                            <SelectItem value="SkillRack">SkillRack</SelectItem>
                                            <SelectItem value="Manual">Manual</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="externalId">External ID</Label>
                                    <Input id="externalId" name="externalId" required className="bg-slate-950 border-slate-800" placeholder="weekly-42" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="targetClass">Target Class</Label>
                                <Select name="targetClass" defaultValue="CSEA">
                                    <SelectTrigger className="bg-slate-950 border-slate-800">
                                        <SelectValue placeholder="Select target class" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-900 border-slate-800 text-slate-100">
                                        <SelectItem value="CSEA">CSE A (24CS0001 - 24CS0059)</SelectItem>
                                        <SelectItem value="CSEB">CSE B</SelectItem>
                                        <SelectItem value="ECEA">ECE A</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="scheduledAt">Start Time</Label>
                                    <Input id="scheduledAt" name="scheduledAt" type="datetime-local" required className="bg-slate-950 border-slate-800" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="duration">Duration (mins)</Label>
                                    <Input id="duration" name="duration" type="number" defaultValue="90" required className="bg-slate-950 border-slate-800" />
                                </div>
                            </div>
                            <DialogFooter className="pt-4">
                                <Button type="submit" disabled={createMutation.isPending} className="w-full bg-indigo-600 hover:bg-indigo-700">
                                    {createMutation.isPending ? "Creating..." : "Create & Schedule"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-md border border-slate-800 bg-slate-900">
                <Table>
                    <TableHeader className="bg-slate-950/50">
                        <TableRow className="border-slate-800 hover:bg-transparent">
                            <TableHead className="text-slate-300">Name</TableHead>
                            <TableHead className="text-slate-300">Platform</TableHead>
                            <TableHead className="text-slate-300 text-center">Scheduled Time</TableHead>
                            <TableHead className="text-slate-300 text-center">Status</TableHead>
                            <TableHead className="text-slate-300 text-center">Metrics</TableHead>
                            <TableHead className="text-slate-300 text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10 text-slate-500">
                                    Loading contests...
                                </TableCell>
                            </TableRow>
                        ) : contests?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10 text-slate-500">
                                    No contests found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            contests?.map((contest: any) => (
                                <TableRow key={contest.id} className="border-slate-800 hover:bg-slate-800/50">
                                    <TableCell className="font-medium">{contest.name}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="border-indigo-500/50 text-indigo-400 bg-indigo-500/10">
                                            {contest.platform}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center text-slate-400 text-sm">
                                        {format(new Date(contest.scheduledAt), "EEE, d MMM · h:mm a")}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge className={
                                            contest.status === "ACTIVE" ? "bg-green-500/20 text-green-400 border-green-500/50 animate-pulse" :
                                                contest.status === "SCHEDULED" ? "bg-blue-500/20 text-blue-400 border-blue-500/50" :
                                                    "bg-slate-700/50 text-slate-400 border-slate-600"
                                        }>
                                            {contest.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex items-center justify-center gap-2 text-xs">
                                            <span className="text-green-400 font-bold">{contest.metrics?.joined}</span>
                                            <span className="text-slate-600">/</span>
                                            <span className="text-red-400 font-bold">{contest.metrics?.missing}</span>
                                            <span className="text-slate-600">/</span>
                                            <span className="text-slate-400">{contest.metrics?.total}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Link
                                            href={`/dashboard/contests/${contest.id}/monitor`}
                                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-slate-700 bg-transparent hover:bg-slate-800 h-8 px-3"
                                        >
                                            <Activity className="w-3 h-3 mr-2" /> Monitor
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
