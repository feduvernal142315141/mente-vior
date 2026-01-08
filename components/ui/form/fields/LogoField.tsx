"use client";

import { useState, useEffect } from "react";
import { Upload, X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

interface LogoFieldProps {
  field: {
    name: string;
    label: string;
    required?: boolean;
  };
  error?: string;
}

export function LogoField({ field, error }: LogoFieldProps) {
  const { setValue, watch, clearErrors } = useFormContext();
  const fieldValue = watch(field.name);

  const [preview, setPreview] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof fieldValue === "string" && (fieldValue.startsWith("data:image") || fieldValue.startsWith("https"))) {
      setPreview(fieldValue);
      clearErrors(field.name);
    }
  }, [fieldValue]);

  useEffect(() => {
    error && setLocalError(error);
  }, [error]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLocalError(null);

    const validTypes = ["image/png", "image/jpeg"];
    if (!validTypes.includes(file.type)) {
      setLocalError("Only PNG or JPG files are allowed.");
      setPreview(null);
      setValue(field.name, "");
      return;
    }

    if (file.size > 1024 * 1024) {
      setLocalError("The logo must be less than 1MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPreview(base64);
      setValue(field.name, base64); // 🔥 enviará Base64 al backend
    };

    reader.readAsDataURL(file);
  };

  const clearLogo = () => {
    setPreview(null);
    setValue(field.name, "");
    setLocalError(null);
    clearErrors(field.name);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-text-primary">
        {field.label} {field.required && <span className="text-[#2563EB]">*</span>}
      </p>

      {!preview ? (
        <label
          htmlFor={`logo-${field.name}`}
          className={cn(
            `
            flex flex-col items-center justify-center 
            w-full h-48 rounded-xl cursor-pointer
            border-2 border-dashed
            bg-surface-secondary/40
            hover:border-accent-primary hover:bg-accent-primary/5
            transition-all duration-200 group
          `,
            (localError)
              ? "border-red-500 bg-red-500/5 text-red-500"
              : "border-border-hairline"
          )}
        >
          <Upload className="w-10 h-10 mb-3 text-text-muted group-hover:text-accent-primary" />

          <p className="text-sm font-medium">Click to upload</p>

          <p className="text-xs mt-1 text-text-muted">PNG or JPG (max 1MB)</p>

          <input
            id={`logo-${field.name}`}
            type="file"
            accept="image/png,image/jpeg"
            className="hidden"
            onChange={handleUpload}
          />
        </label>
      ) : (
        <div className="space-y-3">
          <div className="relative w-full h-44 rounded-xl overflow-hidden border bg-surface-secondary shadow-sm">
            <img src={preview} className="w-full h-full object-contain p-4"  alt={"logo"}/>

            <button
              type="button"
              onClick={clearLogo}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-surface-primary shadow flex items-center justify-center hover:bg-accent-primary/10 transition-all"
            >
              <X className="w-4 h-4 text-text-primary" />
            </button>
          </div>

          <label
            htmlFor={`logo-${field.name}`}
            className="
              block w-full text-center px-4 py-2.5 
              rounded-xl border bg-surface-primary/80
              text-sm font-medium text-text-primary
              hover:bg-accent-primary/10 transition cursor-pointer
            "
          >
            Change Logo
          </label>

          <input
            id={`logo-${field.name}`}
            type="file"
            accept="image/png,image/jpeg"
            className="hidden"
            onChange={handleUpload}
          />
        </div>
      )}

      {(localError) && (
        <p className="text-sm text-red-500 font-medium pt-1">{localError}</p>
      )}
    </div>
  );
}
