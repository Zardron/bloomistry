"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import featuredFlower from "./assets/flowers/vercel.jpeg";
import smallFlower01 from "./assets/flowers/small/d295c29b-6b00-4b2f-998d-353fbbad6a0b.jpeg";
import smallFlower02 from "./assets/flowers/small/48166219-aa68-4332-a04b-7f5450a654bd.jpeg";
import smallFlower03 from "./assets/flowers/small/6107ea80-823c-4233-816e-8235c8254d82.jpeg";
import smallFlower04 from "./assets/flowers/small/45b39846-3c3d-4f84-893e-5356e43a7806.jpeg";
import smallFlower05 from "./assets/flowers/small/81210d07-ae10-433f-a16d-776244b210aa.jpeg";
import smallFlower06 from "./assets/flowers/small/6edf65b9-35d8-4f6a-9470-dfc0319c958d.jpeg";
import smallFlower07 from "./assets/flowers/small/2d0cf1de-57d8-4a2a-b120-aaa71b4b7911.jpeg";
import smallFlower08 from "./assets/flowers/small/9f70f2f1-7472-46d0-a26c-1e6a1767a44e.jpeg";
import smallFlower09 from "./assets/flowers/small/635554028_3249230258584897_8078491129720463944_n.jpg";
import smallFlower10 from "./assets/flowers/small/633658773_3249230288584894_5845819109626465371_n.jpg";
import mediumFlower01 from "./assets/flowers/medium/bf546554-535e-49b8-9596-8dfd8f005fee.jpeg";
import mediumFlower02 from "./assets/flowers/medium/9fc1a7b2-d858-4988-a990-993689557af7.jpeg";
import mediumFlower03 from "./assets/flowers/medium/1f57afe9-c134-478c-ad37-62ae45d594f4.jpeg";
import mediumFlower04 from "./assets/flowers/medium/eaecc951-5d3e-4707-93bc-16ed8c156fc6.jpeg";
import mediumFlower05 from "./assets/flowers/medium/0d9bf6bc-b603-4d69-92f9-52c7281ad137.jpeg";
import mediumFlower06 from "./assets/flowers/medium/4113373e-09ed-40e8-9a60-790b36e30270.jpeg";
import mediumFlower07 from "./assets/flowers/medium/95ed1fd7-9543-4146-bb72-5edfa68c19c3.jpeg";
import mediumFlower08 from "./assets/flowers/medium/dc09f4b9-6b70-4197-aa84-83fba89e1e62.jpeg";
import mediumFlower09 from "./assets/flowers/medium/9a146e4a-85aa-4348-a679-a4439439c873.jpeg";
import mediumFlower10 from "./assets/flowers/medium/abeff337-6354-4e9d-ae58-c8e9976c163d.jpeg";
import mediumFlower11 from "./assets/flowers/medium/676e7630-9253-41d5-bc8e-304c38181be5.jpeg";
import mediumFlower12 from "./assets/flowers/medium/8fb53d23-2ab4-4291-ac12-1264a0808b1b.jpeg";
import mediumFlower13 from "./assets/flowers/medium/b0b06f53-b87f-46aa-9426-9e161da5570f.jpeg";
import largeFlower01 from "./assets/flowers/large/bf15da70-6c7a-43ea-a696-1ba30343c5e2 (1).jpeg";
import largeFlower02 from "./assets/flowers/large/813e3fe5-0913-4316-926a-154fb3eac4d6 (1).jpeg";
import largeFlower03 from "./assets/flowers/large/4097c56a-8e04-4b64-8d0d-a8a6c9e546bb (1).jpeg";
import largeFlower04 from "./assets/flowers/large/534da838-bcbe-4452-a5b3-8dd5890a8a3c (1).jpeg";
import xlFlower01 from "./assets/flowers/xl/aca522e0-71be-461e-92ae-9db832e6c2cd.jpeg";
import xlFlower02 from "./assets/flowers/xl/ab46e1f5-ce21-469f-8561-0429fe78c65c.jpeg";
import xlFlower03 from "./assets/flowers/xl/fcc2afec-10a6-4f83-a2a3-07b7d5a53d2f.jpeg";
import xlFlower04 from "./assets/flowers/xl/6dc3d02f-982b-49f5-a26e-35bed111b92a.jpeg";
import xlFlower05 from "./assets/flowers/xl/197d874d-3c57-4d76-aced-46ba78574dda.jpeg";
import xlFlower06 from "./assets/flowers/xl/72adcff6-75ba-4b0c-9ca0-b6ce35e4e19f.jpeg";
import xlFlower07 from "./assets/flowers/xl/76bffc3c-3d41-49c0-b1f4-1eb01adef733.jpeg";
import customFlower01 from "./assets/flowers/custom/1b8f4008-5274-4880-bed2-678731cbed1c.jpeg";
import customFlower02 from "./assets/flowers/custom/a315ac6b-827f-4209-b730-f0ae6f6599b6.jpeg";
import customFlower03 from "./assets/flowers/custom/d661edab-3c6e-4f3b-9095-dbeb1b6a081e.jpeg";
import customFlower04 from "./assets/flowers/custom/e13736cc-5aec-486f-9590-f77de499bb93.jpeg";
import customFlower05 from "./assets/flowers/custom/1e44a08a-e649-4830-ad02-4a2bbcceb158.jpeg";
import customFlower06 from "./assets/flowers/custom/23604c95-4ca9-41d6-ad92-5cc9eef89177.jpeg";
import customFlower07 from "./assets/flowers/custom/4e7d9f8c-4840-4dc1-ab8a-665447825171.jpeg";
import customFlower08 from "./assets/flowers/custom/d9494130-7250-49ec-8425-1aa9552a6ac9.jpeg";
import customFlower09 from "./assets/flowers/custom/1cdc9ed9-3606-4c00-be1a-14e1d7261b10.jpeg";
import graduationFlower01 from "./assets/flowers/graduation/4b9b9ff2-cfcb-435c-a527-7cc1658e19f2.jpeg";
import graduationFlower02 from "./assets/flowers/graduation/0f07d539-89b4-41db-9db0-53e1449f11dd.jpeg";
import graduationFlower03 from "./assets/flowers/graduation/4f0a665a-d127-4e18-adce-fc339da6b494.jpeg";
import graduationFlower04 from "./assets/flowers/graduation/29b64052-d421-4538-85e0-8eca2693788e.jpeg";
import graduationFlower05 from "./assets/flowers/graduation/ee1f7176-95a4-4132-8c24-0f89fe89a7aa.jpeg";
import graduationFlower06 from "./assets/flowers/graduation/6995be02-b174-4d15-bea4-02d1810f412d.jpeg";

