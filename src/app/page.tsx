"use client"

import { useState } from "react";
import Upload from "./components/Upload";
import Loading from "./components/Loading";
import Uploaded from "./components/Uploaded";
import Footer from "./components/Footer";

export default function Homepage() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [upload, setUpload] = useState<boolean>(true);

  return (
    <>
      <main className="w-[350px] lg:w-[400px] p-2 lg:p-4 mx-auto mt-8 drop-shadow-xl border rounded-lg bg-white">
        { upload ? (
          <Upload file={file} setFile={setFile} setImageUrl={setImageUrl} setUpload={setUpload} />
        ) : imageUrl !== null && upload === false ? <Uploaded imageUrl={imageUrl} /> : <Loading />  }
      </main>
      <Footer />
    </>
  );
}
