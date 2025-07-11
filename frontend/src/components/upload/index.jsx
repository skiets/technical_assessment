import { useRef, useState } from "react";
import { IconUpload } from "@tabler/icons-react";

export default function UploadCard({
  onFileSelect,
  onFileError,
  maxSizeMB = 20,
  acceptedTypes = "image/*",
  width = "w-96",
  height = "h-[30rem]",
}) {
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleClick = () => fileInputRef.current?.click();

  const validateFile = (file) => {
    const maxBytes = maxSizeMB * 1024 * 1024;
    if (!file) return false;

    if (file.size > maxBytes) {
      onFileError?.(`File exceeds ${maxSizeMB}MB limit.`);
      return false;
    }

    return true;
  };

  const handleFile = (file) => {
    if (!validateFile(file)) return;

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onFileSelect?.(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleClear = () => {
    setPreviewUrl(null);
    fileInputRef.current.value = null;
  };

  return (
    <div
      className={`rounded-[20px] border border-dashed border-gray-300 bg-gray-100 flex flex-col items-center justify-center px-6 py-8 ${width} ${height} cursor-pointer transition overflow-hidden ${
        dragOver ? "bg-gray-200 border-gray-500" : ""
      }`}
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
    >
      {previewUrl ? (
        <div className="relative w-full h-full">
          <img
            src={previewUrl}
            alt="Preview"
            className="object-cover w-full h-full rounded-2xl"
          />
          <button
            className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs"
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
          >
            Remove
          </button>
        </div>
      ) : (
        <>
          <IconUpload size={32} className="text-gray-500 mb-3" />
          <p className="text-center text-gray-600 text-sm font-medium mb-6">
            Choose a file or drag and drop it here
          </p>
          <p className="text-center text-xs text-gray-400 mt-auto">
            We recommend using high quality .jpg files less than {maxSizeMB} MB
            <br />
            or .mp4 files less than 200 MB.
          </p>
        </>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        onChange={handleFileChange}
        hidden
      />
    </div>
  );
}
