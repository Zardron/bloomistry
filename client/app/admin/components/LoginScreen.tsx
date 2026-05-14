"use client";

import Image from "next/image";
import type { FormEvent } from "react";

export function LoginScreen({
  rememberedLogin,
  isLoading,
  message,
  onSubmit,
}: {
  rememberedLogin: {
    email: string;
    password: string;
    remember: boolean;
  };
  isLoading: boolean;
  message: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <main className="min-h-dvh bg-[#fbf8ff] px-4 py-6 text-[#332b3d] sm:px-5 sm:py-10">
      <section className="mx-auto grid min-h-[calc(100dvh-3rem)] max-w-6xl items-center gap-8 lg:min-h-[calc(100dvh-5rem)] lg:grid-cols-[1fr_440px] lg:gap-10">
        <div>
          <div className="flex items-center justify-center gap-3 lg:justify-start">
            <Image
              src="/logo.jpeg"
              alt="Bloomistry Alaine's Craft logo"
              width={80}
              height={80}
              priority
              className="h-16 w-16 shrink-0 rounded-full border border-[#d1ad51] bg-white object-cover shadow-sm"
            />
            <div className="text-center lg:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a98739]">
                Bloomistry Admin
              </p>
              <p className="font-serif text-2xl leading-tight text-[#77669d]">
                Alaine&apos;s Craft
              </p>
            </div>
          </div>
          <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-tight text-[#67558a] sm:text-7xl">
            Manage every bloom with care.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#625a67] sm:mt-5 sm:text-lg sm:leading-8">
            A secure dashboard for catalog updates, customer moments, and category
            organization.
          </p>
        </div>
        <form
          key={`${rememberedLogin.email}:${rememberedLogin.password}:${rememberedLogin.remember}`}
          onSubmit={onSubmit}
          className="border border-[#d9c385]/60 bg-white p-5 shadow-xl shadow-[#77669d]/10 sm:p-6"
        >
          <h2 className="font-serif text-3xl text-[#67558a]">Admin login</h2>
          <label className="mt-6 block text-sm font-semibold text-[#5d5364]">
            Email
            <input
              name="email"
              type="email"
              required
              defaultValue={rememberedLogin.email}
              className="mt-2 min-h-12 w-full border border-[#dfd2ea] px-4 py-3 text-base outline-none focus:border-[#77669d]"
            />
          </label>
          <label className="mt-4 block text-sm font-semibold text-[#5d5364]">
            Password
            <input
              name="password"
              type="password"
              required
              minLength={8}
              defaultValue={rememberedLogin.password}
              className="mt-2 min-h-12 w-full border border-[#dfd2ea] px-4 py-3 text-base outline-none focus:border-[#77669d]"
            />
          </label>
          <label className="mt-4 flex items-center gap-3 text-sm font-semibold text-[#5d5364]">
            <input
              name="rememberMe"
              type="checkbox"
              defaultChecked={rememberedLogin.remember}
              className="h-4 w-4 accent-[#77669d]"
            />
            Remember me
          </label>
          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 min-h-12 w-full bg-[#77669d] px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#67558a] disabled:opacity-60"
          >
            {isLoading ? "Signing in" : "Sign in"}
          </button>
          {message ? <p className="mt-4 text-sm text-[#a98739]">{message}</p> : null}
        </form>
      </section>
    </main>
  );
}
