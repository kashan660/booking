import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new NextResponse("No file uploaded", { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "")}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    
    // Ensure directory exists (you might need to create it manually or use fs.mkdir)
    // For simplicity, assuming public/uploads exists or we write to it. 
    // In production (Vercel), this won't persist. Ideally use S3/Blob.
    const filepath = path.join(uploadDir, filename);

    try {
      await writeFile(filepath, buffer);
    } catch (error) {
        // Fallback for Vercel/Environments where local write might fail or dir doesn't exist
        // In a real app, you'd check/mkdir. 
        console.error("Error writing file", error);
        return new NextResponse("Error saving file. Note: Local uploads may not work in serverless environments.", { status: 500 });
    }

    const fileUrl = `/uploads/${filename}`;

    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
