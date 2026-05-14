"use client";

export type AdminToastMessage = {
  id: number;
  title: string;
  description?: string;
  tone: "success" | "error";
};

export function AdminToast({
  toast,
  onDismiss,
}: {
  toast: AdminToastMessage | null;
  onDismiss: () => void;
}) {
  if (!toast) return null;

  const isSuccess = toast.tone === "success";

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:inset-x-auto sm:right-5 sm:top-5 sm:block sm:px-0">
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-auto flex w-full max-w-sm items-start gap-3 border border-[#d9c385]/70 bg-white p-4 shadow-2xl shadow-[#77669d]/15"
      >
        <span
          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base font-bold text-white ${
            isSuccess ? "bg-[#77669d]" : "bg-[#b04747]"
          }`}
          aria-hidden="true"
        >
          {isSuccess ? "✓" : "!"}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a98739]">
            Bloomistry admin
          </p>
          <p className="mt-1 font-serif text-xl leading-tight text-[#67558a]">{toast.title}</p>
          {toast.description ? (
            <p className="mt-1 text-sm leading-5 text-[#625a67]">{toast.description}</p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 px-2 py-1 text-lg leading-none text-[#77669d] transition hover:text-[#332b3d]"
          aria-label="Dismiss notification"
        >
          ×
        </button>
      </div>
    </div>
  );
}
