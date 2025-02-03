import React, { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUpload: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: File[]) => {
      const validFiles: File[] = [];
      const invalidFiles: string[] = [];
      acceptedFiles.forEach((file) => {
        const isValidFormat = ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type);
        const isValidSize = file.size < 6 * 1024 * 1024; // 6MB
        if (isValidFormat && isValidSize) {
          validFiles.push(file);
        } else {
          invalidFiles.push(file.name);
        }
      });
      if (images.length + validFiles.length > 10) {
        setNotification(
          `You can only upload up to 10 images. You already have ${images.length} images.`,
        );
      } else {
        validFiles.forEach((file) => {
          const reader = new FileReader();
          reader.onload = (event: ProgressEvent<FileReader>) => {
            const result = event.target?.result as string;
            setImages((prevImages) => [...prevImages, result]);
          };
          reader.readAsDataURL(file);
        });
        setNotification(`Successfully uploaded ${validFiles.length} image(s)`);
      }
      if (invalidFiles.length > 0) {
        setNotification(
          `Failed to upload ${invalidFiles.length} image(s). Invalid format or size: ${invalidFiles.join(', ')}`,
        );
      }
      setTimeout(() => setNotification(null), 5000);
    },
    [images],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': ['.jpeg', '.jpg'], 'image/png': ['.png'] },
    maxFiles: 10,
    maxSize: 6 * 1024 * 1024, // 6MB
  });

  const dragImage = useRef<number>(0);
  const dragImageOver = useRef<number>(0);
  const handleSort = () => {
    const imagesClone = [...images];
    const temp = imagesClone[dragImage.current];
    imagesClone[dragImage.current] = imagesClone[dragImageOver.current];
    imagesClone[dragImageOver.current] = temp;
    setImages(imagesClone);
  };
  return (
    <div className="container pt-6">
      <div
        {...getRootProps()}
        className="border-dotted border-2 border-gray-400 p-14 text-center mb-4"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p>Click or drag and drop images here to upload!</p>
        )}
      </div>
      {notification && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">{notification}</strong>
        </div>
      )}
      <div className="flex flex-col items-baseline pt-1">
        <p className="text-gray-600 text-sm">
          ℹ You can sort the images by drag and dropping them in the desired order.
        </p>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            draggable
            onDragStart={() => (dragImage.current = index)}
            onDragEnter={() => (dragImageOver.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
            key={index}
            className="`max-w-full h-auto rounded p-2"
          >
            <img src={image} className="max-w-full h-auto rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
