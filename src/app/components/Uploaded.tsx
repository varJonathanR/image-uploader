import React, { useState } from 'react'
import Image from './Image';

interface Props {
    imageUrl: string 
}

export default function Uploaded({ imageUrl }: Props) {
    const [copied, setCopied] = useState<boolean>(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(imageUrl);
        setCopied(true);
    };

  return (
    <section className='flex flex-col items-center justify-center gap-2'>
        <Image src="/check.svg" alt="Check Icon" width='w-8' />
        <h1 className='text-2xl font-semibold'>Uploaded succesfully!</h1>
        <Image src={imageUrl} alt='Preview Image' width='w-full' />
        <div className='flex gap-4 items-center w-full'>
            <p className='flex-1 overflow-x-scroll p-2 rounded-lg bg-gray-100 border hide-scrollbar'>{imageUrl}</p>
            <button className={`text-white rounded-md px-4 py-2 ${copied ? 'bg-green-500' : 'bg-sky-600'}`} onClick={copyToClipboard}>Copy URL</button>
        </div>
        <p>{ copied ? "Copied!" : "" }</p>
    </section>
  )
}
