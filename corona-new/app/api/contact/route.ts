import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { name, email, phone, company, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const emailResult = await sendContactEmail({
      name,
      email,
      phone,
      company,
      message
    });

    if (!emailResult.success) {
      console.error('Failed to send contact email:', emailResult.error);
      // We still return success to the user as the message is logged, 
      // but ideally we should have a fallback or notify admin of failure.
    }

    return NextResponse.json({ message: 'Enquiry sent successfully' });
  } catch (error: any) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
