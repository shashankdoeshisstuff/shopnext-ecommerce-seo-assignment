"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden bg-white border border-neutral-200">
        <Image
          src={images[selected]}
          alt={`${title} - Image ${selected + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`relative w-20 h-20 flex-shrink-0 overflow-hidden border-2 ${
                i === selected ? "border-black" : "border-neutral-200"
              }`}
            >
              <Image src={img} alt={`${title} thumbnail ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}