import Image from "next/image";

export default function Loading() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#fbf8ff] px-5 text-[#332b3d]">
      <section className="w-full max-w-md border border-[#d9c385]/60 bg-white p-6 text-center shadow-xl shadow-[#77669d]/10">
        <Image
          src="/logo.jpeg"
          alt="Bloomistry Alaine's Craft logo"
          width={96}
          height={96}
          priority
          className="mx-auto h-20 w-20 rounded-full border border-[#d1ad51] bg-white object-cover shadow-sm"
        />
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#a98739]">
          Bloomistry
        </p>
        <h1 className="mt-2 font-serif text-4xl text-[#67558a]">
          Loading blooms
        </h1>
        <div className="mx-auto mt-6 flex w-28 items-center justify-center gap-2">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#77669d]" />
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#d1ad51] [animation-delay:150ms]" />
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#77669d] [animation-delay:300ms]" />
        </div>
      </section>
    </main>
  );
}
