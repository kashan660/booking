import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { sendMail } from "@/lib/mail";

export async function GET(req: Request) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = await prisma.smtpSettings.findFirst();
  
  const safeSettings = settings ? {
    ...settings,
    password: settings.password ? "********" : "",
  } : null;

  return NextResponse.json(safeSettings || {});
}

export async function POST(req: Request) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { action, host, port, user, password, fromEmail, secure, testEmail } = body;

  if (action === "test") {
    try {
      if (!testEmail) {
        return NextResponse.json({ error: "Test email required" }, { status: 400 });
      }
      
      await sendMail({
        to: testEmail,
        subject: "SMTP Test Email",
        html: "<p>This is a test email from Lugvia Admin Dashboard. Your SMTP settings are working correctly.</p>",
      });
      return NextResponse.json({ success: true, message: "Test email sent" });
    } catch (error) {
      console.error("Test Email Error:", error);
      return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to send email" }, { status: 500 });
    }
  }

  // Save settings
  try {
    const data: any = {
      host,
      port: parseInt(port),
      user,
      fromEmail,
      secure: secure === true || secure === "true",
    };

    if (password && password !== "********") {
      data.password = password;
    }

    const existing = await prisma.smtpSettings.findFirst();

    if (existing) {
      await prisma.smtpSettings.update({
        where: { id: existing.id },
        data,
      });
    } else {
      if (!password || password === "********") {
         return NextResponse.json({ error: "Password required for initial setup" }, { status: 400 });
      }
      // Ensure password is included for create
      data.password = password;
      await prisma.smtpSettings.create({
        data: {
          host: data.host,
          port: data.port,
          user: data.user,
          password: data.password,
          fromEmail: data.fromEmail,
          secure: data.secure
        }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Save SMTP Settings Error:", error);
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
  }
}
