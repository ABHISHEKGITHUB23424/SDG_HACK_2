"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Bell, LogOut, Users, Trophy, FileText, UserCircle, AlertCircle, Phone, BookOpen, Medal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading" || status === "unauthenticated") {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between">
                <div>
                    <div className="p-6">
                        <h1 className="text-xl font-bold text-indigo-400 flex items-center gap-2">
                            <Trophy className="w-6 h-6" /> Platform
                        </h1>
                    </div>
                    <nav className="mt-4 flex flex-col gap-2 px-4">
                        <Link href="/dashboard/contests" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-md transition-colors text-slate-300">
                            <AlertCircle className="w-5 h-5" /> Contests
                        </Link>
                        <Link href="/dashboard/courses" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-md transition-colors text-slate-300">
                            <BookOpen className="w-5 h-5" /> Courses
                        </Link>
                        <Link href="/dashboard/competitions" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-md transition-colors text-slate-300">
                            <Medal className="w-5 h-5" /> Competitions
                        </Link>
                        <Link href="/dashboard/od-requests" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-md transition-colors text-slate-300">
                            <FileText className="w-5 h-5" /> OD Requests
                        </Link>
                        <Link href="/dashboard/students" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-md transition-colors text-slate-300">
                            <Users className="w-5 h-5" /> Students
                        </Link>
                        <Link href="/dashboard/call-logs" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-md transition-colors text-slate-300">
                            <Phone className="w-5 h-5" /> Call History
                        </Link>
                    </nav>
                </div>
                <div className="p-4 border-t border-slate-800 flex items-center gap-3">
                    <UserCircle className="w-8 h-8 text-slate-400" />
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium truncate">{session?.user?.name}</p>
                        <p className="text-xs text-slate-500 truncate">{session?.user?.email}</p>
                    </div>
                    <Badge variant="secondary" className="bg-indigo-900/50 text-indigo-300">Staff</Badge>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Topbar */}
                <header className="h-16 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between px-8">
                    <h2 className="text-lg font-semibold text-slate-200">Dashboard</h2>
                    <div className="flex items-center gap-4">
                        <Link href="/student-portal" className="flex items-center gap-2 px-4 py-2 bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30 border border-indigo-600/30 rounded-full text-sm font-medium transition-all">
                            <UserCircle className="w-4 h-4" /> Login as Student
                        </Link>
                        <button className="relative p-2 text-slate-400 hover:text-slate-200 transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        </button>
                        <button
                            onClick={() => signOut({ callbackUrl: "/login" })}
                            className="flex items-center gap-2 text-sm text-slate-400 hover:text-red-400 transition-colors"
                        >
                            <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
