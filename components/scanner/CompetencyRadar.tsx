"use client";

import { ResponsiveContainer, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, RadarChart } from 'recharts';

type RadarChartProps = {
    data: {
        subject: string;
        A: number;
        fullMark: number;
    }[];
};

export function CompetencyRadar({ data }: RadarChartProps) {
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="#1a1a2e" />
                    <PolarAngleAxis 
                        dataKey="subject" 
                        tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 500 }} 
                    />
                    <PolarRadiusAxis 
                        angle={30} 
                        domain={[0, 100]} 
                        axisLine={false} 
                        tick={false} 
                    />
                    <Radar
                        name="Student"
                        dataKey="A"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.4}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
