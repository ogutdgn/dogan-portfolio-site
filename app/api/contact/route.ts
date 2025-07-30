import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import ContactFormEmail from '@/emails/contact-form-email';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Send email
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <noreply@ogutdgn.com>', // email sender
      to: [process.env.CONTACT_EMAIL || 'contactdgn@ogutdgn.com'],
      subject: `Portfolio Contact: ${subject}`,
      react: ContactFormEmail({ name, email, subject, message }),
      replyTo: email, // Reply to the user's email
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'An error occurred while sending the email.' },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data);
    return NextResponse.json(
      { message: 'Your message has been sent successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Server error occurred.' },
      { status: 500 }
    );
  }
}
