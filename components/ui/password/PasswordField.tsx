"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  placeholder: string;
  hasError?: boolean;
}

export function PasswordField({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  hasError,
}: Props) {
  const [show, setShow] = useState(false);
  const shouldFloat = value.length > 0;

  return (
    <div className="w-full">
      <div className="relative w-full">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder=" "
          autoComplete="off"
          className={cn(
            `
            peer w-full h-14 rounded-xl px-4 pr-12 text-sm
            border transition-all duration-200
            
            cursor-text
            focus:cursor-text
            focus:outline-none

            focus-visible:ring-4 focus-visible:ring-blue-600/15 
            focus-visible:border-blue-600

            placeholder:text-transparent

            /* LIGHT MODE */
            bg-white text-gray-900 border-gray-300 hover:border-gray-400

            /* DARK MODE */
            dark:bg-[#0F162A] dark:text-gray-100 
            dark:border-[#1E293B] dark:hover:border-[#334155]
          `,
            hasError &&
              `
              border-red-500 focus-visible:border-red-500 
              focus-visible:ring-red-500/25
              dark:border-red-500
            `
          )}
        />

        <label
          className={cn(
            `
            absolute left-4 px-1
            bg-white dark:bg-[#0F162A]
            text-sm text-gray-500 dark:text-gray-400
            pointer-events-none
            transition-all duration-200

            top-1/2 -translate-y-1/2

            peer-placeholder-shown:top-1/2
            peer-placeholder-shown:-translate-y-1/2

            peer-focus:top-0
            peer-focus:-translate-y-1/2
            peer-focus:text-xs
            peer-focus:text-blue-600

            peer-[&:not(:placeholder-shown)]:top-0
            peer-[&:not(:placeholder-shown)]:-translate-y-1/2
            peer-[&:not(:placeholder-shown)]:text-xs
          `
          )}
        >
          {label} <span className="text-[#2563EB]">*</span>
        </label>

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="
            absolute right-4 top-1/2 -translate-y-1/2
            text-gray-400 hover:text-gray-600
            dark:text-white/40 dark:hover:text-white/70
            transition-colors z-10
          "
        >
          {show ? (
            <Eye className="w-5 h-5" />
          ) : (
            <EyeOff className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}
