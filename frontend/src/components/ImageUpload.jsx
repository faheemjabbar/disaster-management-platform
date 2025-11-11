import { Camera } from "lucide-react";

export const ImageUpload = ({ onUpload, maxSize = 5 }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File size should be less than ${maxSize}MB`);
        return;
      }
      
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        alert('Only JPG, JPEG, PNG files allowed!');
        return;
      }
      
      onUpload(file);
    }
  };

  return (
    <label className="flex items-center justify-center w-8 h-8 bg-[#F68B84] border-2 border-white rounded-full shadow-lg cursor-pointer hover:bg-[#E27872] transition">
      <Camera className="w-4 h-4 text-white" />
      <input
        type="file"
        className="hidden"
        accept="image/jpeg,image/jpg,image/png"
        onChange={handleFileChange}
      />
    </label>
  );
};