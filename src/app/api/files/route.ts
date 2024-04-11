import fs from "fs";
import { Readable } from "stream";

const pinataSDK = require("@pinata/sdk");
const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT });


const bufferToStream = (buffer: ArrayBuffer) => {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
};

const saveFile = async (file: FormDataEntryValue) => {
  if (file instanceof File) {
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const stream = bufferToStream(buffer);

      const options = {
        pinataMetadata: {
          name: file.name.replaceAll(" ", "_"), // 'name' está disponible ya que 'file' es un File
        },
      };
      const response = await pinata.pinFileToIPFS(stream, options);
      return response;
    } catch (error) {
      console.error("Error saving file to Pinata:", error);
      throw error;
    }
  } else {
    throw new Error("The provided value is not a File.");
  }
};

export async function POST(req: Request) {
  console.log("Uploading file");
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    console.log("File received:", file);
    if (!file)
      return new Response("No file provided", { status: 400 });

    const response = await saveFile(file);
    const { IpfsHash } = response;
    console.log("File uploaded successfully:", IpfsHash);
    return new Response(IpfsHash, { status: 200 })

  } catch (e) {
    if (e instanceof Error) {
      console.error("Error:", e.message);
      return new Response(e.message, { status: 500 })
    } else {
      console.error("Unexpected error:", e);
      return new Response("Server Error", { status: 500 })
    }
  }
}

