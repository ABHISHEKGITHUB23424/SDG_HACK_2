"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Briefcase, Shield, Cpu, Lock, ArrowRight } from "lucide-react";

type LoginType = "student" | "staff" | "admin";

export default function LoginPage() {
    const [loginType, setLoginType] = useState<LoginType>("staff");

    const [email, setEmail] = useState("24cs0001@academy.edu");
    const [password, setPassword] = useState("password123");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleLoginTypeChange = (type: LoginType) => {
        setLoginType(type);
        setError("");
        if (type === "admin") {
            setEmail("admin@academy.edu");
            setPassword("admin123");
        } else if (type === "staff") {
            setEmail("24cs0001@academy.edu");
            setPassword("password123");
        } else {
            setEmail("");
            setPassword("");
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (loginType === "student") {
            router.push("/student-portal");
            return;
        }

        setIsLoading(true);

        let finalEmail = email;
        if (loginType === 'staff' && !email.includes('@')) {
            finalEmail = `${email.toLowerCase()}@academy.edu`;
        }

        const res = await signIn("credentials", {
            email: finalEmail,
            password,
            redirect: false,
        });

        if (res?.error) {
            setIsLoading(false);
            setError(`Invalid credentials // Try ${loginType === "admin" ? "admin@academy.edu / admin123" : "24cs0001@academy.edu / password123"}`);
        } else {
            if (loginType === "admin") {
                router.push("/admin/dashboard");
            } else {
                router.push("/dashboard/contests");
            }
            router.refresh();
        }
    };

    const tabs = [
        { id: "student", label: "Student", icon: GraduationCap, color: "sky", bg: "bg-sky-500/10", border: "border-sky-500/50", text: "text-sky-400" },
        { id: "staff", label: "Staff", icon: Briefcase, color: "indigo", bg: "bg-indigo-500/10", border: "border-indigo-500/50", text: "text-indigo-400" },
        { id: "admin", label: "Admin", icon: Shield, color: "purple", bg: "bg-purple-500/10", border: "border-purple-500/50", text: "text-purple-400" },
    ] as const;

    const currentTabDetails = tabs.find(t => t.id === loginType)!;

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center p-4 bg-[#050b14] overflow-hidden selection:bg-indigo-500/30">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className={`absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full mix-blend-screen filter blur-[100px] opacity-20 transition-colors duration-700
                    ${loginType === 'staff' ? 'bg-indigo-600' : loginType === 'admin' ? 'bg-purple-600' : 'bg-sky-600'}`}></div>
                <div className={`absolute top-[60%] -right-[10%] w-[40%] h-[60%] rounded-full mix-blend-screen filter blur-[120px] opacity-20 transition-colors duration-700
                    ${loginType === 'staff' ? 'bg-blue-600' : loginType === 'admin' ? 'bg-fuchsia-600' : 'bg-cyan-600'}`}></div>
            </div>

            <div className="z-10 w-full max-w-md">
                {/* Logo & Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="inline-flex items-center justify-center p-3 bg-slate-900/50 rounded-2xl border border-slate-800 mb-4 shadow-2xl backdrop-blur-xl">
                        <Cpu className={`w-10 h-10 ${currentTabDetails.text} transition-colors duration-500`} />
                    </div>
                    <h1 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                        Nexus <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400">Workspace</span>
                    </h1>
                    <p className="text-slate-400 mt-2 text-sm font-medium">Effortless, stress-free management for modern educators.</p>
                </motion.div>

                {/* Tabs */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex p-1 bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-800 mb-6 relative z-20 shadow-xl"
                >
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = loginType === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => handleLoginTypeChange(tab.id as LoginType)}
                                className={`relative flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium rounded-lg transition-all duration-300 z-10
                                    ${isActive ? "text-white" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"}`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-slate-800 rounded-lg border border-slate-700 shadow-md -z-10"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <Icon className={`w-4 h-4 ${isActive ? tab.text : ""}`} />
                                {tab.label}
                            </button>
                        );
                    })}
                </motion.div>

                {/* Login Card */}
                <motion.div
                    key={loginType}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card className={`bg-slate-900/80 backdrop-blur-xl border ${currentTabDetails.border} shadow-2xl transition-colors duration-500`}>
                        <CardHeader className="pb-6">
                            <CardTitle className="text-xl text-white flex items-center gap-2">
                                <div className={`p-2 rounded-lg ${currentTabDetails.bg} ${currentTabDetails.text}`}>
                                    <currentTabDetails.icon className="w-5 h-5" />
                                </div>
                                {currentTabDetails.label} Portal
                            </CardTitle>
                            <CardDescription className="text-slate-400 mt-2">
                                {loginType === "student" && "Access your hackathon submissions and profiles."}
                                {loginType === "staff" && "Manage contests, students, and intelligence workflows."}
                                {loginType === "admin" && "Global system oversight and configuration access."}
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={handleLogin} className="space-y-5">
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

                                {loginType !== "student" ? (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase font-bold tracking-wider text-slate-400">
                                                {loginType === "staff" ? "Email Address or Staff ID" : "Email Address"}
                                            </label>
                                            <div className="relative">
                                                <Input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                    className="bg-slate-950/50 border-slate-800 text-white pl-10 h-11 focus-visible:ring-1 focus-visible:ring-indigo-500"
                                                />
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
                                                    <Lock className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase font-bold tracking-wider text-slate-400">Access Key</label>
                                            <div className="relative">
                                                <Input
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                    className="bg-slate-950/50 border-slate-800 text-white pl-10 h-11 focus-visible:ring-1 focus-visible:ring-indigo-500"
                                                />
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
                                                    <Lock className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="py-2">
                                        <p className="text-sm text-slate-400 p-4 bg-slate-950 border border-slate-800 rounded-lg text-center leading-relaxed">
                                            Students use the dedicated secure portal for tracking hackathon logs and AI interactions.
                                        </p>
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full h-12 text-md font-bold text-white transition-all duration-300
                                        ${loginType === 'staff' ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/25' :
                                            loginType === 'admin' ? 'bg-purple-600 hover:bg-purple-500 shadow-purple-500/25' :
                                                'bg-sky-600 hover:bg-sky-500 shadow-sky-500/25'} 
                                        hover:shadow-lg`}
                                >
                                    {isLoading ? "Authenticating..." : (
                                        <span className="flex items-center justify-center gap-2">
                                            {loginType === "student" ? "Enter Portal" : "Sign In Securely"} <ArrowRight className="w-4 h-4" />
                                        </span>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>

                <div className="mt-8 text-center text-xs text-slate-600">
                    <p>© 2026 Academic Intelligence Platform. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}
