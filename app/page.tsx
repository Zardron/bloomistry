import Image from "next/image";

const gallery = [
  {
    src: "/gallery/sunflower-gold.jpeg",
    alt: "Sunflower bouquet with small white daisies and gold wrapping",
    title: "Golden Sunflower",
    palette: "Sunflower, cream, moss",
    featured: true,
  },
  {
    src: "/gallery/pink-tulips.jpeg",
    alt: "Pink fuzzy wire tulip bouquet with rose accents",
    title: "Pink Tulip Garden",
    palette: "Petal pink, olive, soft gold",
  },
  {
    src: "/gallery/lavender-daisies.jpeg",
    alt: "Purple and pink daisy bouquet wrapped with a lavender ribbon",
    title: "Lavender Daisy Wrap",
    palette: "Lilac, blush, leafy green",
  },
  {
    src: "/gallery/pink-bouquet-chair.jpeg",
    alt: "Bright pink bouquet displayed on a white chair",
    title: "Blush Celebration",
    palette: "Rose, pearl, champagne",
  },
  {
    src: "/gallery/sunflower-sage-wrap.jpeg",
    alt: "Sunflower bouquet with sage wrapping and white daisy details",
    title: "Sage Sunflower",
    palette: "Sage, amber, ivory",
  },
  {
    src: "/gallery/sunflower-pink-wrap.jpeg",
    alt: "Sunflower bouquet with pink ribbon and cream wrapping",
    title: "Ribboned Sunshine",
    palette: "Pink, honey, deep green",
  },
  {
    src: "/gallery/sunflower-lime.jpeg",
    alt: "Large orange sunflower bouquet with lime green accents",
    title: "Lime Glow",
    palette: "Orange, lime, burlap",
  },
  {
    src: "/gallery/sunflower-sage-table.jpeg",
    alt: "Sunflower bouquet arranged with sage paper on a wooden table",
    title: "Handmade Harvest",
    palette: "Marigold, sage, wood",
  },
  {
    src: "/gallery/sunflower-cream.jpeg",
    alt: "Sunflower bouquet with cream fan wrapping and small daisies",
    title: "Cream Fan Bouquet",
    palette: "Cream, gold, leaf",
  },
  {
    src: "/gallery/sunflower-warm.jpeg",
    alt: "Warm sunflower bouquet with cream wrap and green curls",
    title: "Warm Glow",
    palette: "Tangerine, cream, fern",
  },
];

