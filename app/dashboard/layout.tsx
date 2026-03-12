"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { 
    Bell, LogOut, Users, Trophy, FileText, UserCircle, AlertCircle, Phone, 
    Cpu, LayoutDashboard, Target, Medal, BarChart3, Search, Zap, 
    ChevronRight, PieChart, Menu, X, ShieldCheck
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading" || status === "unauthenticated") {
        return <div className="min-h-screen flex items-center justify-center bg-[#050b14] text-white">Authenticating...</div>;
    }

    const navItems = [
        { name: "Deep Scanner", href: "/dashboard", icon: Target },
        { name: "Bulk Screening", href: "/dashboard/bulk-screening", icon: FileText },
        { name: "Individual Deep-Dive", href: "/dashboard/deep-dive", icon: Users },
        { name: "Analytics", href: "/dashboard/analytics", icon: Trophy },
    ];

    const secondaryItems = [
        { name: "Contest Bot", href: "/dashboard/contests", icon: AlertCircle },
        { name: "OD Requests", href: "/dashboard/od-requests", icon: Medal },
        { name: "Call History", href: "/dashboard/call-logs", icon: Phone },
    ];

    return (
        <div className="flex min-h-screen bg-[#070710] text-slate-100 selection:bg-indigo-500/30 font-sans">
            {/* Sidebar */}
            <motion.aside 
                initial={false}
                animate={{ width: isSidebarCollapsed ? 80 : 280 }}
                className="fixed left-0 top-0 bottom-0 z-50 bg-[#0f0f1a] border-r border-slate-800 flex flex-col shadow-2xl"
            >
                {/* Sidebar Header */}
                <div className="h-20 flex items-center px-6 border-b border-slate-800/50">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="bg-blue-600/20 p-2 rounded-xl border border-blue-500/30 shrink-0">
                            <ShieldCheck className="w-5 h-5 text-blue-400" />
                        </div>
                        {!isSidebarCollapsed && (
                            <motion.span 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-sm font-bold tracking-tight text-white whitespace-nowrap"
                            >
                                DEEP SCANNER <span className="text-blue-500 text-[10px] ml-1 uppercase font-mono">v2.0</span>
                            </motion.span>
                        )}
                    </div>
                </div>

                {/* Primary Nav */}
                <nav className="flex-1 p-4 space-y-1.5 mt-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all group relative
                                    ${isActive ? "bg-blue-600/10 text-white border border-blue-500/20" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"}`}
                            >
                                <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                                {!isSidebarCollapsed && (
                                    <span className="text-sm font-medium">{item.name}</span>
                                )}
                                {isActive && (
                                    <div className="absolute left-0 w-1 h-6 bg-blue-500 rounded-r-full" />
                                )}
                            </Link>
                        );
                    })}

                    <div className="my-6 border-t border-slate-800/50 mx-2" />

                    {/* Secondary Section Header */}
                    {!isSidebarCollapsed && (
                        <div className="px-4 mb-2 text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                            Secondary Tools
                        </div>
                    )}

                    {secondaryItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-slate-800/40 transition-all group"
                        >
                            <item.icon className="w-4 h-4 shrink-0 group-hover:text-slate-400" />
                            {!isSidebarCollapsed && (
                                <span className="text-xs font-medium">{item.name}</span>
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Sidebar Footer / Toggle */}
                <div className="p-4 border-t border-slate-800/50">
                    <button 
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        className="w-full flex items-center justify-center p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-500 hover:text-white transition-colors"
                    >
                        {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </button>
                    {!isSidebarCollapsed && (
                        <div className="mt-4 flex items-center gap-3 px-2">
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 border border-slate-700">SR</div>
                            <div className="overflow-hidden">
                                <div className="text-[10px] font-bold text-slate-300 truncate">Dr. S. Raghavan</div>
                                <div className="text-[8px] font-mono text-blue-500 uppercase tracking-tighter truncate">HOD CSE AUDIT</div>
                            </div>
                        </div>
                    )}
                </div>
            </motion.aside>

            {/* Main Content */}
            <main 
                className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'pl-[80px]' : 'pl-[280px]'}`}
            >
                {/* Top Header */}
                <header className="h-20 bg-[#070710]/80 backdrop-blur-xl sticky top-0 z-40 border-b border-slate-800/50 px-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 flex items-center gap-2">
                            <span className="text-[10px] font-mono text-slate-500 uppercase">Audit Context</span>
                            <div className="h-3 w-px bg-slate-800" />
                            <Select defaultValue="CSE">
                                <SelectTrigger className="bg-transparent border-none h-auto p-0 text-xs font-bold text-white focus:ring-0">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-[#0f0f1a] border-slate-800 text-white">
                                    <SelectItem value="All">Global Database</SelectItem>
                                    <SelectItem value="CSE">Dept of CSE</SelectItem>
                                    <SelectItem value="ECE">Dept of ECE</SelectItem>
                                    <SelectItem value="IT">Dept of IT</SelectItem>
                                    <SelectItem value="MECH">Dept of MECH</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-slate-900" />
                        </button>
                        <button 
                            onClick={() => signOut({ callbackUrl: "/login" })}
                            className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-8 max-w-screen-2xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
