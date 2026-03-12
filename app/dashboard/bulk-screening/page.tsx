"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { mockStudents } from "@/lib/mockData";
import { calculateCandidateScore } from "@/lib/fitnessScorer";
import { generateAIRecommendation } from "@/lib/aiRecommendation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table";
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Search, Filter, Play, Download, ExternalLink, ShieldAlert, CheckCircle2, Bookmark, Flame, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getBadgeColor, getDepartmentColor } from "@/lib/utils";

export default function BulkScreeningPage() {
    const router = useRouter();
    const [compType, setCompType] = useState("National Hackathon");
    const [dept, setDept] = useState("All");
    const [year, setYear] = useState("All");
    const [minScore, setMinScore] = useState(60);
    const [excludeHighRisk, setExcludeHighRisk] = useState(true);
    const [isScanning, setIsScanning] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const studentsWithScores = useMemo(() => {
        return mockStudents.map(s => ({
            ...s,
            result: calculateCandidateScore(s, mockStudents)
        }));
    }, []);

    const filteredStudents = useMemo(() => {
        return studentsWithScores
            .filter(s => {
                if (dept !== "All" && s.department !== dept) return false;
                if (year !== "All" && s.year.toString() !== year) return false;
                if (s.result.fitnessScore < minScore) return false;
                if (excludeHighRisk && s.result.badge === 'HIGH_RISK') return false;
                return true;
            })
            .sort((a, b) => b.result.fitnessScore - a.result.fitnessScore)
            .slice(0, 20);
    }, [studentsWithScores, dept, year, minScore, excludeHighRisk]);

    const handleRunScan = () => {
        setIsScanning(true);
        setTimeout(() => {
            setIsScanning(false);
            setShowResults(true);
        }, 1500);
    };

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-sora tracking-tight text-white flex items-center gap-3">
                        <Filter className="w-8 h-8 text-blue-500" />
                        Bulk Eligibility Screening
                    </h1>
                    <p className="text-slate-400 mt-1 font-outfit">
                        Scan the department database for competition-ready candidates
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-slate-800 bg-slate-900 font-mono text-xs">
                        <Download className="w-4 h-4 mr-2" />
                        EXPORT PDF
                    </Button>
                </div>
            </div>

            {/* Competition Selector Panel */}
            <Card className="bg-[#0f0f1a] border-slate-800 overflow-hidden shadow-2xl">
                <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                        <div className="space-y-2">
                            <Label className="text-xs font-mono uppercase text-slate-500">Competition Type</Label>
                            <Select value={compType} onValueChange={setCompType}>
                                <SelectTrigger className="bg-slate-950 border-slate-800 h-11 text-slate-200">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-900 border-slate-800 text-slate-100">
                                    <SelectItem value="National Hackathon">National Hackathon</SelectItem>
                                    <SelectItem value="State-Level Contest">State-Level Contest</SelectItem>
                                    <SelectItem value="Internal Fest">Internal Fest</SelectItem>
                                    <SelectItem value="Research Symposium">Research Symposium</SelectItem>
                                    <SelectItem value="Industry Project">Industry Project</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-mono uppercase text-slate-500">Target Department</Label>
                            <Select value={dept} onValueChange={setDept}>
                                <SelectTrigger className="bg-slate-950 border-slate-800 h-11 text-slate-200">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-900 border-slate-800 text-slate-100">
                                    <SelectItem value="All">All Departments</SelectItem>
                                    <SelectItem value="CSE">Computer Science (CSE)</SelectItem>
                                    <SelectItem value="ECE">Electronics (ECE)</SelectItem>
                                    <SelectItem value="IT">Information Tech (IT)</SelectItem>
                                    <SelectItem value="MECH">Mechanical (MECH)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-mono uppercase text-slate-500">Year Filter</Label>
                            <Select value={year} onValueChange={setYear}>
                                <SelectTrigger className="bg-slate-950 border-slate-800 h-11 text-slate-200">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-900 border-slate-800 text-slate-100">
                                    <SelectItem value="All">All Years</SelectItem>
                                    <SelectItem value="2">2nd Year</SelectItem>
                                    <SelectItem value="3">3rd Year</SelectItem>
                                    <SelectItem value="4">4th Year</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col gap-3">
                           <div className="flex items-center justify-between px-1">
                                <Label className="text-xs font-mono uppercase text-slate-500">Min Score: {minScore}</Label>
                           </div>
                           <Slider 
                                value={[minScore]} 
                                onValueChange={(v) => setMinScore(v[0])} 
                                max={100} 
                                step={5} 
                                className="my-2"
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-slate-800/50 pt-6">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center space-x-2">
                                <Switch id="risk-toggle" checked={excludeHighRisk} onCheckedChange={setExcludeHighRisk} />
                                <Label htmlFor="risk-toggle" className="text-sm text-slate-300">Exclude High Risk Candidates</Label>
                            </div>
                        </div>
                        <Button 
                            onClick={handleRunScan} 
                            disabled={isScanning}
                            className={`h-12 px-8 font-bold transition-all ${isScanning ? 'bg-slate-800' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/40'}`}
                        >
                            {isScanning ? (
                                <>
                                    <Flame className="w-5 h-5 mr-2 animate-pulse text-orange-400" />
                                    DEEP SCANNING...
                                </>
                            ) : (
                                <>
                                    <Filter className="w-5 h-5 mr-2" />
                                    RUN DEEP SCAN
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Results Section */}
            <AnimatePresence>
                {showResults && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center justify-between px-2 text-sm text-slate-400 font-mono">
                            <div>FOUND {filteredStudents.length} ELIGIBLE CANDIDATES MATCHING PARAMETERS</div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500" />
                                RANKED BY FITNESS PERCENTILE
                            </div>
                        </div>

                        <Card className="bg-[#0f0f1a] border-slate-800 shadow-sm overflow-hidden">
                            <Table>
                                <TableHeader className="bg-slate-950/50">
                                    <TableRow className="border-slate-800 hover:bg-transparent">
                                        <TableHead className="w-12 text-slate-500 font-mono">#</TableHead>
                                        <TableHead className="text-slate-400 font-bold uppercase text-xs">Student Profile</TableHead>
                                        <TableHead className="text-slate-400 font-bold uppercase text-xs">Fitness Score</TableHead>
                                        <TableHead className="text-slate-400 font-bold uppercase text-xs">Innovation</TableHead>
                                        <TableHead className="text-slate-400 font-bold uppercase text-xs">Academics</TableHead>
                                        <TableHead className="text-slate-400 font-bold uppercase text-xs">Risk Flags</TableHead>
                                        <TableHead className="text-right text-slate-400 font-bold uppercase text-xs">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredStudents.map((student, idx) => (
                                        <TableRow 
                                            key={student.id} 
                                            onClick={() => router.push(`/dashboard/deep-dive/${student.id}`)}
                                            className="border-slate-800 hover:bg-slate-800/20 transition-all cursor-pointer group"
                                        >
                                            <TableCell className="font-mono text-slate-600">{idx + 1}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold border" style={{ borderColor: getDepartmentColor(student.department) + '40', backgroundColor: getDepartmentColor(student.department) + '10', color: getDepartmentColor(student.department) }}>
                                                        {student.photoInitials}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-slate-100 flex items-center gap-2">
                                                            {student.name}
                                                            {student.result.badge === 'ELITE' && <Trophy className="w-3 h-3 text-amber-500" />}
                                                        </div>
                                                        <div className="text-[10px] font-mono text-slate-500">{student.registerNumber} • {student.department}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg font-bold font-ibm text-white">{Math.round(student.result.fitnessScore)}</span>
                                                    <Badge variant="outline" className="text-[10px] py-0 h-4 border-slate-700 bg-slate-800/50" style={{ color: getBadgeColor(student.result.badge) }}>
                                                        {student.result.badge}
                                                    </Badge>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="w-16 h-1.5 bg-slate-900 rounded-full overflow-hidden">
                                                    <div className="h-full bg-blue-500" style={{ width: `${student.result.innovationScore}%` }} />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="w-16 h-1.5 bg-slate-900 rounded-full overflow-hidden">
                                                    <div className="h-full bg-emerald-500" style={{ width: `${student.result.academicScore}%` }} />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {student.result.redFlags.length > 0 ? (
                                                    <div className="flex -space-x-1">
                                                        {student.result.redFlags.map((_, i) => (
                                                            <div key={i} className="w-2 h-2 rounded-full bg-red-500 border border-slate-900" />
                                                        ))}
                                                        <span className="text-[10px] ml-2 text-red-400 font-mono">FLAGGED</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-[10px] text-slate-600 font-mono">—</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-emerald-400 hover:bg-emerald-500/10">
                                                        <CheckCircle2 className="w-4 h-4" />
                                                    </Button>
                                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-400 hover:bg-blue-500/10">
                                                        <Bookmark className="w-4 h-4" />
                                                    </Button>
                                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:bg-slate-800">
                                                        <ExternalLink className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {filteredStudents.length === 0 && (
                                <div className="p-10 text-center text-slate-500 font-outfit">
                                    No candidates found matching these strict auditing parameters.
                                </div>
                            )}
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
