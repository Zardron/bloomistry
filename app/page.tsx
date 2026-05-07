"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

type GalleryItem = {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
};

type LightboxState = {
  items: GalleryItem[];
  index: number;
} | null;

const jpegIds = new Set([1, 2, 3, 4, 47, 55, 56, 57, 58, 59]);

const flowerSrc = (id: number) =>
  `/gallery/flowers/flower-${String(id).padStart(2, "0")}.${
    jpegIds.has(id) ? "jpeg" : "jpg"
  }`;

const flowerSections = [
  {
    title: "Custom",
    description: "Reference-inspired bouquets, money bouquets, chocolate wraps, and character-themed pieces.",
    ids: [28, 30, 31, 32, 33, 35, 37, 38],
  },
  {
    title: "Small",
    description: "Compact bouquets and mini flower arrangements for simple gifts.",
    ids: [5, 6, 7, 8, 9, 10, 22, 52, 53],
  },
  {
    title: "Medium",
    description: "Balanced handheld bouquets with fuller wrapping and flower details.",
    ids: [11, 12, 34, 36, 49, 50, 51, 54],
  },
  {
    title: "Large",
    description: "Statement bouquets with bigger blooms, layered wrapping, and fuller presentation.",
    ids: [1, 2, 3, 4, 47, 55, 56, 57, 58, 59],
  },
];

const hairPinIds = [13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 24, 25, 26, 27, 39, 40, 41, 42, 43, 44, 45];
const keychainIds = [29, 46, 48];
const flowerCount = flowerSections.reduce((total, section) => total + section.ids.length, 0);
const allItemsCount = flowerCount + hairPinIds.length + keychainIds.length;

const productTabs = [
  ...flowerSections.map((section) => ({
    ...section,
    label: `${section.title} Flower`,
  })),
  {
    title: "Hair Clips",
    description: "Colorful fuzzy wire flower and bow hair clips in singles, pairs, and packaged sets.",
    ids: hairPinIds,
    label: "Hair Clip",
  },
  {
    title: "Keychains",
    description: "Small fuzzy wire keepsakes made as keychains and hanging accessories.",
    ids: keychainIds,
    label: "Keychain",
  },
];

const customerIds = Array.from({ length: 13 }, (_, index) => index + 1);

const customerSrc = (id: number) =>
  `/gallery/customers/customer-${String(id).padStart(2, "0")}.${
    id === 13 ? "jpeg" : "jpg"
  }`;

