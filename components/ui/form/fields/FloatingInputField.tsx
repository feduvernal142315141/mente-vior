"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

interface FloatingInputProps {
  field: {
    name: string;
    label: string;
    type?: string;
    required?: boolean;
  };
  error?: string;
}

export function FloatingInputField({ field, error }: FloatingInputProps) {
  const { register, setValue, watch } = useFormContext();

  const numericLikeFields = ["phoneNumber", "fax", "ein", "npi", "mpi", "userCompany.phoneNumber" ];
  const alphanumericFields = ["taxonomyCode"];
  const nameFields = ["userCompany.firstName", "userCompany.lastName"];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow copy/paste shortcuts (Ctrl+C, Ctrl+V, Cmd+C, Cmd+V, Ctrl+A, Cmd+A, Ctrl+X, Cmd+X)
    if (e.ctrlKey || e.metaKey) return;

    const allowedSystemKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Home", "End"];

    if (allowedSystemKeys.includes(e.key)) return;

    // Validation for numeric-like fields (phone, fax, ein, npi, mpi)
    if (numericLikeFields.includes(field.name)) {
      const allowedRegex = /^[0-9+\-() ,./\\:;_*@!?=%&#]+$/;
      if (!allowedRegex.test(e.key)) {
        e.preventDefault();
      }
      return;
    }

    // Validation for alphanumeric fields (taxonomyCode)
    if (alphanumericFields.includes(field.name)) {
      const allowedRegex = /^[a-zA-Z0-9+\-() ,./\\:;_*@!?=%&#]+$/;
      if (!allowedRegex.test(e.key)) {
        e.preventDefault();
      }
      return;
    }

    // Validation for name fields (firstName, lastName) - only letters and spaces
    if (nameFields.includes(field.name)) {
      const allowedRegex = /^[a-zA-Z\s]+$/;
      if (!allowedRegex.test(e.key)) {
        e.preventDefault();
      }
      return;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;
    let cleanedValue = currentValue;

    // Validation for name fields - remove any invalid characters after paste or input
    if (nameFields.includes(field.name)) {
      cleanedValue = currentValue.replace(/[^a-zA-Z\s]/g, '');
    }
    // Validation for numeric-like fields
    else if (numericLikeFields.includes(field.name)) {
      cleanedValue = currentValue.replace(/[^0-9+\-() ,./\\:;_*@!?=%&#]/g, '');
    }
    // Validation for alphanumeric fields
    else if (alphanumericFields.includes(field.name)) {
      cleanedValue = currentValue.replace(/[^a-zA-Z0-9+\-() ,./\\:;_*@!?=%&#]/g, '');
    }

    // Update the form value if it was cleaned
    if (cleanedValue !== currentValue) {
      setValue(field.name, cleanedValue, { shouldValidate: true });
    }
  };

  return (
    <div className="w-full">
      <div className="relative w-full">
        <input
          {...register(field.name, {
            onChange: handleChange
          })}
          id={field.name}

          type={
            numericLikeFields.includes(field.name)
              ? "text"
              : field.type || "text"
          }

          placeholder=" "
          autoComplete="off"
          spellCheck={false}
          onKeyDown={handleKeyDown}

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
          `,
            error &&
              `border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/25 dark:border-red-500`
          )}
        />

        <label
          htmlFor={field.name}
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
          {field.label}
          {field.required && <span className="ml-0.5 text-[#2563EB]">*</span>}
        </label>
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
