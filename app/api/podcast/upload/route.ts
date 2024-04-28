import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { decode } from "base64-arraybuffer";
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    const user = data.user;
    if (!user) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename");
    const filetype = searchParams.get("filetype");

    const body = await request.json();

    const { base64String: fileData } = body;

    if (!fileData) {
      return new NextResponse(JSON.stringify({ error: "File is required" }), {
        status: 400,
      });
    }
    if (!filetype) {
      return new NextResponse(JSON.stringify({ error: "File is required" }), {
        status: 400,
      });
    }

    const { data: image, error: uploadError } = await supabase.storage
      .from("podcast-image")
      .upload(`${user.id}/${filename}`, decode(fileData), {
        contentType: filetype,
      });

    if (uploadError) {
      console.log(uploadError);

      return new NextResponse(
        JSON.stringify({ error: "Error uploading file" }),
        {
          status: 400,
        },
      );
    }
    const { data: imageUrl } = await supabase.storage
      .from("podcast-image")
      .getPublicUrl(image.path);

    return NextResponse.json(imageUrl.publicUrl, { status: 200 });
  } catch (error) {
    console.log("FILE UPLOAD ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
