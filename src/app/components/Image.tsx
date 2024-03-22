import React from 'react'

interface Props {
    src: string,
    alt: string,
    width: string
}

export default function Image({ src, alt, width }: Props) {
  return (
    <img src={src} alt={alt} className={`rounded-xl ${width}`} />
  )
}
