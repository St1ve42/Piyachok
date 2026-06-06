import { memo } from "react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

const GalleryFiles = memo(function GalleryFiles ({galleryFiles, handleRemoveGallery}: {galleryFiles: File[],  handleRemoveGallery(index: number): void}) {
  return galleryFiles.map((image, index) => (
      <div key={uuidv4()} className="h-20 rounded-md overflow-hidden relative">
        <Image src={URL.createObjectURL(image)} alt={image.name} fill className="object-cover"/>
        <button onClick={() => handleRemoveGallery(index)} className="absolute top-1 right-1 bg-white rounded-full p-1">✕</button>
      </div>
    )
  )
})


export default GalleryFiles;
