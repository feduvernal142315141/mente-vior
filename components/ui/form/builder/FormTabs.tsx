"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

type FormSection = {
  id: string;
  tabLabel?: string;
  title?: string;
};

interface FormTabsProps {
  sections: FormSection[];
  offsetTop?: number;
  activeSection?: string;
  setActiveSection?: (section: string) => void;
  lockScroll?: boolean;
}

export function FormTabs({
  sections,
  offsetTop = 55,
  activeSection: externalActiveSection,
  setActiveSection: externalSetActiveSection,
}: FormTabsProps) {
  const [activeId, setActiveId] = useState<string | null>(
    externalActiveSection || sections[0]?.id || null
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const lock = useRef(false);
  const scrollTimeout = useRef<any>(null);

  useEffect(() => {
    if (externalActiveSection) setActiveId(externalActiveSection);
  }, [externalActiveSection]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        lock.current = false;
      }, 180);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTabClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    lock.current = true;

    const rect = el.getBoundingClientRect();
    const scrollTop = window.scrollY;

    const target = rect.top + scrollTop - (offsetTop + 72);

    window.scrollTo({
      top: Math.max(0, target),
      behavior: "smooth",
    });

    setActiveId(id);
    externalSetActiveSection?.(id);
  };

  if (!sections.length) return null;

  return (
    <div
      className="sticky z-40 w-full"
      style={{ top: offsetTop }}
    >
      <div
        className={cn(
          `
          border-b backdrop-blur-xl transition-all duration-300
          bg-surface-primary/80 
          dark:bg-surface-primary/60
          border-border-hairline
          `,
          isScrolled &&
            `
            shadow-[0_4px_14px_rgba(0,0,0,0.08)]
            dark:shadow-[0_4px_18px_rgba(255,255,255,0.05)]
          `
        )}
      >
        <div className="max-w-[1360px] mx-auto px-10">
          <div className="flex items-center h-16 gap-10 select-none">
            {sections.map((section) => {
              const label = section.tabLabel ?? section.title ?? section.id;
              const active = activeId === section.id;

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => handleTabClick(section.id)}
                  className={cn(
                    `
                    relative h-full px-1 text-[15px] font-medium tracking-wide
                    transition-all duration-300
                    cursor-pointer
                    `,
                    active
                      ? "text-accent-primary dark:text-accent-primary"
                      : "text-text-muted hover:text-text-primary"
                  )}
                >
                  {label}

                  {active && (
                    <span
                      className="
                      absolute inset-x-0 -bottom-[2px] h-[3px]
                      rounded-full
                      bg-accent-primary 
                      dark:bg-accent-primary
                      shadow-[0_2px_8px_rgba(37,99,235,0.45)]
                      "
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
