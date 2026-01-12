import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function GET() {
  try {
    const email = "admin@lugvia.com"
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ message: "Admin user already exists" })
    }

    const hashedPassword = await bcrypt.hash("admin123", 10)

    const user = await prisma.user.create({
      data: {
        name: "Admin",
        email,
        password: hashedPassword,
        role: "ADMIN", // Assuming you might have roles, or just simple user for now
      },
    })

    return NextResponse.json({ message: "Admin user created successfully", user: { email: user.email } })
  } catch (error) {
    return NextResponse.json({ error: "Error creating admin user", details: error }, { status: 500 })
  }
}
