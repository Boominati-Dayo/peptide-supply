import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, emailTemplates } from '@/lib/email/nodemailer';

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json({ success: false, message: 'Invalid email' }, { status: 400 });
        }

        // Send subscription confirmation email
        await sendEmail({
            to: email,
            ...emailTemplates.newsletterSubscription(email)
        });

        return NextResponse.json({ success: true, message: 'Successfully subscribed' });
    } catch (error: any) {
        console.error('Newsletter subscription error:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}