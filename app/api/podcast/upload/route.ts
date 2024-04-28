import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

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

    const file = request.body;

    if (!file) {
      return new NextResponse(JSON.stringify({ error: "File is required" }), {
        status: 400,
      });
    }

    const { data: image, error: uploadError } = await supabase.storage
      .from("podcast-image")
      .upload(`${user.id}/${filename}`, file);

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

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("FILE UPLOAD ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
