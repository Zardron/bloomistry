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
                  500+
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
              Each bouquet has its own mix of petals, curls, ribbons, and soft
              wrapping, photographed as a keepsake of the craft.
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
                500+
              </p>
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
                className={`group bg-white shadow-sm ring-1 ring-[#dfd2ea] ${
                  index === 0 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="bg-white p-3">
                  <div className="relative aspect-[4/5] overflow-hidden bg-white sm:aspect-[3/4]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.035]"
                  />
                  </div>
                </div>
                <div className="flex items-end justify-between gap-4 border-t border-[#d9c385]/45 bg-white p-4">
                  <div>
                    <h3 className="font-serif text-xl text-[#67558a] sm:text-2xl">
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
    </main>
  );
}
