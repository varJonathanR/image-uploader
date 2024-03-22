import { NextResponse } from "next/server";
/* import { writeFile } from "fs/promises";
import path from "path"; */
import { v2 as cloudinary } from "cloudinary";

require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export async function POST(request) {
  const data = await request.formData();
  const image = data.get("image");

  if (!image) return NextResponse.json("image not uploaded", { status: 400 });

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // const filePath = path.join(process.cwd(), "public", image.name);
  // await writeFile(filePath, buffer);

  const response = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, (err, res) => {
        if (err) reject(err);
        resolve(res);
      })
      .end(buffer);
  });

  return NextResponse.json({
    message: "Img uploaded",
    url: response.secure_url,
  });
}
