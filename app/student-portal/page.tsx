"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Award, Upload, Link, Trophy, Plus, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function StudentPortal() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [regNo, setRegNo] = useState("24CS0001");
    const [password, setPassword] = useState("password123");
    const [studentName, setStudentName] = useState("");
    const [studentDetails, setStudentDetails] = useState<any>(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [hackathons, setHackathons] = useState<any[]>([]);

    // Form State
    const [hackathonName, setHackathonName] = useState("");
    const [positionSecured, setPositionSecured] = useState("");
    const [proofUrl, setProofUrl] = useState("");
    const [proofUrlError, setProofUrlError] = useState("");
    const [isProofUrlValid, setIsProofUrlValid] = useState(false);
    const [platformLink, setPlatformLink] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/student/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ regNo: regNo.toUpperCase(), password })
            });

            if (res.ok) {
                const data = await res.json();
                setStudentName(data.student.name);
                setStudentDetails(data.student);
                setIsLoggedIn(true);
                fetchHackathons(data.student.rollNo);
            } else {
                const data = await res.json();
                setError(data.error || "Authentication failed");
            }
        } catch (err) {
            setError("Server connection failed");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchHackathons = async (r: string) => {
        const res = await fetch(`/api/student-hackathons?regNo=${encodeURIComponent(r)}`);
        if (res.ok) {
            setHackathons(await res.json());
        }
    };

    const handleProofUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setProofUrl(val);
        const isValid = /^(https?:\/\/)?(www\.)?(drive|docs)\.google\.com\/.+/.test(val);

        if (val && !isValid) {
            setProofUrlError("Please provide a valid Google Drive link.");
            setIsProofUrlValid(false);
        } else if (isValid) {
            setProofUrlError("");
            setIsProofUrlValid(true);
        } else {
            setProofUrlError("");
            setIsProofUrlValid(false);
        }
    };

    const handleSubmitProof = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!/^(https?:\/\/)?(www\.)?(drive|docs)\.google\.com\/.+/.test(proofUrl)) {
            setProofUrlError("Please provide a valid Google Drive link.");
            return;
        }

        setIsSubmitting(true);
        const res = await fetch("/api/student-hackathons", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentName, regNo: studentDetails.rollNo, hackathonName, positionSecured, proofUrl, platformLink })
        });

        if (res.ok) {
            const result = await res.json();
            setHackathons([...hackathons, result.entry]);
            setHackathonName("");
            setPositionSecured("");
            setProofUrl("");
            setPlatformLink("");
            setProofUrlError("");
            setIsProofUrlValid(false);
        }
        setIsSubmitting(false);
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-[#020b18] flex items-center justify-center p-6 selection:bg-sky-500/30">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                    <Card className="w-[400px] bg-slate-900 border-sky-900/50 shadow-2xl shadow-sky-900/20 backdrop-blur-xl">
                        <CardHeader className="text-center pb-2">
                            <div className="w-16 h-16 bg-sky-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-sky-500/30 text-sky-400">
                                <GraduationCap className="w-8 h-8" />
                            </div>
                            <CardTitle className="text-2xl text-white font-bold tracking-tight">Student Portal</CardTitle>
                            <CardDescription className="text-slate-400">Secure entry for intelligence processing</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleLogin} className="space-y-4 pt-4">
                                <AnimatePresence mode="wait">
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="text-red-400 text-xs bg-red-500/10 p-3 rounded-md border border-red-500/20"
                                        >
                                            {error}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <div className="space-y-2">
                                    <label className="text-xs text-slate-400 uppercase font-bold tracking-wider">Register Number</label>
                                    <Input
                                        required
                                        placeholder="e.g. 24CS0001"
                                        className="bg-slate-950/50 border-slate-800 text-white focus-visible:ring-sky-500 h-11 uppercase"
                                        value={regNo} onChange={e => setRegNo(e.target.value)}
                                    />
                                    <p className="text-[10px] text-slate-500 mt-1">Format: 24[DEPT][NO] (e.g. 24CS0001)</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-slate-400 uppercase font-bold tracking-wider">Password</label>
                                    <Input
                                        required
                                        type="password"
                                        placeholder="••••••••"
                                        className="bg-slate-950/50 border-slate-800 text-white focus-visible:ring-sky-500 h-11"
                                        value={password} onChange={e => setPassword(e.target.value)}
                                    />
                                </div>
                                <Button type="submit" disabled={isLoading} className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold h-11 mt-4">
                                    {isLoading ? "Authenticating..." : "Login Securely"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020b18] text-slate-200 p-6 selection:bg-sky-500/30">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-800">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/30">
                            <span className="text-emerald-400 font-bold text-xl">{studentName.charAt(0)}</span>
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-white">{studentName}</h1>
                            <p className="text-sky-400 font-mono text-sm">{regNo}</p>
                        </div>
                    </div>
                    <Button variant="outline" className="border-slate-700 text-slate-300 hover:text-white" onClick={() => setIsLoggedIn(false)}>Sign Out</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Panel: Submission Form */}
                    <div className="md:col-span-1">
                        <Card className="bg-slate-900 border-sky-900/50 shadow-xl shadow-sky-900/10 sticky top-6">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2"><Plus className="w-5 h-5 text-sky-400" /> New Submission</CardTitle>
                                <CardDescription className="text-slate-400 text-sm">Upload your recent hackathon achievements to claim OD.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmitProof} className="space-y-5">
                                    <div className="space-y-1.5">
                                        <label className="text-xs text-slate-400 uppercase font-bold tracking-wider">Event Name</label>
                                        <Input
                                            required placeholder="e.g. Smart India Hackathon"
                                            className="bg-slate-950/50 border-slate-800 text-white"
                                            value={hackathonName} onChange={e => setHackathonName(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs text-slate-400 uppercase font-bold tracking-wider">Position Secured</label>
                                        <select
                                            required
                                            className="flex h-10 w-full rounded-md border border-slate-800 bg-slate-950/50 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-950"
                                            value={positionSecured} onChange={e => setPositionSecured(e.target.value)}
                                        >
                                            <option value="">Select Position...</option>
                                            <option value="Winner">Winner (1st Place)</option>
                                            <option value="Runner Up">Runner Up (2nd/3rd)</option>
                                            <option value="Finalist">Finalist / Top 10</option>
                                            <option value="Participant">Participant</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs text-slate-400 uppercase font-bold tracking-wider">Platform Details (Unstop, Devfolio Link)</label>
                                        <div className="relative">
                                            <Link className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                                            <Input
                                                required type="url" placeholder="https://unstop.com/..."
                                                className="bg-slate-950/50 border-slate-800 text-white pl-9"
                                                value={platformLink} onChange={e => setPlatformLink(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between items-center">
                                            <label className="text-xs text-slate-400 uppercase font-bold tracking-wider">Proof Link (Google Drive)</label>
                                            {isProofUrlValid && <span className="text-xs text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">Link Valid</span>}
                                        </div>
                                        <div className="relative">
                                            <Link className={`absolute left-3 top-2.5 h-4 w-4 ${proofUrlError ? 'text-red-500' : isProofUrlValid ? 'text-emerald-500' : 'text-slate-500'}`} />
                                            <Input
                                                required type="url" placeholder="https://drive.google.com/..."
                                                className={`bg-slate-950/50 text-white pl-9 transition-colors ${proofUrlError ? 'border-red-500 focus-visible:ring-red-500' : isProofUrlValid ? 'border-emerald-500 focus-visible:ring-emerald-500' : 'border-slate-800 focus-visible:ring-sky-500'}`}
                                                value={proofUrl} onChange={handleProofUrlChange}
                                            />
                                        </div>
                                        {proofUrlError && <p className="text-xs text-red-500 mt-1 font-medium">{proofUrlError}</p>}
                                    </div>
                                    <Button disabled={isSubmitting} type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white">
                                        {isSubmitting ? "Uploading..." : <><Upload className="w-4 h-4 mr-2" /> Submit Proof</>}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Panel: History */}
                    <div className="md:col-span-2 space-y-4">
                        <h2 className="text-xl font-bold flex items-center gap-2 mb-6"><Trophy className="w-5 h-5 text-amber-500" /> Your Achievements</h2>
                        <AnimatePresence>
                            {hackathons.length === 0 ? (
                                <div className="text-center p-10 border border-slate-800 border-dashed rounded-xl bg-slate-900/30">
                                    <Award className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                                    <p className="text-slate-400">No hackathon proofs submitted yet.</p>
                                    <p className="text-sm text-slate-500 mt-1">Submit your first one using the form on the left.</p>
                                </div>
                            ) : (
                                hackathons.map((h, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                        key={h.id}
                                    >
                                        <Card className="bg-slate-900/60 border-slate-800 hover:border-sky-900/50 transition-colors">
                                            <CardContent className="p-5 flex justify-between items-center">
                                                <div>
                                                    <h3 className="font-bold text-lg text-white">{h.hackathonName}</h3>
                                                    <div className="flex items-center gap-3 mt-1">
                                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${h.positionSecured === 'Winner' ? 'bg-amber-500/20 text-amber-400' :
                                                            h.positionSecured === 'Participant' ? 'bg-slate-800 text-slate-300' :
                                                                'bg-emerald-500/20 text-emerald-400'
                                                            }`}>
                                                            {h.positionSecured}
                                                        </span>
                                                        <span className="text-xs text-slate-500 font-mono">Submitted on {new Date(h.submittedAt).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                                <a href={h.proofUrl} target="_blank" rel="noreferrer">
                                                    <Button size="sm" variant="outline" className="border-slate-700 bg-slate-950 hover:bg-slate-800">
                                                        View Proof
                                                    </Button>
                                                </a>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
