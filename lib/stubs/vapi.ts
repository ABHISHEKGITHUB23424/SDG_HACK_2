export async function simulateVoiceCall(studentId: string, contestId: string) {
    // Simulate an AI voice call initialization via Vapi.ai API
    console.log(`[VAPI STUB] Calling student ${studentId} for contest ${contestId}`);
    // POST https://api.vapi.ai/call/phone — stubbed

    // We add an artificial delay to simulate API request latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    return { status: "call_initiated", studentId, contestId, calledAt: new Date().toISOString() };
}
