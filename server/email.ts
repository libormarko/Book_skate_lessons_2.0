import nodemailer from 'nodemailer';

interface EmailContent {
  to: string;
  name: string;
  lessonId: number;
  participants: number;
  date: string;
  time: string;
  boardTypeName: string;
  skateparkName: string;
  skateparkAddress: string;
}

// Create reusable transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

export async function sendBookingConfirmation({
  to,
  name,
  lessonId,
  participants,
  date,
  time,
  boardTypeName,
  skateparkName,
  skateparkAddress
}: EmailContent): Promise<boolean> {
  try {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to,
      subject: 'Booking Confirmation - SkateSpot',
      text: `
Hi ${name},

Thank you for booking a lesson with SkateSpot!

Booking Details:
- Lesson ID: ${lessonId}
- Number of Participants: ${participants}
- Date: ${date}
- Time: ${time}
- Board Type: ${boardTypeName}
- Skatepark: ${skateparkName}
- Location: ${skateparkAddress}

We're looking forward to seeing you!

Best regards,
The SkateSpot Team`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Hi ${name},</h2>
          <p>Thank you for booking a lesson with SkateSpot!</p>

          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Booking Details:</h3>
            <ul style="list-style: none; padding-left: 0;">
              <li style="margin-bottom: 8px;"><strong>Lesson ID:</strong> ${lessonId}</li>
              <li style="margin-bottom: 8px;"><strong>Number of Participants:</strong> ${participants}</li>
              <li style="margin-bottom: 8px;"><strong>Date:</strong> ${date}</li>
              <li style="margin-bottom: 8px;"><strong>Time:</strong> ${time}</li>
              <li style="margin-bottom: 8px;"><strong>Board Type:</strong> ${boardTypeName}</li>
              <li style="margin-bottom: 8px;"><strong>Skatepark:</strong> ${skateparkName}</li>
              <li style="margin-bottom: 8px;"><strong>Location:</strong> ${skateparkAddress}</li>
            </ul>
          </div>

          <p>We're looking forward to seeing you!</p>
          <p>Best regards,<br>The SkateSpot Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}