export default function Home() {
  const featured = gallery.find((item) => item.featured) ?? gallery[0];

  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf8ff] text-[#332b3d]">
      <section className="relative isolate border-b border-[#d9c385]/45 bg-[#f4eefb]">
        <div className="absolute inset-x-0 top-0 h-28 bg-[#fdf8e8]" />
        <div className="relative mx-auto grid min-h-screen w-full max-w-7xl gap-10 px-5 py-6 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-10">
          <header className="flex items-center justify-between gap-4 lg:absolute lg:left-10 lg:right-10 lg:top-6">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.jpeg"
                alt="Bloomistry Alaine's Craft logo"
                width={82}
                height={82}
                priority
                className="h-16 w-16 rounded-full border border-[#d1ad51] bg-white object-cover shadow-sm"
              />
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.28em] text-[#a98739]">
                  Alaine&apos;s Craft
                </p>
                <p className="font-serif text-2xl text-[#77669d]">
                  Bloomistry
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="#gallery"
                className="rounded-full border border-[#c7ad58] bg-white/70 px-5 py-3 text-sm font-semibold text-[#6f608f] shadow-sm transition hover:bg-white"
              >
                View Gallery
              </a>
              <a
                href="https://www.facebook.com/alaine.galarroza"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#77669d] px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-[#77669d]/25 transition hover:bg-[#67558a]"
              >
                Inquire
              </a>
            </div>
          </header>

          <div className="pt-8 lg:pt-24">
            <div className="mb-7 inline-flex items-center gap-3 border-y border-[#d9c385]/60 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#9a8037]">
              Fuzzy wire flower bouquets
            </div>
            <h1 className="max-w-2xl font-serif text-5xl leading-[1.02] text-[#67558a] sm:text-7xl lg:text-8xl">
              Handmade blooms that stay bright.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#5d5364]">
              A simple showcase of Alaine&apos;s soft, sculpted flower pieces,
              shaped from fuzzy wires and wrapped with a gentle Bloomistry touch.
            </p>
            <a
              href="https://www.facebook.com/alaine.galarroza"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-full bg-[#d1ad51] px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-lg shadow-[#d1ad51]/25 transition hover:bg-[#b8953d]"
            >
              For inquiries
            </a>
            <div className="mt-8 grid max-w-xl grid-cols-3 border-y border-[#d9c385]/55 text-center">
              <div className="py-4">
                <p className="font-serif text-3xl text-[#77669d]">50+</p>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a98739]">
                  Starts at
                </p>
              </div>
              <div className="border-x border-[#d9c385]/55 py-4">
                <p className="font-serif text-3xl text-[#77669d]">500</p>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a98739]">
                  Range up to
                </p>
              </div>
              <div className="py-4">
                <p className="font-serif text-3xl text-[#77669d]">500+</p>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a98739]">
                  Custom
                </p>
              </div>
            </div>
          </div>

          <div className="pb-8 pt-0 lg:pt-24">
            <div className="relative mx-auto max-w-[620px]">
              <div className="absolute -left-4 top-10 h-[78%] w-[70%] border border-[#d1ad51]/60 bg-[#efe7f8]" />
              <Image
                src={featured.src}
                alt={featured.alt}
                width={1536}
                height={2048}
                priority
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="relative aspect-[4/5] w-full rounded-t-full border border-[#d1ad51]/65 bg-white object-cover shadow-2xl shadow-[#77669d]/20"
              />
              <div className="relative -mt-16 ml-auto w-[82%] bg-white/90 p-5 shadow-xl shadow-[#77669d]/10 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a98739]">
                  Featured bouquet
                </p>
                <p className="mt-2 font-serif text-3xl text-[#67558a]">
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
              <h2 className="mt-3 font-serif text-4xl text-[#67558a] sm:text-5xl">
                Fuzzy wire florals
              </h2>
            </div>
            <p className="max-w-lg text-base leading-7 text-[#625a67]">
              Each bouquet has its own mix of petals, curls, ribbons, and soft
              wrapping, photographed as a keepsake of the craft.
            </p>
          </div>

          <div className="mb-10 grid gap-5 md:grid-cols-3">
            <div className="border border-[#d9c385]/55 bg-[#fbf8ff] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#a98739]">
                Starting price
              </p>
              <p className="mt-3 font-serif text-5xl text-[#67558a]">50</p>
              <p className="mt-3 text-sm leading-6 text-[#625a67]">
                Simple handmade fuzzy wire flower pieces begin at 50.
              </p>
            </div>
            <div className="border border-[#d9c385]/55 bg-[#f4eefb] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#a98739]">
                Bouquet range
              </p>
              <p className="mt-3 font-serif text-5xl text-[#67558a]">
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
              <p className="mt-3 font-serif text-5xl text-[#67558a]">500+</p>
              <p className="mt-3 text-sm leading-6 text-[#625a67]">
                Photo-reference or design-following bouquets may cost 500+,
                depending on complexity.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((item, index) => (
              <article
                key={item.src}
                className={`group bg-[#fbf8ff] shadow-sm ring-1 ring-[#dfd2ea] ${
                  index === 0 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.035]"
                  />
                </div>
                <div className="flex items-end justify-between gap-4 border-t border-[#d9c385]/45 bg-white p-4">
                  <div>
                    <h3 className="font-serif text-2xl text-[#67558a]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-[#766b7d]">{item.palette}</p>
                  </div>
                  <span className="h-3 w-3 rounded-full bg-[#d1ad51]" />
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-5 border-y border-[#d9c385]/50 bg-[#f4eefb] px-5 py-7 text-center sm:flex-row sm:text-left">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#a98739]">
                Like something here?
              </p>
              <p className="mt-2 font-serif text-3xl text-[#67558a]">
                Message Alaine for inquiries.
              </p>
            </div>
            <a
              href="https://www.facebook.com/alaine.galarroza"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#77669d] px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-sm shadow-[#77669d]/25 transition hover:bg-[#67558a]"
            >
              Open Facebook
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
