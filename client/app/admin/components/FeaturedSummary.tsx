"use client";

import Image from "next/image";
import { getApiAssetUrl } from "@/src/lib/api";
import type { Flower } from "@/src/types/api";
import { getFlowerCategoryName } from "../adminUtils";

export function FeaturedSummary({
  featuredFlowers,
  onRemove,
  isLoading,
}: {
  featuredFlowers: Flower[];
  onRemove: (flower: Flower) => void;
  isLoading: boolean;
}) {
  return (
    <div className="grid gap-4">
      <h2 className="font-serif text-2xl text-[#67558a]">Featured flower</h2>
      {featuredFlowers.length > 0 ? (
        featuredFlowers.map((flower) => (
          <div key={flower._id} className="border border-[#dfd2ea] bg-[#fbf8ff] p-4">
            {flower.image?.url ? (
              <Image
                src={getApiAssetUrl(flower.image.url)}
                alt={flower.name}
                width={640}
                height={480}
                unoptimized
                className="aspect-[4/3] w-full border border-[#dfd2ea] bg-white object-cover"
              />
            ) : null}
            <p className="mt-4 font-serif text-xl leading-tight text-[#67558a] sm:text-2xl">
              {flower.name}
            </p>
            <p className="mt-1 text-sm text-[#625a67]">{getFlowerCategoryName(flower)}</p>
            <button
              type="button"
              disabled={isLoading}
              onClick={() => onRemove(flower)}
              className="mt-4 min-h-12 w-full border border-[#c7ad58] bg-white px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[#6f608f] transition hover:bg-[#fffdf7] disabled:opacity-60"
            >
              Remove featured
            </button>
          </div>
        ))
      ) : (
        <div className="border border-[#dfd2ea] bg-[#fbf8ff] p-4 text-sm font-semibold text-[#625a67]">
          No featured flower selected.
        </div>
      )}
    </div>
  );
}
