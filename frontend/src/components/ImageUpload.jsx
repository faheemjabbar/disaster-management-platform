import { Upload, X } from "lucide-react";
import { useState } from "react";

export const ImageUpload = ({ onUpload, preview: initialPreview, maxSize = 5 }) => {
  const [preview, setPreview] = useState(initialPreview);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File size should be less than ${maxSize}MB`);
        return;
      }
      setPreview(URL.createObjectURL(file));
      onUpload(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onUpload(null);
  };

  return (
    <div className="w-full">
      {!preview ? (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
          <Upload className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-500">Click to upload image</span>
          <span className="text-xs text-gray-400 mt-1">Max size: {maxSize}MB</span>
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </label>
      ) : (
        <div className="relative w-full h-32 rounded-lg overflow-hidden">
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};