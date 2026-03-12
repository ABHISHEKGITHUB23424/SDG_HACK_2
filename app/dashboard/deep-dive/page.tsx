"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { mockStudents } from "@/lib/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, UserCircle, Target, ChevronRight, Zap, Database, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getDepartmentColor } from "@/lib/utils";

export default function IndividualDeepDivePage() {
    const [query, setQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const router = useRouter();

    const results = query.trim().length >= 2 
        ? mockStudents.filter(s => 
            s.name.toLowerCase().includes(query.toLowerCase()) || 
            s.registerNumber.toLowerCase().includes(query.toLowerCase())
          ).slice(0, 6)
        : [];

    useEffect(() => {
        if (query.trim().length >= 2) {
            setIsSearching(true);
            const timer = setTimeout(() => setIsSearching(false), 600);
            return () => clearTimeout(timer);
        } else {
            setIsSearching(false);
        }
    }, [query]);

    return (
        <div className="max-w-3xl mx-auto space-y-12 py-10">
            <div className="text-center space-y-4">
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-flex items-center justify-center p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 mb-4"
                >
                    <Zap className="w-8 h-8 text-indigo-400" />
                </motion.div>
                <h1 className="text-4xl font-bold font-sora tracking-tight text-white">
                    Individual Student Deep-Dive
                </h1>
                <p className="text-slate-400 font-outfit text-lg">
                    Query our unified audit database of <span className="text-indigo-400 font-bold">1,000+ candidates</span>
                </p>
            </div>

            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition-all duration-500" />
                <div className="relative bg-[#0a0a14] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="flex items-center px-6 h-20">
                        {isSearching ? (
                            <Loader2 className="w-6 h-6 text-indigo-500 animate-spin mr-4" />
                        ) : (
                            <Search className="w-6 h-6 text-slate-500 mr-4" />
                        )}
                        <Input 
                            className="bg-transparent border-none text-xl text-white focus-visible:ring-0 placeholder:text-slate-600 h-full w-full font-sora"
                            placeholder="Enter Register Number or Name..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            autoFocus
                        />
                        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-900 rounded-lg border border-slate-800">
                             <Database className="w-3 h-3 text-slate-500" />
                             <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Live Audit</span>
                        </div>
                    </div>

                    <AnimatePresence>
                        {results.length > 0 && !isSearching && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="border-t border-slate-800 bg-slate-950/40 divide-y divide-slate-900"
                            >
                                {results.map((student, i) => (
                                    <motion.button
                                        initial={{ x: -10, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        key={student.id}
                                        onClick={() => router.push(`/dashboard/deep-dive/${student.id}`)}
                                        className="w-full flex items-center justify-between p-5 hover:bg-indigo-500/5 transition-all group/item text-left relative overflow-hidden"
                                    >
                                        <div className="flex items-center gap-4 relative z-10">
                                            <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold border-2 shadow-inner bg-slate-950" style={{ borderColor: getDepartmentColor(student.department) + '40', color: getDepartmentColor(student.department) }}>
                                                {student.photoInitials}
                                            </div>
                                            <div>
                                                <div className="text-white font-bold text-lg group-hover/item:text-indigo-400 transition-colors">{student.name}</div>
                                                <div className="text-slate-500 font-mono text-xs tracking-widest flex items-center gap-2">
                                                    {student.registerNumber} <span className="opacity-30">|</span> {student.department} <span className="opacity-30">|</span> YEAR {student.year}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 relative z-10">
                                            <div className="hidden sm:flex flex-col items-end mr-4">
                                                <div className="text-[10px] font-mono text-slate-600 uppercase">Audit Status</div>
                                                <div className="text-xs text-indigo-400 font-bold uppercase tracking-wider">Ready</div>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-slate-700 group-hover/item:text-white group-hover/item:translate-x-1 transition-all" />
                                        </div>
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="p-5 rounded-2xl border border-slate-800/60 bg-slate-950/40 flex items-center gap-4 group hover:border-indigo-500/30 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-xs font-mono text-indigo-400 border border-slate-800 group-hover:bg-indigo-500/10 transition-colors">01</div>
                    <div>
                        <div className="text-white font-bold text-sm">Real-time Fitness Scoring</div>
                        <div className="text-xs text-slate-500 font-outfit">Multi-factor algorithmic ranking engine</div>
                    </div>
                 </div>
                 <div className="p-5 rounded-2xl border border-slate-800/60 bg-slate-950/40 flex items-center gap-4 group hover:border-emerald-500/30 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-xs font-mono text-emerald-400 border border-slate-800 group-hover:bg-emerald-500/10 transition-colors">02</div>
                    <div>
                        <div className="text-white font-bold text-sm">Automated Risk Detection</div>
                        <div className="text-xs text-slate-500 font-outfit">ML-powered performance anomaly filtering</div>
                    </div>
                 </div>
            </div>
        </div>
    );
}