type ImageSource = string | StaticImageData;

type GalleryItem = {
  key: string;
  src: ImageSource;
  alt: string;
  title: string;
  subtitle: string;
};

type LightboxState = {
  items: GalleryItem[];
  index: number;
} | null;

const smallFlowerAssets = [
  smallFlower01,
  smallFlower02,
  smallFlower03,
  smallFlower04,
  smallFlower05,
  smallFlower06,
  smallFlower07,
  smallFlower08,
  smallFlower09,
  smallFlower10,
];

const mediumFlowerAssets = [
  mediumFlower01,
  mediumFlower02,
  mediumFlower03,
  mediumFlower04,
  mediumFlower05,
  mediumFlower06,
  mediumFlower07,
  mediumFlower08,
  mediumFlower09,
  mediumFlower10,
  mediumFlower11,
  mediumFlower12,
  mediumFlower13,
];

const largeFlowerAssets = [
  largeFlower01,
  largeFlower02,
  largeFlower03,
  largeFlower04,
];

const xlFlowerAssets = [
  xlFlower01,
  xlFlower02,
  xlFlower03,
  xlFlower04,
  xlFlower05,
  xlFlower06,
  xlFlower07,
];

const customFlowerAssets = [
  customFlower01,
  customFlower02,
  customFlower03,
  customFlower04,
  customFlower05,
  customFlower06,
  customFlower07,
  customFlower08,
  customFlower09,
];

const graduationFlowerAssets = [
  graduationFlower01,
  graduationFlower02,
  graduationFlower03,
  graduationFlower04,
  graduationFlower05,
  graduationFlower06,
];

const flowerSections = [
  {
    title: "Small",
    description: "Compact bouquets and mini flower arrangements for simple gifts.",
    images: smallFlowerAssets,
  },
  {
    title: "Medium",
    description: "Balanced handheld bouquets with fuller wrapping and flower details.",
    images: mediumFlowerAssets,
  },
  {
    title: "Large",
    description: "Statement bouquets with bigger blooms, layered wrapping, and fuller presentation.",
    images: largeFlowerAssets,
  },
  {
    title: "XL",
    description: "Extra-full bouquets made for bigger, more dramatic gifting moments.",
    images: xlFlowerAssets,
  },
  {
    title: "Custom",
    description: "Reference-inspired bouquets, money bouquets, chocolate wraps, and character-themed pieces.",
    images: customFlowerAssets,
  },
  {
    title: "Graduation",
    description: "Graduation-ready bouquets for ceremonies, photos, and congratulatory gifts.",
    images: graduationFlowerAssets,
  },
];

