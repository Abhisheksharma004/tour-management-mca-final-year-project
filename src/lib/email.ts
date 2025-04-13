import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}

export function generateBookingConfirmationEmail({
  travelerName,
  guideName,
  tourName,
  date,
  participants,
  totalPrice
}: {
  travelerName: string;
  guideName: string;
  tourName: string;
  date: string;
  participants: number;
  totalPrice: number;
}) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #f97316;">Tour Booking Confirmation</h2>
      <p>Dear ${travelerName},</p>
      <p>Thank you for booking a tour with ${guideName}!</p>
      
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #1f2937; margin-top: 0;">Booking Details</h3>
        <p><strong>Tour:</strong> ${tourName}</p>
        <p><strong>Guide:</strong> ${guideName}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Number of Participants:</strong> ${participants}</p>
        <p><strong>Total Price:</strong> ₹${totalPrice}</p>
      </div>

      <p>Your booking is currently pending confirmation from the guide. You will receive another email once the guide confirms your booking.</p>
      
      <p>If you have any questions or need to make changes to your booking, please contact the guide directly.</p>
      
      <p>Best regards,<br>The Find Best Guide Team</p>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
        <p>This is an automated email. Please do not reply directly to this message.</p>
      </div>
    </div>
  `;
} 