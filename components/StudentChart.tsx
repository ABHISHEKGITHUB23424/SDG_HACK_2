"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export function StudentChart({ history }: { history: number[] }) {
    const data = history.map((val, index) => ({
        name: `Sem ${index + 1}`,
        events: val
    }));

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                        cursor={{ fill: "#1e293b" }}
                        contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", color: "#f8fafc" }}
                        labelStyle={{ color: "#94a3b8" }}
                    />
                    <Bar dataKey="events" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