const flowerCount = flowerSections.reduce((total, section) => total + section.images.length, 0);
const allItemsCount = flowerCount;

const productTabs = flowerSections.map((section) => ({
  ...section,
  label: `${section.title} Flower`,
}));

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
    src: featuredFlower,
    alt: "Featured sunflower bouquet with white daisies and cream gold wrapping",
    title: "Featured Sunflower Bouquet",
  };

  const activeProductItems = activeTab.images.map((src, index) => ({
    key: `${activeTab.title}-${index}`,
    src,
    alt: `${activeTab.title} fuzzy wire craft ${index + 1}`,
    title: `${activeTab.title} #${index + 1}`,
    subtitle: activeTab.label,
  }));

  const customerItems = customerIds.map((id) => ({
    key: `customer-${id}`,
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

      const nextIndex = Math.min(
        Math.max(current.index + direction, 0),
        current.items.length - 1,
      );

      return {
        ...current,
        index: nextIndex,
      };
    });
  }, []);

  useEffect(() => {
    if (
      process.env.NODE_ENV === "production" &&
      "serviceWorker" in navigator
    ) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // The site works without offline image caching if registration fails.
      });
    }
  }, []);

  useEffect(() => {
    if (!lightbox) {
      return;
    }

    const scrollY = window.scrollY;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyWidth = document.body.style.width;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

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
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.width = previousBodyWidth;
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightbox, moveLightbox]);

  const renderGalleryCard = (
    item: GalleryItem,
    onOpen: () => void,
  ) => (
    <article
      key={item.key}
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
            quality={70}
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

  const currentLightboxItem = lightbox?.items[lightbox.index];
  const isFirstLightboxItem = lightbox ? lightbox.index === 0 : false;
  const isLastLightboxItem = lightbox
    ? lightbox.index === lightbox.items.length - 1
    : false;

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
                  quality={80}
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
              Browse {allItemsCount} unique flower photos by tab: small,
              medium, large, XL, custom, and graduation.
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
                  {activeTab.images.length} photos
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

      {lightbox && currentLightboxItem ? (
        <div
          className="fixed inset-0 z-50 h-[100dvh] touch-none overflow-hidden overscroll-none bg-[#120d18]/96 px-4 py-4 text-white backdrop-blur-md sm:px-6"
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen gallery viewer"
          onTouchMove={(event) => event.preventDefault()}
        >
          <div className="mx-auto flex h-full max-w-6xl flex-col gap-3">
            <div className="flex items-center justify-between gap-4 rounded-[2rem] border border-white/10 bg-white/8 px-4 py-3 shadow-2xl shadow-black/20 sm:px-5">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d1ad51]">
                  Photo {lightbox.index + 1} of {lightbox.items.length}
                </p>
                <p className="mt-1 truncate font-serif text-2xl sm:text-3xl">
                  {currentLightboxItem.title}
                </p>
                <p className="mt-1 text-sm text-white/65">
                  {currentLightboxItem.subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="shrink-0 rounded-full bg-white/12 px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] transition hover:bg-white/20"
              >
                Close
              </button>
            </div>

            <div
              className="relative min-h-0 flex-1 touch-none overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/20"
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
                src={currentLightboxItem.src}
                alt={currentLightboxItem.alt}
                fill
                sizes="100vw"
                quality={90}
                className="p-2 object-contain sm:p-4"
                priority
              />
            </div>

            <div className="grid grid-cols-2 gap-3 rounded-[2rem] border border-white/10 bg-white/8 p-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
              <button
                type="button"
                disabled={isFirstLightboxItem}
                onClick={() => moveLightbox(-1)}
                className="rounded-full bg-white/12 px-5 py-4 text-sm font-bold uppercase tracking-[0.12em] transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-white/12"
              >
                Previous
              </button>
              <p className="hidden text-center text-sm text-white/70 sm:block">
                Swipe left or right to browse.
              </p>
              <button
                type="button"
                disabled={isLastLightboxItem}
                onClick={() => moveLightbox(1)}
                className="rounded-full bg-[#77669d] px-5 py-4 text-sm font-bold uppercase tracking-[0.12em] transition hover:bg-[#67558a] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-[#77669d]"
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
