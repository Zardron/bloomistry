"use client";

import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

export function TextInput({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block text-sm font-semibold text-[#5d5364]">
      {label}
      <input
        {...props}
        className="mt-2 w-full border border-[#dfd2ea] px-4 py-3 outline-none focus:border-[#77669d]"
      />
    </label>
  );
}

export function TextArea({
  label,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <label className="block text-sm font-semibold text-[#5d5364]">
      {label}
      <textarea
        {...props}
        rows={4}
        className="mt-2 w-full resize-none border border-[#dfd2ea] px-4 py-3 outline-none focus:border-[#77669d]"
      />
    </label>
  );
}

export function FileInput({
  required = false,
}: {
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-semibold text-[#5d5364]">
      Image
      <input
        name="image"
        type="file"
        accept="image/*"
        required={required}
        className="mt-2 w-full border border-[#dfd2ea] bg-white px-4 py-3 text-sm"
      />
    </label>
  );
}

export function Checkbox({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="flex items-center gap-3 text-sm font-semibold text-[#5d5364]">
      <input type="checkbox" {...props} className="h-4 w-4 accent-[#77669d]" />
      {label}
    </label>
  );
}

export function FormActions({
  isLoading,
  isEditing,
  onCancel,
}: {
  isLoading: boolean;
  isEditing: boolean;
  onCancel: () => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <button
        type="submit"
        disabled={isLoading}
        className="bg-[#d1ad51] px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#b8953d] disabled:opacity-60"
      >
        {isLoading ? "Saving" : isEditing ? "Update" : "Save"}
      </button>
      {isEditing ? (
        <button
          type="button"
          onClick={onCancel}
          className="border border-[#dfd2ea] bg-white px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#67558a]"
        >
          Cancel
        </button>
      ) : null}
    </div>
  );
}
