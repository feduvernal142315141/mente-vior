"use client";

import {cn} from "@/lib/utils";
import type {FieldValues} from "react-hook-form";
import type {SectionConfig, FormBuilderProps, FieldConfig} from "./FormBuilder.types";
import {FormField} from "./FormField";

interface Props<TFormValues extends FieldValues> {
    section: SectionConfig<TFormValues>;
    globalOptions?: FormBuilderProps<TFormValues>["globalOptions"];
    activeSection?: string;
    setActiveSection?: (section: string) => void;
    hoveredSection?: string | null;
    setHoveredSection?: (section: string | null) => void;
    flashSection?: string | null;
}

export function SideSectionCard<TFormValues extends FieldValues>({
                                                                     section,
                                                                     globalOptions,
                                                                     activeSection,
                                                                     setActiveSection,
                                                                     hoveredSection,
                                                                     setHoveredSection,
                                                                     flashSection,
                                                                 }: Props<TFormValues>) {
    const fields:FieldConfig<TFormValues>[] = section.fields.map(
        (field: FieldConfig<TFormValues>) => ({...field, visible: field.visible ?? true}))

    const columns = section.columns ?? 1;
    const isFlashing = flashSection === section.id;

    return (
        <section
            id={section.id}
            className="scroll-mt-56"
            onClick={() => setActiveSection?.(section.id)}
        >
            <div
                className={cn(
                    `
          rounded-3xl p-6 transition-all duration-300 cursor-pointer
          backdrop-blur-[3px]

          bg-white/90 
          dark:bg-[#0B1220]/60

          ring-1 
          ring-slate-200/60 
          dark:ring-white/10

          hover:-translate-y-[2px]
          hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)]
          dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.45)]
          `,
                    isFlashing &&
                    `
            ring-2 ring-[#2563EB] 
            shadow-[0_0_0_4px_rgba(37,99,235,0.18)]
            dark:shadow-[0_0_0_4px_rgba(37,99,235,0.35)]
          `
                )}
            >
                <h3
                    className="
            text-[15px] font-semibold tracking-wide mb-1
            text-slate-800 dark:text-white
          "
                >
                    {section.title}
                </h3>

                {section.description && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                        {section.description}
                    </p>
                )}

                <div className="
          h-px my-3 
          bg-gradient-to-r 
          from-transparent via-slate-300/40 to-transparent
          dark:via-white/10
        "/>

                <div
                    className={cn(
                        "gap-5",
                        columns === 1 ? "grid grid-cols-1" : "grid grid-cols-2"
                    )}
                >
                    {fields.map((field) => (
                        field.visible && (
                            <FormField
                                key={String(field.name)}
                                field={field}
                                globalOptions={globalOptions}
                            />
                        )
                    ))}
                </div>
            </div>
        </section>
    );
}
