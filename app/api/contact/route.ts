import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import ContactInquiry from '@/models/ContactInquiry';
import { isAdmin } from '@/lib/auth';
import { sendEmail, emailTemplates } from '@/lib/email/nodemailer';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://peptidemint.com';

export async function GET(req: NextRequest) {
    try {
        const isUserAdmin = await isAdmin();
        if (!isUserAdmin) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const inquiries = await ContactInquiry.find({}).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: inquiries });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const { name, email, purpose, message } = body;

        // Validate request
        if (!name || !email || !message) {
            return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
        }

        const inquiry = await ContactInquiry.create({
            name,
            email,
            purpose: purpose || 'General Inquiry',
            message,
        });

        // Send notification to admin
        try {
            const adminEmail = process.env.ADMIN_EMAIL || 'support@peptidemint.com';
            await sendEmail({
                to: adminEmail,
                appUrl: APP_URL,
                subject: `New Inquiry: ${purpose || 'General'} from ${name}`,
                html: `
                    <h2>New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <p><strong>Purpose:</strong> ${purpose || 'General'}</p>
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 20px; white-space: pre-wrap;">
                        ${message}
                    </div>
                    <a href="${APP_URL}/admin/inquiries" class="button">View in Admin</a>
                `,
            });
        } catch (emailError) {
            console.error('Failed to send admin notification email:', emailError);
        }

        // Send auto-response to user
        try {
            await sendEmail({
                to: email,
                appUrl: APP_URL,
                ...emailTemplates.contactResponse(name, `Thank you for contacting PeptideMint. We have received your inquiry and will respond within 24-48 hours.\n\nBest regards,\nThe PeptideMint Team`),
            });
        } catch (emailError) {
            console.error('Failed to send auto-response email:', emailError);
        }

        return NextResponse.json({ success: true, data: inquiry }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
