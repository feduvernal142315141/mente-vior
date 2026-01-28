"use client";

import { useState, useEffect } from "react";
import { FileText, X, Upload, Eye } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { DocumentViewer } from "@/components/ui/document-viewer";

interface DocumentFieldProps {
  field: {
    name: string;
    label: string;
    required?: boolean;
  };
  error?: string;
}

export function DocumentField({ field, error }: DocumentFieldProps) {
  const { setValue, watch, clearErrors } = useFormContext();
  const fieldValue = watch(field.name);

  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [showViewer, setShowViewer] = useState(false);

  useEffect(() => {
    if (typeof fieldValue === "string" && fieldValue.length > 0) {
      const isBase64PDF = fieldValue.startsWith("data:application/pdf");
      const isBase64WithoutHeader = !fieldValue.startsWith("data:") && !fieldValue.startsWith("http");
      const isURL = fieldValue.startsWith("http");

      if (isBase64PDF) {
        setPreview(fieldValue);
        setFileName("document.pdf");
        clearErrors(field.name);
      } else if (isBase64WithoutHeader) {
        const fullBase64 = `data:application/pdf;base64,${fieldValue}`;
        setPreview(fullBase64);
        setFileName("document.pdf");
        clearErrors(field.name);
      } else if (isURL) {
        setPreview(fieldValue);

        const urlPath = fieldValue.split("?")[0]; 
        const fullFileName = urlPath.split("/").pop() || "document.pdf"; 
        
        const cleanName = fullFileName.split("_")[0] + ".pdf";
        setFileName(cleanName);
        
        
        clearErrors(field.name);
      }
    } else if (!fieldValue) {
      setPreview(null);
      setFileName(null);
    }
  }, [fieldValue, clearErrors, field.name]);

  useEffect(() => {
    error && setLocalError(error);
  }, [error]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLocalError(null);

    if (file.type !== "application/pdf") {
      setLocalError("Only PDF files are allowed.");
      setPreview(null);
      setFileName(null);
      setValue(field.name, "");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setLocalError("The document must be less than 5MB.");
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPreview(base64);
      setValue(field.name, base64);
    };

    reader.readAsDataURL(file);
  };

  const clearDocument = () => {
    setPreview(null);
    setFileName(null);
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
          htmlFor={`document-${field.name}`}
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

          <p className="text-xs mt-1 text-text-muted">PDF (max 5MB)</p>

          <input
            id={`document-${field.name}`}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleUpload}
          />
        </label>
      ) : (
        <div className="space-y-3">
          <div className="relative w-full h-44 rounded-xl overflow-hidden border bg-surface-secondary shadow-sm flex items-center justify-center p-6">
            <div className="flex flex-col items-center gap-3">
              <FileText className="w-16 h-16 text-accent-primary" />
              <p className="text-sm font-medium text-text-primary text-center break-all px-4">
                {fileName || "document.pdf"}
              </p>
            </div>

            <button
              type="button"
              onClick={clearDocument}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-surface-primary shadow flex items-center justify-center hover:bg-accent-primary/10 transition-all"
            >
              <X className="w-4 h-4 text-text-primary" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setShowViewer(true)}
              className="
                flex items-center justify-center gap-2
                w-full px-4 py-2.5 
                rounded-xl border bg-surface-primary/80
                text-sm font-medium text-text-primary
                hover:bg-accent-primary/10 transition
                cursor-pointer
              "
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>

            <label
              htmlFor={`document-${field.name}`}
              className="
                flex items-center justify-center
                w-full px-4 py-2.5 
                rounded-xl border bg-surface-primary/80
                text-sm font-medium text-text-primary
                hover:bg-accent-primary/10 transition cursor-pointer
              "
            >
              Change
            </label>
          </div>

          <input
            id={`document-${field.name}`}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleUpload}
          />
        </div>
      )}

      {(localError) && (
        <p className="text-sm text-red-500 font-medium pt-1">{localError}</p>
      )}

      {preview && (
        <DocumentViewer
          open={showViewer}
          onClose={() => setShowViewer(false)}
          documentUrl={preview}
          fileName={fileName || "document.pdf"}
        />
      )}
    </div>
  );
}
