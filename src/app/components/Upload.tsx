import React, { Dispatch, SetStateAction, useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from './Image';

interface Props {
    file: any,
    setFile: Dispatch<SetStateAction<any>>,
    setImageUrl: Dispatch<SetStateAction<string | null>>,
    setUpload: Dispatch<SetStateAction<boolean>>
}

export default function Upload({ file, setFile, setImageUrl, setUpload }: Props) {
    const [validFile, setValidFile] = useState<boolean>(true);
    const onDrop = useCallback((acceptedFiles: any) => {
        setFile(acceptedFiles[0]);
      }, [setFile]);
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    async function handleSubmit (e: any) {
        e.preventDefault();

        if (file !== null && file.type === "image/webp") {
            setUpload(false);

            const formData = new FormData();
            formData.append("image", file);

            const response = await fetch('api/upload', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            setImageUrl(data.url);
        } else {
            setValidFile(false);
        }
    }

  return (
    <section className='flex flex-col items-center justify-center gap-2'>
        <h1 className='text-3xl font-semibold'>Upload your image</h1>
        <p>File should be .webp</p>
        <form className='flex flex-col gap-4 items-center justify-center' onSubmit={handleSubmit}>
            <div {...getRootProps()} className='w-full bg-gray-100 p-6 border border-dashed border-sky-500 rounded-xl flex items-center justify-center flex-col gap-3'>
                <input {...getInputProps()} />
                <Image src='/image.svg' alt='Upload image' width='w-44' />
                <p className='text-gray-600'>Drag & Drop your image here</p>
            </div>
            <span className='text-gray-600'>or</span>
            <input type="file" onChange={(e: any) => setFile(e.target.files[0])} />
            <button className="bg-sky-600 text-white rounded-md px-4 py-2">Send</button>
            <span className='text-red-600'>{ !validFile ? "File should be .webp" : "" }</span>
        </form>
    </section>
  )
}
