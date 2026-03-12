"use client";

import { formatDate } from "@/lib/utils";
import { Trophy, Code, BookOpen, AlertCircle, TrendingDown } from "lucide-react";

type TimelineItem = {
    date: string;
    type: 'hackathon' | 'project' | 'academic' | 'discipline' | 'attendance';
    title: string;
    detail: string;
    severity?: 'minor' | 'major';
};

export function ActivityTimeline({ items }: { items: TimelineItem[] }) {
    const getIcon = (type: string) => {
        switch (type) {
            case 'hackathon': return <Trophy className="w-4 h-4 text-amber-500" />;
            case 'project': return <Code className="w-4 h-4 text-blue-500" />;
            case 'academic': return <BookOpen className="w-4 h-4 text-emerald-500" />;
            case 'discipline': return <AlertCircle className="w-4 h-4 text-red-500" />;
            case 'attendance': return <TrendingDown className="w-4 h-4 text-orange-500" />;
            default: return null;
        }
    };

    return (
        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-slate-800 before:via-slate-800 before:to-transparent">
            {items.map((item, idx) => (
                <div key={idx} className="relative flex items-center justify-between md:justify-start md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-800 bg-[#0f0f1a] z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl transition-all group-hover:border-indigo-500/50">
                        {getIcon(item.type)}
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl bg-slate-900/40 border border-slate-800 group-hover:border-slate-700 transition-all">
                        <div className="flex items-center justify-between mb-2">
                             <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">{formatDate(item.date)}</div>
                             {item.severity && <span className={`w-2 h-2 rounded-full ${item.severity === 'major' ? 'bg-red-500 animate-pulse' : 'bg-orange-500'}`} />}
                        </div>
                        <h4 className="font-bold text-slate-200 text-sm">{item.title}</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.detail}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
