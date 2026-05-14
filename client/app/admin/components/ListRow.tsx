"use client";

import Image from "next/image";

export function ListRow({
  eyebrow,
  title,
  subtitle,
  status,
  imageUrl,
  imageAlt,
  primaryActionLabel,
  primaryActionDisabled = false,
  onPrimaryAction,
  onEdit,
  onDelete,
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
  status: string;
  imageUrl?: string;
  imageAlt?: string;
  primaryActionLabel?: string;
  primaryActionDisabled?: boolean;
  onPrimaryAction?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  const hasImageColumn = imageUrl !== undefined;

  return (
    <article className="flex flex-col justify-between gap-4 bg-white p-4 sm:flex-row sm:items-center">
      <div className="flex min-w-0 gap-4">
        {hasImageColumn ? (
          imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt ?? title}
              width={112}
              height={112}
              unoptimized
              className="h-24 w-24 shrink-0 border border-[#dfd2ea] bg-[#fbf8ff] object-cover sm:h-28 sm:w-28"
            />
          ) : (
            <div className="flex h-24 w-24 shrink-0 items-center justify-center border border-[#dfd2ea] bg-[#fbf8ff] text-xs font-bold uppercase tracking-[0.1em] text-[#a98739] sm:h-28 sm:w-28">
              No image
            </div>
          )
        ) : null}
        <div className="min-w-0 self-center">
          <div className="flex flex-wrap items-center gap-3">
            {eyebrow ? (
              <span className="text-sm font-bold uppercase tracking-[0.12em] text-[#a98739]">
                {eyebrow}
              </span>
            ) : null}
            <h3 className="font-serif text-2xl text-[#67558a]">{title}</h3>
            <span className="bg-[#f4eefb] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#77669d]">
              {status}
            </span>
          </div>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#625a67]">{subtitle}</p>
        </div>
      </div>
      <div className="flex shrink-0 gap-3 sm:self-center">
        {onPrimaryAction && primaryActionLabel ? (
          <button
            type="button"
            disabled={primaryActionDisabled}
            onClick={onPrimaryAction}
            className="border border-[#c7ad58] px-4 py-2 text-sm font-semibold text-[#6f608f] transition hover:bg-[#fffdf7] disabled:opacity-60"
          >
            {primaryActionLabel}
          </button>
        ) : null}
        {onEdit ? (
          <button
            type="button"
            onClick={onEdit}
            className="border border-[#dfd2ea] px-4 py-2 text-sm font-semibold text-[#67558a] transition hover:bg-[#f4eefb]"
          >
            Edit
          </button>
        ) : null}
        {onDelete ? (
          <button
            type="button"
            onClick={onDelete}
            className="border border-[#c7ad58] px-4 py-2 text-sm font-semibold text-[#6f608f] transition hover:bg-[#fffdf7]"
          >
            Delete
          </button>
        ) : null}
      </div>
    </article>
  );
}
