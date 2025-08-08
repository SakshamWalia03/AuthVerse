/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME!,
        pass: process.env.EMAIL_PASSWORD!,
      },
    });

    const mailOptions = {
      from: '"Saksham from MyApp 👋" <wsaksham37@gmail.com>',
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "resetpassword"
      }?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }</p>`,
    };

    const info = await transport.sendMail(mailOptions);
    return info;
  } catch (error: any) {
    console.error("SendEmail Error:", error);
    throw new Error(error.message || "Failed to send email");
  }
};
