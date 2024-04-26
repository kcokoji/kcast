import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/utils/supabase/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await getUser();
    const supabase = createClient();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return new NextResponse(JSON.stringify({ error: "File is required" }), {
        status: 400,
      });
    }

    const { data: image, error: uploadError } = await supabase.storage
      .from("podcast-image")
      .upload(`${user.id}/${file.name}`, file);

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

    return NextResponse.json(imageUrl, { status: 200 });
  } catch (error) {
    console.log("FILE UPLOAD ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
