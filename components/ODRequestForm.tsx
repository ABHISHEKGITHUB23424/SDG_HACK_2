import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ODRequestForm({ onSubmitted }: { onSubmitted: () => void }) {
    const [teamName, setTeamName] = useState("");
    const [githubIds, setGithubIds] = useState("");
    const [avgCGPA, setAvgCGPA] = useState("");
    const [totalHackathons, setTotalHackathons] = useState("");
    const [studentId, setStudentId] = useState("");
    const [students, setStudents] = useState([]);
    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        fetch("/api/students").then(res => res.json()).then(setStudents);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setResult(null);
        const res = await fetch("/api/od-requests", {
            method: "POST",
            body: JSON.stringify({ teamName, githubIds, avgCGPA, totalHackathons, studentId })
        });
        const data = await res.json();
        setResult(data.evaluation);
        onSubmitted();
    };

    return (
        <Card className="bg-slate-900 border-slate-800 text-slate-100 h-full">
            <CardHeader>
                <CardTitle>Submit Request</CardTitle>
                <CardDescription className="text-slate-400">Evaluate a team parameters based on Random Forest rules.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm">Submitting Student</label>
                        <select
                            required
                            className="w-full h-10 px-3 bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:border-indigo-500"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                        >
                            <option value="">Select Student...</option>
                            {students.map((s: any) => <option key={s.id} value={s.id}>{s.name} ({s.rollNo})</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm">Team Name</label>
                        <Input required className="bg-slate-800 border-slate-700" value={teamName} onChange={e => setTeamName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm">GitHub IDs (comma-separated)</label>
                        <Input required className="bg-slate-800 border-slate-700" placeholder="user1, user2" value={githubIds} onChange={e => setGithubIds(e.target.value)} />
                    </div>
                    <div className="flex gap-4">
                        <div className="space-y-2 flex-1">
                            <label className="text-sm">Team Avg CGPA</label>
                            <Input required type="number" step="0.1" className="bg-slate-800 border-slate-700" value={avgCGPA} onChange={e => setAvgCGPA(e.target.value)} />
                        </div>
                        <div className="space-y-2 flex-1">
                            <label className="text-sm">Hackathon Count</label>
                            <Input required type="number" className="bg-slate-800 border-slate-700" value={totalHackathons} onChange={e => setTotalHackathons(e.target.value)} />
                        </div>
                    </div>
                    <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">Evaluate</Button>
                </form>

                {result && (
                    <div className="mt-6 p-4 rounded-md border border-slate-800 bg-slate-950/50">
                        <h4 className="text-sm font-semibold mb-2 text-slate-300">Evaluation Result</h4>
                        <div className="flex items-center gap-2 mb-2">
                            <Badge className={result.status === "RECOMMENDED" ? "bg-green-900/50 text-green-400 hover:bg-green-900" : "bg-orange-900/50 text-orange-400 hover:bg-orange-900"}>
                                {result.status}
                            </Badge>
                            <span className="text-sm font-mono text-indigo-400">{result.confidence}% Confidence</span>
                        </div>
                        <p className="text-sm text-slate-400">{result.reason}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
