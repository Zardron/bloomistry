"use client";

import Image from "next/image";
import type { AdminStat, Section } from "../adminTypes";

export function AdminSidebar({
  sections,
  activeSection,
  stats,
  featuredCount,
  userEmail,
  onSectionChange,
  onLogout,
}: {
  sections: Array<{ key: Section; label: string }>;
  activeSection: Section;
  stats: AdminStat[];
  featuredCount: number;
  userEmail?: string;
  onSectionChange: (section: Section) => void;
  onLogout: () => void;
}) {
  return (
    <aside className="flex flex-col border-b border-[#d9c385]/50 bg-[#fffdf7] px-4 py-4 lg:sticky lg:top-0 lg:h-dvh lg:border-b-0 lg:border-r lg:px-6 lg:py-5">
      <div className="flex items-center gap-3">
        <Image
          src="/logo.jpeg"
          alt="Bloomistry Alaine's Craft logo"
          width={72}
          height={72}
          className="h-12 w-12 shrink-0 rounded-full border border-[#d1ad51] bg-white object-cover shadow-sm sm:h-14 sm:w-14"
        />
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#a98739] sm:text-xs">
            Bloomistry
          </p>
          <h1 className="font-serif text-2xl leading-tight text-[#67558a] sm:text-3xl">Admin</h1>
        </div>
      </div>

      <nav className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:mt-7 lg:grid-cols-1">
        {sections.map((section) => {
          const total =
            section.key === "featured"
              ? featuredCount
              : stats.find((item) => item.label === section.label)?.value ?? 0;
          const isActive = activeSection === section.key;

          return (
            <button
              key={section.key}
              type="button"
              onClick={() => onSectionChange(section.key)}
              className={`flex min-h-12 items-center justify-between gap-3 border px-3 py-3 text-left text-xs font-bold uppercase tracking-[0.08em] transition sm:text-sm lg:px-4 ${
                isActive
                  ? "border-[#77669d] bg-[#77669d] text-white shadow-sm shadow-[#77669d]/20"
                  : "border-[#dfd2ea] bg-white text-[#67558a] hover:bg-[#f4eefb]"
              }`}
            >
              <span>{section.label}</span>
              <span className={isActive ? "text-white/75" : "text-[#a98739]"}>{total}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-4 border-t border-[#d9c385]/50 pt-4 lg:mt-auto lg:pt-5">
        <p className="truncate text-sm font-semibold text-[#625a67]">{userEmail}</p>
        <button
          type="button"
          onClick={onLogout}
          className="mt-3 min-h-11 w-full border border-[#c7ad58] bg-white px-4 py-2 text-sm font-semibold text-[#6f608f] transition hover:bg-[#fffdf7] lg:mt-4"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
