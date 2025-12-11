"use client";
import { useFormContext } from "react-hook-form";
import { Upload } from "lucide-react";

export function FileUploadField({ field, error }: any) {
  const { setValue, watch } = useFormContext();
  const filePreview = watch(field.name);

  const handleUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setValue(field.name, reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-gray-700">{field.label}</label>

      {!filePreview ? (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all">
          <Upload className="w-10 h-10 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600">{field.placeholder}</p>

          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        </label>
      ) : (
        <div className="relative h-40 border rounded-xl bg-gray-50 overflow-hidden">
          <img src={filePreview} className="w-full h-full object-contain p-4" />
        </div>
      )}

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
