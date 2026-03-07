"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Copy, MessageCircle, AlertTriangle } from "lucide-react";

export function RiskSummaryModal({ student, semester, participationDrop, prevEvents, currentEvents }: any) {
    const [open, setOpen] = useState(false);
    const [summary, setSummary] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const generateReport = async () => {
        setLoading(true);
        const res = await fetch("/api/ai/risk-summary", {
            method: "POST",
            body: JSON.stringify({
                studentId: student.id,
                semester,
                participationDrop,
                prevEvents,
                currentEvents
            })
        });

        if (res.ok) {
            const data = await res.json();
            setSummary(data.aiSummary);
            setOpen(true);
        }
        setLoading(false);
    };

    const copyToClipboard = () => {
        if (summary) {
            navigator.clipboard.writeText(summary);
            alert("Copied to clipboard!");
        }
    };

    const shareViaWhatsApp = async () => {
        // using Twilio stub internally
        alert("WhatsApp message queued (simulated via Twilio stub)");
    };

    return (
        <>
            <Button
                onClick={generateReport}
                disabled={loading}
                className="bg-red-900 border border-red-800 text-red-200 hover:bg-red-800 flex items-center gap-2"
            >
                <AlertTriangle className="w-4 h-4" /> {loading ? "Analyzing..." : "Generate Risk Summary"}
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="bg-slate-900 border-slate-800 text-slate-100 max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="text-red-400">AI Risk Handover Summary</DialogTitle>
                        <DialogDescription className="text-slate-400">
                            Generated via deterministic rule engine pipeline.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="bg-slate-950 p-4 rounded-md border border-slate-800 my-4">
                        <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-slate-300">
                            {summary}
                        </pre>
                    </div>

                    <DialogFooter className="flex gap-2 w-full sm:justify-between">
                        <Button variant="outline" className="border-slate-800 text-slate-300" onClick={() => setOpen(false)}>
                            Close
                        </Button>
                        <div className="flex gap-2">
                            <Button variant="secondary" className="bg-slate-800 hover:bg-slate-700 text-slate-300" onClick={copyToClipboard}>
                                <Copy className="w-4 h-4 mr-2" /> Copy
                            </Button>
                            <Button className="bg-green-700 hover:bg-green-800 text-green-100" onClick={shareViaWhatsApp}>
                                <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
