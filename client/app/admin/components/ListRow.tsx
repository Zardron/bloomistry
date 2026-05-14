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
  const primaryActionClass = !onEdit && !onDelete ? "col-span-2" : "";

  return (
    <article className="flex flex-col justify-between gap-4 bg-white p-4 md:flex-row md:items-center">
      <div className="flex min-w-0 gap-3 sm:gap-4">
        {hasImageColumn ? (
          imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt ?? title}
              width={112}
              height={112}
              unoptimized
              className="h-20 w-20 shrink-0 border border-[#dfd2ea] bg-[#fbf8ff] object-cover sm:h-28 sm:w-28"
            />
          ) : (
            <div className="flex h-20 w-20 shrink-0 items-center justify-center border border-[#dfd2ea] bg-[#fbf8ff] text-center text-[0.65rem] font-bold uppercase tracking-[0.08em] text-[#a98739] sm:h-28 sm:w-28 sm:text-xs sm:tracking-[0.1em]">
              No image
            </div>
          )
        ) : null}
        <div className="min-w-0 self-center">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {eyebrow ? (
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#a98739] sm:text-sm">
                {eyebrow}
              </span>
            ) : null}
            <h3 className="break-words font-serif text-xl leading-tight text-[#67558a] sm:text-2xl">
              {title}
            </h3>
            <span className="bg-[#f4eefb] px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-[#77669d] sm:px-3 sm:text-xs sm:tracking-[0.12em]">
              {status}
            </span>
          </div>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#625a67]">{subtitle}</p>
        </div>
      </div>
      <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex sm:gap-3 md:self-center">
        {onPrimaryAction && primaryActionLabel ? (
          <button
            type="button"
            disabled={primaryActionDisabled}
            onClick={onPrimaryAction}
            className={`${primaryActionClass} min-h-11 border border-[#c7ad58] px-3 py-2 text-sm font-semibold text-[#6f608f] transition hover:bg-[#fffdf7] disabled:opacity-60 sm:px-4`}
          >
            {primaryActionLabel}
          </button>
        ) : null}
        {onEdit ? (
          <button
            type="button"
            onClick={onEdit}
            className="min-h-11 border border-[#dfd2ea] px-3 py-2 text-sm font-semibold text-[#67558a] transition hover:bg-[#f4eefb] sm:px-4"
          >
            Edit
          </button>
        ) : null}
        {onDelete ? (
          <button
            type="button"
            onClick={onDelete}
            className="min-h-11 border border-[#c7ad58] px-3 py-2 text-sm font-semibold text-[#6f608f] transition hover:bg-[#fffdf7] sm:px-4"
          >
            Delete
          </button>
        ) : null}
      </div>
    </article>
  );
}
