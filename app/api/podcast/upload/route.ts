import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    const user = data.user;
    if (!user) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return new NextResponse("File is required", {
        status: 400,
      });
    }

    const { data: image, error: uploadError } = await supabase.storage
      .from("podcast-image")
      .upload(`${user.id}/${file.name}`, file);

    if (uploadError) {
      console.log(uploadError);

      return new NextResponse("Error uploading file", {
        status: 400,
      });
    }
    const { data: imageUrl } = await supabase.storage
      .from("podcast-image")
      .getPublicUrl(image.path);

    return NextResponse.json(imageUrl);
  } catch (error) {
    console.log("FILE UPLOAD ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
