"use client";

import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Option {
  value: string;
  label: string;
}

interface FloatingSelectProps {
  field: any;
  error?: string;
  options: Option[];
  onFieldChange?: (name: string, value: any) => void;
}

export function FloatingSelect({ field, error, options, onFieldChange }: FloatingSelectProps) {
  const { control } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Controller
      control={control}
      name={field.name}
      render={({ field: rhfField }) => {
        const hasValue = !!rhfField.value;
        const shouldFloat = isOpen || hasValue;

        return (
          <div className="w-full">
            <div className="relative w-full">
              <Select
                value={rhfField.value ?? ""}
                onValueChange={(val) => {
                  rhfField.onChange(val);
                  if (onFieldChange) {
                    onFieldChange(field.name, val);
                  }
                }}
                onOpenChange={setIsOpen}
              >
                <SelectTrigger
                  className={cn(
                    `
                    peer w-full h-14 min-h-[56px] rounded-xl 
                    px-4 flex items-center justify-between text-sm
                    border transition-all duration-200 
                    focus:outline-none focus:ring-4 focus:ring-blue-600/15 
                    focus:border-blue-600
                    cursor-pointer

                    dark:bg-[#0F162A] bg-white
                    dark:text-gray-200 text-gray-900
                    dark:border-[#1E293B] border-gray-300
                    dark:hover:border-[#334155] hover:border-gray-400
                  `,
                    error &&
                      `
                      border-red-500 focus:border-red-500 
                      focus:ring-red-500/20
                    `
                  )}
                >
                  <SelectValue placeholder=" " />
                </SelectTrigger>

                <SelectContent
                  position="popper"
                  className={cn(
                    `
                    mt-1 rounded-xl border w-[var(--radix-select-trigger-width)]

                    bg-white dark:bg-[#111827]
                    border-gray-200 dark:border-[#1F2937]

                    shadow-[0_12px_30px_rgba(15,23,42,0.18)]
                    dark:shadow-[0_12px_30px_rgba(0,0,0,0.45)]
                  `
                  )}
                >
                  {options?.map((opt) => (
                    <SelectItem
                      key={opt.value}
                      value={opt.value}
                      className={cn(
                        `
                        cursor-pointer rounded-lg px-3 py-2.5 text-sm

                        text-gray-800 dark:text-gray-200
                        data-[highlighted]:bg-gray-50 dark:data-[highlighted]:bg-[#1E293B]
                        data-[state=checked]:bg-blue-50 dark:data-[state=checked]:bg-blue-700/20 
                        data-[state=checked]:text-blue-700 dark:data-[state=checked]:text-blue-400
                      `
                      )}
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <label
                className={cn(
                  `
                  absolute left-4 px-1 pointer-events-none 
                  transition-all duration-200
                  bg-white dark:bg-[#0F162A]

                  text-gray-500 dark:text-gray-400
                  peer-focus:text-blue-600
                `,
                  shouldFloat
                    ? "top-0 -translate-y-1/2 text-xs text-blue-600"
                    : "top-1/2 -translate-y-1/2"
                )}
              >
                {field.label}
                {field.required && (
                  <span className="ml-0.5 text-[#2563EB]">*</span>
                )}
              </label>
            </div>

            {error && (
              <p className="mt-1 text-xs text-red-500">
                {error}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}
