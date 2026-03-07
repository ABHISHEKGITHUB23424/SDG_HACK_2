export async function sendWhatsAppNudge(phone: string, message: string) {
    // Uses Twilio REST API — stubbed
    console.log(`[TWILIO STUB] WhatsApp to ${phone}: ${message}`);

    // Simulating network latency
    await new Promise((resolve) => setTimeout(resolve, 500));

    return { success: true, messageId: `msg_${Math.random().toString(36).substring(7)}` };
}
