"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Shield, LogOut, Users, UserCircle, Database, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        } else if (status === "authenticated" && (session?.user as any)?.role !== "ADMIN") {
            router.push("/dashboard/contests");
        }
    }, [status, router, session]);

    if (status === "loading" || status === "unauthenticated" || (session?.user as any)?.role !== "ADMIN") {
        return <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">Verifying Admin Access...</div>;
    }

    return (
        <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 bg-slate-900 border-r border-purple-900/40 flex flex-col justify-between">
                <div>
                    <div className="p-6">
                        <h1 className="text-xl font-bold text-purple-400 flex items-center gap-2">
                            <Shield className="w-6 h-6" /> Admin Portal
                        </h1>
                    </div>
                    <nav className="mt-4 flex flex-col gap-2 px-4">
                        <Link href="/admin/dashboard" className="flex items-center gap-2 px-4 py-2 hover:bg-purple-900/30 rounded-md transition-colors text-slate-300">
                            <Database className="w-5 h-5" /> All Data View
                        </Link>
                    </nav>
                </div>
                <div className="p-4 border-t border-slate-800 flex items-center gap-3">
                    <UserCircle className="w-8 h-8 text-slate-400" />
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium truncate">{session?.user?.name}</p>
                        <p className="text-xs text-slate-500 truncate">{session?.user?.email}</p>
                    </div>
                    <Badge variant="secondary" className="bg-purple-900/50 text-purple-300">Admin</Badge>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Topbar */}
                <header className="h-16 bg-slate-900/50 border-b border-purple-900/30 flex items-center justify-between px-8">
                    <div className="flex items-center gap-2 text-red-400 text-sm font-medium">
                        <Eye className="w-4 h-4" /> Global Read-Only Access
                    </div>
                    <div className="flex items-center gap-4">
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
