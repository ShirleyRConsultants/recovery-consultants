import { NextResponse, type NextRequest } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: `Recovery Consultants Temporary Password`,
    html: `
    <h1>Please log in and update your password!</h1>
    <p>Your temporary password is: ${password} </p>

  `,
  };

  try {
    await transport.sendMail(mailOptions);
    return NextResponse.json({ message: "Success!", status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Failed!", status: 500 });
  }
}