export default function Home() {
  const [activeTabTitle, setActiveTabTitle] = useState(productTabs[0].title);
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const activeTab =
    productTabs.find((tab) => tab.title === activeTabTitle) ?? productTabs[0];

  const featured = {
    src: flowerSrc(4),
    alt: "Large sunflower bouquet with small white daisies and gold wrapping",
    title: "Large Sunflower Bouquet",
  };

  const activeProductItems = activeTab.ids.map((id) => ({
    src: flowerSrc(id),
    alt: `${activeTab.label} fuzzy wire craft ${id}`,
    title: activeTab.label,
    subtitle: `Bloomistry #${String(id).padStart(2, "0")}`,
  }));

  const customerItems = customerIds.map((id) => ({
    src: customerSrc(id),
    alt: `Satisfied Bloomistry customer ${id}`,
    title: "Customer Moment",
    subtitle: `Bloomistry smile #${String(id).padStart(2, "0")}`,
  }));

  const moveLightbox = useCallback((direction: number) => {
    setLightbox((current) => {
      if (!current) {
        return current;
      }

      const nextIndex =
        (current.index + direction + current.items.length) %
        current.items.length;

      return {
        ...current,
        index: nextIndex,
      };
    });
  }, []);

  useEffect(() => {
    if (!lightbox) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightbox(null);
      }

      if (event.key === "ArrowLeft") {
        moveLightbox(-1);
      }

      if (event.key === "ArrowRight") {
        moveLightbox(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightbox, moveLightbox]);

  const renderGalleryCard = (
    item: GalleryItem,
    onOpen: () => void,
  ) => (
    <article
      key={item.src}
      className="group bg-white shadow-sm ring-1 ring-[#dfd2ea]"
    >
      <div className="bg-white p-3">
        <button
          type="button"
          onClick={onOpen}
          className="relative block aspect-[4/5] w-full overflow-hidden bg-white text-left sm:aspect-[3/4]"
          aria-label={`View ${item.title} fullscreen`}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
            className="object-cover transition duration-500 group-hover:scale-[1.035]"
          />
          <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#67558a] opacity-95 shadow-sm">
            View
          </span>
        </button>
      </div>
      <div className="flex items-end justify-between gap-4 border-t border-[#d9c385]/45 bg-white p-4">
        <div>
          <h4 className="font-serif text-xl text-[#67558a] sm:text-2xl">
            {item.title}
          </h4>
          <p className="mt-1 text-sm text-[#766b7d]">
            {item.subtitle}
          </p>
        </div>
        <span className="h-3 w-3 rounded-full bg-[#d1ad51]" />
      </div>
    </article>
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf8ff] text-[#332b3d]">
      <section className="relative isolate border-b border-[#d9c385]/45 bg-[#f4eefb]">
        <div className="absolute inset-x-0 top-0 h-28 bg-[#fdf8e8]" />
        <div className="relative mx-auto grid min-h-screen w-full max-w-7xl gap-10 px-5 py-6 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-10">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:absolute lg:left-10 lg:right-10 lg:top-6">
            <div className="flex w-full items-center gap-3 sm:w-auto">
              <Image
                src="/logo.jpeg"
                alt="Bloomistry Alaine's Craft logo"
                width={82}
                height={82}
                priority
                className="h-14 w-14 shrink-0 rounded-full border border-[#d1ad51] bg-white object-cover shadow-sm sm:h-16 sm:w-16"
              />
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#a98739] sm:text-sm sm:tracking-[0.28em]">
                  Alaine&apos;s Craft
                </p>
                <p className="font-serif text-2xl leading-tight text-[#77669d]">
                  Bloomistry
                </p>
              </div>
            </div>
            <div className="grid w-full grid-cols-2 gap-3 sm:flex sm:w-auto sm:items-center">
              <a
                href="#gallery"
                className="rounded-full border border-[#c7ad58] bg-white/70 px-4 py-3 text-center text-sm font-semibold text-[#6f608f] shadow-sm transition hover:bg-white sm:px-5"
              >
                View Gallery
              </a>
              <a
                href="https://www.facebook.com/alaine.galarroza"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#77669d] px-4 py-3 text-center text-sm font-semibold text-white shadow-sm shadow-[#77669d]/25 transition hover:bg-[#67558a] sm:px-5"
              >
                Inquire
              </a>
            </div>
          </header>

          <div className="pt-3 sm:pt-8 lg:pt-24">
            <div className="mb-5 inline-flex items-center gap-3 border-y border-[#d9c385]/60 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#9a8037] sm:mb-7 sm:text-sm sm:tracking-[0.22em]">
              Fuzzy wire flower bouquets
            </div>
            <h1 className="max-w-2xl font-serif text-4xl leading-[1.05] text-[#67558a] sm:text-6xl lg:text-8xl">
              Handmade blooms that stay bright.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#5d5364] sm:mt-6 sm:text-lg sm:leading-8">
              A simple showcase of Alaine&apos;s soft, sculpted flower pieces,
              shaped from fuzzy wires and wrapped with a gentle Bloomistry touch.
            </p>
            <a
              href="https://www.facebook.com/alaine.galarroza"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex w-full justify-center rounded-full bg-[#d1ad51] px-6 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-lg shadow-[#d1ad51]/25 transition hover:bg-[#b8953d] sm:w-auto sm:px-7 sm:tracking-[0.16em]"
            >
              For inquiries
            </a>
            <div className="mt-8 grid max-w-xl grid-cols-3 border-y border-[#d9c385]/55 text-center">
              <div className="px-2 py-4">
                <p className="font-serif text-2xl text-[#77669d] sm:text-3xl">
                  50+
                </p>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#a98739] sm:text-xs sm:tracking-[0.18em]">
                  Starts at
                </p>
              </div>
              <div className="border-x border-[#d9c385]/55 px-2 py-4">
                <p className="font-serif text-2xl text-[#77669d] sm:text-3xl">
                  500
                </p>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#a98739] sm:text-xs sm:tracking-[0.18em]">
                  Range up to
                </p>
              </div>
              <div className="px-2 py-4">
                <p className="font-serif text-2xl text-[#77669d] sm:text-3xl">
                  Varies
                </p>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#a98739] sm:text-xs sm:tracking-[0.18em]">
                  Custom
                </p>
              </div>
            </div>
          </div>

          <div className="pb-8 pt-0 lg:pt-24">
            <div className="relative mx-auto max-w-[620px]">
              <div className="absolute -left-2 top-8 h-[76%] w-[66%] border border-[#d1ad51]/60 bg-[#efe7f8] sm:-left-4 sm:top-10 sm:h-[78%] sm:w-[70%]" />
              <div className="relative rounded-t-[42vw] border border-[#d1ad51]/65 bg-white p-3 shadow-2xl shadow-[#77669d]/20 sm:rounded-t-full sm:p-4">
                <Image
                  src={featured.src}
                  alt={featured.alt}
                  width={1536}
                  height={2048}
                  priority
                  sizes="(min-width: 1024px) 46vw, 92vw"
                  className="aspect-[4/5] w-full rounded-t-[38vw] bg-white object-cover sm:rounded-t-full"
                />
              </div>
              <div className="relative -mt-12 ml-auto w-[90%] bg-white/90 p-4 shadow-xl shadow-[#77669d]/10 backdrop-blur sm:-mt-16 sm:w-[82%] sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a98739]">
                  Featured bouquet
                </p>
                <p className="mt-2 font-serif text-2xl text-[#67558a] sm:text-3xl">
                  {featured.title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="bg-[#fffdf7] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex flex-col justify-between gap-5 border-b border-[#d9c385]/50 pb-7 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#a98739]">
                The collection
              </p>
              <h2 className="mt-3 font-serif text-3xl text-[#67558a] sm:text-5xl">
                Fuzzy wire florals
              </h2>
            </div>
            <p className="max-w-lg text-base leading-7 text-[#625a67]">
              Browse {allItemsCount} unique product photos by tab: custom,
              small, medium, large, hair clips, and keychains. Exact duplicate
              photos are skipped.
            </p>
          </div>

          <div className="mb-10 grid gap-5 md:grid-cols-3">
            <div className="border border-[#d9c385]/55 bg-[#fbf8ff] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#a98739]">
                Starting price
              </p>
              <p className="mt-3 font-serif text-4xl text-[#67558a] sm:text-5xl">
                50
              </p>
              <p className="mt-3 text-sm leading-6 text-[#625a67]">
                Simple handmade fuzzy wire flower pieces begin at 50.
              </p>
            </div>
            <div className="border border-[#d9c385]/55 bg-[#f4eefb] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#a98739]">
                Bouquet range
              </p>
              <p className="mt-3 font-serif text-4xl text-[#67558a] sm:text-5xl">
                50-500
              </p>
              <p className="mt-3 text-sm leading-6 text-[#625a67]">
                Final pricing depends on bouquet size, flower count, wrapping,
                and detail.
              </p>
            </div>
            <div className="border border-[#d9c385]/55 bg-[#fffdf7] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#a98739]">
                Custom bouquet
              </p>
              <p className="mt-3 font-serif text-4xl text-[#67558a] sm:text-5xl">
                Varies
              </p>
              <p className="mt-3 text-sm leading-6 text-[#625a67]">
                Price may vary for photo-reference or design-following bouquets,
                depending on complexity.
              </p>
            </div>
          </div>

          <section>
            <div className="mb-7 border-b border-[#d9c385]/50 pb-5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#a98739]">
                Product gallery
              </p>
              <h3 className="mt-3 font-serif text-3xl text-[#67558a] sm:text-5xl">
                Choose a category
              </h3>
              <div
                role="tablist"
                aria-label="Product categories"
                className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:flex"
              >
                {productTabs.map((tab) => {
                  const isActive = tab.title === activeTab.title;

                  return (
                    <button
                      key={tab.title}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveTabTitle(tab.title)}
                      className={`rounded-full border px-4 py-3 text-sm font-semibold transition sm:px-5 ${
                        isActive
                          ? "border-[#77669d] bg-[#77669d] text-white shadow-sm shadow-[#77669d]/25"
                          : "border-[#d9c385]/70 bg-white text-[#6f608f] hover:bg-[#f4eefb]"
                      }`}
                    >
                      {tab.title}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a98739]">
                  {activeTab.ids.length} photos
                </p>
                <h4 className="mt-2 font-serif text-3xl text-[#67558a] sm:text-4xl">
                  {activeTab.title}
                </h4>
              </div>
              <p className="max-w-xl text-sm leading-6 text-[#625a67]">
                {activeTab.description}
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {activeProductItems.map((item, index) =>
                renderGalleryCard(item, () =>
                  setLightbox({ items: activeProductItems, index }),
                ),
              )}
            </div>
          </section>

          <section className="mt-16 border-t border-[#d9c385]/50 pt-12">
            <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#a98739]">
                  Happy moments
                </p>
                <h3 className="mt-3 font-serif text-3xl text-[#67558a] sm:text-5xl">
                  Satisfied customers
                </h3>
              </div>
              <p className="max-w-xl text-base leading-7 text-[#625a67]">
                A few sweet handoff moments from customers receiving Bloomistry
                bouquets for celebrations, graduations, and thoughtful gifts.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {customerItems.map((item, index) =>
                renderGalleryCard(item, () =>
                  setLightbox({ items: customerItems, index }),
                ),
              )}
            </div>
          </section>

          <div className="mt-12 flex flex-col items-center justify-between gap-5 border-y border-[#d9c385]/50 bg-[#f4eefb] px-5 py-7 text-center sm:flex-row sm:text-left">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#a98739]">
                Like something here?
              </p>
              <p className="mt-2 font-serif text-2xl text-[#67558a] sm:text-3xl">
                Message Alaine for inquiries.
              </p>
            </div>
            <a
              href="https://www.facebook.com/alaine.galarroza"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full bg-[#77669d] px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.14em] text-white shadow-sm shadow-[#77669d]/25 transition hover:bg-[#67558a] sm:w-auto sm:tracking-[0.16em]"
            >
              Open Facebook
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#d9c385]/45 bg-[#f4eefb] px-5 py-8 text-center sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-sm text-[#625a67] sm:flex-row sm:text-left">
          <p>
            Copyright © {new Date().getFullYear()} Bloomistry. All rights
            reserved.
          </p>
          <p>
            Website developed by{" "}
            <a
              href="https://www.facebook.com/zardron.pesquera/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#67558a] underline decoration-[#d1ad51]/60 underline-offset-4 transition hover:text-[#4f416e]"
            >
              Zardron Angelo Pesquera
            </a>
          </p>
        </div>
      </footer>

      {lightbox ? (
        <div
          className="fixed inset-0 z-50 bg-[#151019]/95 px-4 py-4 text-white sm:px-6"
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen gallery viewer"
        >
          <div className="mx-auto flex h-full max-w-6xl flex-col">
            <div className="flex items-center justify-between gap-4 py-2">
              <div>
                <p className="mt-1 font-serif text-2xl">
                  {lightbox.items[lightbox.index].title}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="rounded-full bg-white/12 px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] transition hover:bg-white/20"
              >
                Close
              </button>
            </div>

            <div
              className="relative min-h-0 flex-1 touch-pan-y"
              onTouchStart={(event) =>
                setTouchStartX(event.changedTouches[0].clientX)
              }
              onTouchEnd={(event) => {
                if (touchStartX === null) {
                  return;
                }

                const deltaX = event.changedTouches[0].clientX - touchStartX;

                if (Math.abs(deltaX) > 50) {
                  moveLightbox(deltaX < 0 ? 1 : -1);
                }

                setTouchStartX(null);
              }}
            >
              <Image
                src={lightbox.items[lightbox.index].src}
                alt={lightbox.items[lightbox.index].alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            <div className="grid grid-cols-2 gap-3 py-3 sm:flex sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => moveLightbox(-1)}
                className="rounded-full bg-white/12 px-5 py-4 text-sm font-bold uppercase tracking-[0.12em] transition hover:bg-white/20"
              >
                Previous
              </button>
              <p className="hidden text-center text-sm text-white/70 sm:block">
                Swipe left or right to browse photos.
              </p>
              <button
                type="button"
                onClick={() => moveLightbox(1)}
                className="rounded-full bg-[#77669d] px-5 py-4 text-sm font-bold uppercase tracking-[0.12em] transition hover:bg-[#67558a]"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
