import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

export async function getSmtpSettings() {
  const settings = await prisma.smtpSettings.findFirst();
  return settings;
}

export async function sendMail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const settings = await getSmtpSettings();

  if (!settings) {
    throw new Error("SMTP settings not configured");
  }

  const transporter = nodemailer.createTransport({
    host: settings.host,
    port: settings.port,
    secure: settings.secure, // true for 465, false for other ports
    auth: {
      user: settings.user,
      pass: settings.password,
    },
  });

  const info = await transporter.sendMail({
    from: settings.fromEmail,
    to,
    subject,
    html,
  });

  return info;
}
