"use client";

import { useState, useEffect } from "react";
import { FileText, X, Upload, Eye, Plus, GripVertical } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { DocumentViewer } from "@/components/ui/document-viewer";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Agreement {
  id: string;
  name: string;
  value: string;
  isExisting?: boolean; 
}

interface AgreementsFieldProps {
  field: {
    name: string;
    label: string;
    required?: boolean;
  };
  error?: string;
}

export function AgreementsField({ field, error }: AgreementsFieldProps) {
  const { setValue, watch, clearErrors } = useFormContext();
  const fieldValue = watch(field.name) as Agreement[] | undefined;

  const [agreements, setAgreements] = useState<Agreement[]>([]);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerDocument, setViewerDocument] = useState<{ url: string; name: string } | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (Array.isArray(fieldValue) && fieldValue.length > 0 && agreements.length === 0) {

      const normalized = (fieldValue as any[]).map((item, idx) => {
        if (typeof item === "object" && item !== null && item.name && item.value) {
          return {
            ...item,
            isExisting: item.isExisting ?? (typeof item.value === "string" && item.value.startsWith("http")),
          };
        }

        if (typeof item === "string") {
          return {
            id: `agreement-${Date.now()}-${idx}`,
            name: extractFileName(item),
            value: item,
            isExisting: item.startsWith("http"),
          };
        }
        return item as Agreement;
      });
      setAgreements(normalized);
    }
  }, [fieldValue]);

  useEffect(() => {
    setValue(field.name, agreements);
    if (agreements.length > 0) {
      clearErrors(field.name);
      setLocalError(null);
    }
  }, [agreements, field.name, setValue, clearErrors]);

  useEffect(() => {
    if (error) setLocalError(error);
  }, [error]);

  const extractFileName = (value: string): string => {
    if (value.startsWith("http")) {
      const urlPath = value.split("?")[0];
      const fullFileName = urlPath.split("/").pop() || "document.pdf";
      const parts = fullFileName.split("_");
      if (parts.length > 1) {
        return parts[0] + ".pdf";
      }
      return fullFileName;
    }
    return "document.pdf";
  };

  const generateId = () => `agreement-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const handleAddAgreement = () => {
    const newAgreement: Agreement = {
      id: generateId(),
      name: "",
      value: "",
    };
    setAgreements((prev) => [...prev, newAgreement]);
  };

  const handleRemoveAgreement = (id: string) => {
    setAgreements((prev) => prev.filter((a) => a.id !== id));
  };

  const handleFileUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLocalError(null);

    if (file.type !== "application/pdf") {
      setLocalError("Only PDF files are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setLocalError("The document must be less than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setAgreements((prev) =>
        prev.map((a) =>
          a.id === id
            ? { ...a, name: file.name.replace(".pdf", ""), value: base64 }
            : a
        )
      );
    };
    reader.readAsDataURL(file);
  };

  const handleViewDocument = (agreement: Agreement) => {
    let url = agreement.value;
    
    if (!url.startsWith("data:") && !url.startsWith("http")) {
      url = `data:application/pdf;base64,${url}`;
    }
    
    setViewerDocument({ url, name: agreement.name || "document.pdf" });
    setViewerOpen(true);
  };

  const getPreviewUrl = (value: string): string => {
    if (value.startsWith("data:application/pdf")) return value;
    if (value.startsWith("http")) return value;
    if (value && !value.startsWith("data:")) {
      return `data:application/pdf;base64,${value}`;
    }
    return value;
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newAgreements = [...agreements];
    const draggedItem = newAgreements[draggedIndex];
    newAgreements.splice(draggedIndex, 1);
    newAgreements.splice(index, 0, draggedItem);
    setAgreements(newAgreements);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-text-primary">
          {field.label} {field.required && <span className="text-[#2563EB]">*</span>}
        </p>
        <span className="text-xs text-text-muted">
          {agreements.length} document{agreements.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="space-y-3">
        {agreements.map((agreement, index) => (
          <div
            key={agreement.id}
            draggable={!agreement.isExisting}
            onDragStart={() => !agreement.isExisting && handleDragStart(index)}
            onDragOver={(e) => !agreement.isExisting && handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={cn(
              `
              group relative
              rounded-xl border
              bg-surface-primary/60 dark:bg-[#0F172A]/40
              border-border-hairline
              transition-all duration-200
              hover:border-accent-primary/30
              hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]
              dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)]
              `,
              draggedIndex === index && "opacity-50 scale-[0.98]",
              agreement.isExisting && "bg-surface-secondary/40 dark:bg-white/[0.02]"
            )}
          >
            <div className="flex items-stretch">
              {!agreement.isExisting && (
                <div
                  className="
                    flex items-center justify-center w-8 sm:w-10 
                    border-r border-border-hairline
                    cursor-grab active:cursor-grabbing
                    text-text-muted hover:text-text-primary
                    transition-colors
                    rounded-l-xl
                    bg-surface-secondary/30 dark:bg-white/[0.02]
                  "
                >
                  <GripVertical className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              )}

              <div className="flex-1 min-w-0 p-3 overflow-hidden">
                {!agreement.value ? (
                  <label
                    htmlFor={`upload-${agreement.id}`}
                    className={cn(
                      `
                      flex flex-col items-center justify-center 
                      w-full h-32 rounded-lg cursor-pointer
                      border-2 border-dashed
                      bg-surface-secondary/20 dark:bg-white/[0.02]
                      hover:border-accent-primary hover:bg-accent-primary/5
                      transition-all duration-200 group/upload
                      `,
                      localError
                        ? "border-red-500/50 bg-red-500/5"
                        : "border-border-hairline"
                    )}
                  >
                    <Upload className="w-8 h-8 mb-2 text-text-muted group-hover/upload:text-accent-primary transition-colors" />
                    <p className="text-sm font-medium text-text-secondary">Click to upload</p>
                    <p className="text-xs mt-1 text-text-muted">PDF (max 5MB)</p>
                    <input
                      id={`upload-${agreement.id}`}
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={(e) => handleFileUpload(agreement.id, e)}
                    />
                  </label>
                ) : (

                  <div className="flex items-center gap-3 w-full overflow-hidden">

                    <div
                      className="
                        flex-shrink-0
                        flex items-center justify-center
                        w-10 h-10 rounded-lg
                        bg-accent-primary/10 dark:bg-accent-primary/20
                      "
                    >
                      <FileText className="w-5 h-5 text-accent-primary" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p className="text-sm font-medium text-text-primary truncate cursor-default">
                            {agreement.name || "document"}.pdf
                          </p>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-[280px] break-all">
                          {agreement.name || "document"}.pdf
                        </TooltipContent>
                      </Tooltip>
                      <p className="text-xs text-text-muted mt-0.5">
                        {agreement.isExisting ? "Saved document" : "Ready to save"}
                      </p>
                    </div>

                    <div className="flex-shrink-0 flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleViewDocument(agreement)}
                        className="
                          flex items-center justify-center
                          w-8 h-8 rounded-lg cursor-pointer
                          bg-surface-secondary/80 dark:bg-white/[0.05]
                          border border-border-hairline
                          text-text-secondary hover:text-accent-primary
                          hover:border-accent-primary/30
                          transition-all duration-150
                        "
                        title="Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {!agreement.isExisting && (
                        <label
                          htmlFor={`change-${agreement.id}`}
                          className="
                            flex items-center justify-center
                            w-8 h-8 rounded-lg cursor-pointer
                            bg-surface-secondary/80 dark:bg-white/[0.05]
                            border border-border-hairline
                            text-text-secondary hover:text-accent-primary
                            hover:border-accent-primary/30
                            transition-all duration-150
                          "
                          title="Change file"
                        >
                          <Upload className="w-4 h-4" />
                          <input
                            id={`change-${agreement.id}`}
                            type="file"
                            accept="application/pdf"
                            className="hidden"
                            onChange={(e) => handleFileUpload(agreement.id, e)}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {!agreement.isExisting && (
                <button
                  type="button"
                  onClick={() => handleRemoveAgreement(agreement.id)}
                  className="
                    flex items-center justify-center w-8 sm:w-10
                    border-l border-border-hairline
                    text-text-muted hover:text-status-danger
                    hover:bg-status-danger/5
                    transition-all duration-150
                    rounded-r-xl
                    cursor-pointer
                  "
                  title="Remove"
                >
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={handleAddAgreement}
        className="
          w-full h-11 sm:h-12
          border-2 border-dashed border-border-hairline
          bg-transparent hover:bg-accent-primary/5
          hover:border-accent-primary/40
          text-text-secondary hover:text-accent-primary
          transition-all duration-200
          rounded-xl
          cursor-pointer
        "
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Agreement
      </Button>

      {localError && (
        <p className="text-sm text-status-danger font-medium">{localError}</p>
      )}

      {viewerDocument && (
        <DocumentViewer
          open={viewerOpen}
          onClose={() => {
            setViewerOpen(false);
            setViewerDocument(null);
          }}
          documentUrl={viewerDocument.url}
          fileName={viewerDocument.name}
        />
      )}
    </div>
  );
}
