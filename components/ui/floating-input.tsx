"use client";

import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface FloatingInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    label: string;
    error?: string;
    hasError?: boolean;
    onChange?: (value: string) => void;
}

export function FloatingInput({
    label,
    error,
    hasError,
    onChange,
    className,
    ...props // ← Captura todas las demás props (value, onBlur, disabled, name, type, etc.)
}: FloatingInputProps) {
    const showError = error || hasError;

    return (
        <div className="w-full">
            <div className="relative w-full">
                <input
                    id={props.name}
                    {...props}
                    onChange={(e) => onChange?.(e.target.value)}
                    placeholder=" "
                    autoComplete="off"
                    spellCheck={false}
                    className={cn(
                        `
            peer w-full h-14 rounded-xl px-4 text-sm
            border transition-all duration-200
            
            cursor-text caret-gray-700 dark:caret-gray-200
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
            
            disabled:opacity-50 disabled:cursor-not-allowed
          `,
                        showError &&
                        `border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/25 dark:border-red-500`,
                        className
                    )}
                />

                <label
                    htmlFor={props.name}
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
                    {label}
                    {props.required && <span className="ml-0.5 text-[#2563EB]">*</span>}
                </label>
            </div>

            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
}
