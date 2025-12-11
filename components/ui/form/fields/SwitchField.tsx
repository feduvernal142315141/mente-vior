"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { SwitchPremium } from "../../SwitchPremium";

export function SwitchField({ field }: any) {
  const { setValue, watch } = useFormContext();
  const value = watch(field.name);

  return (
    <div
      className={cn(
        "flex items-start justify-between w-full py-3",
        "transition-all duration-300"
      )}
    >
      <div className="flex flex-col">
        <p
          className={cn(
            "text-sm font-semibold leading-tight",
            "text-slate-800 dark:text-slate-100"
          )}
        >
          {field.label}
          {field.required && <span className="text-[#2563EB] ml-0.5">*</span>}
        </p>

        {field.description && (
          <p
            className={cn(
              "text-xs mt-0.5 max-w-[260px]",
              "text-slate-500 dark:text-slate-400"
            )}
          >
            {field.description}
          </p>
        )}
      </div>

      <SwitchPremium
        checked={!!value}
        onCheckedChange={(val: boolean) => setValue(field.name, val)}
        className={cn(
          "transition-all duration-300 rounded-full shadow-sm",
          "data-[state=unchecked]:bg-slate-300 dark:data-[state=unchecked]:bg-slate-700",
          "data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-500",
          "data-[state=checked]:shadow-[0_0_10px_rgba(37,99,235,0.55)]"
        )}
      />
    </div>
  );
}
