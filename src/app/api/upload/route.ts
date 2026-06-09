import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";

// Client-side direct upload to Vercel Blob.
// The browser uploads the file straight to Blob storage, bypassing the
// Server Action request-body size limit (~4.5MB on Vercel).
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        // Only authenticated admins may obtain an upload token.
        if (!(await verifyAuth())) {
          throw new Error("Unauthorized");
        }
        return {
          allowedContentTypes: ["image/*"],
          addRandomSuffix: true,
          maximumSizeInBytes: 10 * 1024 * 1024, // 10MB
        };
      },
      onUploadCompleted: async () => {
        // No-op: the client submits the returned URL with the form.
      },
    });
    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
