"use client";

import { useState } from "react";
import { X, Download, FileText, Loader2 } from "lucide-react";
import { Dialog, DialogOverlay, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import * as DialogPrimitive from '@radix-ui/react-dialog';

interface DocumentViewerProps {
  open: boolean;
  onClose: () => void;
  documentUrl: string;
  fileName?: string;
}

export function DocumentViewer({ open, onClose, documentUrl, fileName = "document.pdf" }: DocumentViewerProps) {
  const [loading, setLoading] = useState(true);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = documentUrl;
    link.download = fileName;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const pdfUrl = documentUrl;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="z-[9998]" />
        <DialogPrimitive.Content
          className={cn(
            "fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]",
            "z-[9999]",
            "max-w-[75vw] w-full h-[85vh]",
            "bg-surface-primary border border-border-hairline rounded-xl shadow-2xl",
            "overflow-hidden flex flex-col",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "duration-200"
          )}
        >
          <div className="px-6 py-4 border-b border-border-hairline bg-surface-secondary/40 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-accent-primary" />
                </div>
                <div>
                  <DialogTitle className="text-text-primary text-base font-semibold">
                    {fileName}
                  </DialogTitle>
                  <p className="text-xs text-text-muted mt-0.5">PDF Document</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  className={cn(
                    "h-9 px-4 rounded-lg",
                    "bg-surface-primary border border-border-hairline",
                    "hover:bg-accent-primary/10 hover:border-accent-primary/30",
                    "transition-all duration-200",
                    "flex items-center gap-2",
                    "text-sm font-medium text-text-primary",
                    "cursor-pointer"
                  )}
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>

                <button
                  onClick={onClose}
                  className={cn(
                    "w-9 h-9 rounded-lg",
                    "bg-surface-primary border border-border-hairline",
                    "hover:bg-red-500/10 hover:border-red-500/30",
                    "transition-all duration-200",
                    "flex items-center justify-center",
                    "cursor-pointer"
                  )}
                >
                  <X className="w-4 h-4 text-text-primary" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-hidden bg-[#525659] relative">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#525659] z-10">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                  <p className="text-sm text-white">Loading document...</p>
                </div>
              </div>
            )}

            <iframe
              src={pdfUrl}
              title={fileName}
              className="w-full h-full border-none"
              onLoad={() => setLoading(false)}
            />
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
