"use client";
import { useState, useRef, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

export function TextAreaField({ field, error }: any) {
  const { register, watch } = useFormContext();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { ref: registerRef, ...restRegister } = register(field.name);

  const value = watch(field.name);
  const [isFocused, setIsFocused] = useState(false);

  const isFilled = Boolean(value && value.length > 0);
  const shouldFloat = isFocused || isFilled;

  // Auto-resize
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [value]);

  return (
    <div className="relative w-full">
      <textarea
        {...restRegister}
        ref={(el) => {
          registerRef(el);          // RHF
          textareaRef.current = el; // local
        }}
        rows={field.rows || 3}
        placeholder=" "
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          `
          peer w-full min-h-[3.5rem] px-4 py-3 rounded-xl 
          resize-none leading-relaxed transition-all duration-200

          /* LIGHT (igual que FloatingInput) */
          bg-white text-gray-900
          border border-gray-300
          hover:border-gray-400

          cursor-text caret-gray-700 dark:caret-gray-200
          focus:cursor-text
          focus:outline-none

          focus-visible:ring-4 focus-visible:ring-blue-600/15 
          focus-visible:border-blue-600

          placeholder:text-transparent

          /* DARK (igual que FloatingInput) */
          dark:bg-[#0F162A] dark:text-gray-100
          dark:border-[#1E293B]
          dark:hover:border-[#334155]
        `,
          error &&
            `
            border-red-500 focus-visible:border-red-500 
            focus-visible:ring-red-500/25 dark:border-red-500
          `
        )}
      />

      {/* LABEL flotante igual al input */}
      <label
        className={cn(
          `
          absolute left-4 px-1
          bg-white dark:bg-[#0F162A]
          text-sm text-gray-500 dark:text-gray-400
          pointer-events-none
          transition-all duration-200
        `,
          // posición y tamaño (flota si hay valor o foco)
          shouldFloat
            ? "top-0 -translate-y-1/2 text-xs"
            : "top-1/2 -translate-y-1/2",
          // color azul SOLO mientras hay foco (como el input)
          isFocused && "text-blue-600"
        )}
      >
        {field.label}
        {field.required && (
          <span className="ml-0.5 text-[#2563EB]">*</span>
        )}
      </label>

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
