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
    <aside className="flex flex-col border-b border-[#d9c385]/50 bg-[#fffdf7] px-5 py-5 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r lg:px-6">
      <div className="flex items-center gap-3">
        <Image
          src="/logo.jpeg"
          alt="Bloomistry Alaine's Craft logo"
          width={72}
          height={72}
          className="h-14 w-14 shrink-0 rounded-full border border-[#d1ad51] bg-white object-cover shadow-sm"
        />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a98739]">
            Bloomistry
          </p>
          <h1 className="font-serif text-2xl leading-tight text-[#67558a]">Admin</h1>
        </div>
      </div>

      <nav className="mt-7 grid gap-2">
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
              className={`flex items-center justify-between border px-4 py-3 text-left text-sm font-bold uppercase tracking-[0.1em] transition ${
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

      <div className="mt-7 border-t border-[#d9c385]/50 pt-5 lg:mt-auto">
        <p className="truncate text-sm font-semibold text-[#625a67]">{userEmail}</p>
        <button
          type="button"
          onClick={onLogout}
          className="mt-4 w-full border border-[#c7ad58] bg-white px-4 py-2 text-sm font-semibold text-[#6f608f] transition hover:bg-[#fffdf7]"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
