import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Subscriber from '@/models/Subscriber';
import { sendEmail, emailTemplates } from '@/lib/email/nodemailer';

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json({ success: false, message: 'Invalid email' }, { status: 400 });
        }

        const normalizedEmail = email.toLowerCase().trim();
        
        await connectDB();

        // Check if already subscribed
        const existingSubscriber = await Subscriber.findOne({ email: normalizedEmail });
        
        if (existingSubscriber) {
            return NextResponse.json({ 
                success: false, 
                message: 'This email is already subscribed!' 
            }, { status: 400 });
        }

        // Create new subscriber
        const subscriber = new Subscriber({ email: normalizedEmail });
        await subscriber.save();

        console.log('New subscriber added:', normalizedEmail);

        // Send subscription confirmation email
        try {
            await sendEmail({
                to: normalizedEmail,
                ...emailTemplates.newsletterSubscription(normalizedEmail)
            });
            console.log('Confirmation email sent to:', normalizedEmail);
        } catch (emailError) {
            console.error('Failed to send confirmation email:', emailError);
            // Don't fail the subscription if email fails
        }

        return NextResponse.json({ success: true, message: 'Successfully subscribed!' });
    } catch (error: any) {
        console.error('Newsletter subscription error:', error);
        
        // Check for duplicate key error (race condition)
        if (error.code === 11000) {
            return NextResponse.json({ 
                success: false, 
                message: 'This email is already subscribed!' 
            }, { status: 400 });
        }
        
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}