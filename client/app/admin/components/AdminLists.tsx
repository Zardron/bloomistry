"use client";

import { getApiAssetUrl } from "@/src/lib/api";
import type { Category, Flower, Testimonial } from "@/src/types/api";
import type { Section } from "../adminTypes";
import {
  getFlowerCategoryName,
  getFlowerCategorySlug,
} from "../adminUtils";
import { ListRow } from "./ListRow";

export function ListHeader({
  activeSection,
  activeSectionLabel,
  activeFlowerCategory,
  categories,
  flowers,
  onCategoryChange,
}: {
  activeSection: Section;
  activeSectionLabel: string;
  activeFlowerCategory?: Category;
  categories: Category[];
  flowers: Flower[];
  onCategoryChange: (slug: string) => void;
}) {
  return (
    <div className="border-b border-[#d9c385]/45 px-4 py-4 sm:px-5">
      <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#a98739] sm:text-sm sm:tracking-[0.16em]">
          {activeSection === "flowers" && activeFlowerCategory
            ? `${activeFlowerCategory.name} flowers`
            : activeSection === "featured"
              ? "Featured flower"
              : `${activeSectionLabel} list`}
        </p>
        {activeSection === "flowers" ? (
          <div
            role="tablist"
            aria-label="Flower categories"
            className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:flex xl:flex-wrap"
          >
            {categories.map((category) => {
              const isActive = activeFlowerCategory?.slug === category.slug;
              const count = flowers.filter(
                (flower) => getFlowerCategorySlug(flower) === category.slug,
              ).length;

              return (
                <button
                  key={category._id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onCategoryChange(category.slug)}
                  className={`min-h-10 min-w-0 border px-2 py-2 text-[0.68rem] font-bold uppercase leading-tight tracking-[0.06em] transition sm:px-4 sm:text-xs sm:tracking-[0.1em] xl:shrink-0 ${
                    isActive
                      ? "border-[#77669d] bg-[#77669d] text-white"
                      : "border-[#dfd2ea] bg-white text-[#67558a] hover:bg-[#f4eefb]"
                  }`}
                >
                  {category.name} <span className="opacity-70">{count}</span>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function CategoryRows({
  categories,
  onEdit,
  onDelete,
}: {
  categories: Category[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return categories.map((category, index) => (
    <ListRow
      key={category._id}
      title={category.name}
      eyebrow={`#${index + 1}`}
      subtitle={[category.priceLabel, category.description || category.slug]
        .filter(Boolean)
        .join(" - ")}
      status={category.isActive ? "Active" : "Inactive"}
      onEdit={() => onEdit(category._id)}
      onDelete={() => onDelete(category._id)}
    />
  ));
}

export function FlowerRows({
  flowers,
  onEdit,
  onDelete,
}: {
  flowers: Flower[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return flowers.map((flower) => (
    <ListRow
      key={flower._id}
      title={flower.name}
      subtitle={getFlowerCategoryName(flower)}
      status={flower.isActive ? "Active" : "Inactive"}
      imageUrl={getApiAssetUrl(flower.image?.url)}
      imageAlt={flower.name}
      onEdit={() => onEdit(flower._id)}
      onDelete={() => onDelete(flower._id)}
    />
  ));
}

export function FeaturedRows({
  flowers,
  isLoading,
  onSetFeatured,
  onRemoveFeatured,
}: {
  flowers: Flower[];
  isLoading: boolean;
  onSetFeatured: (flower: Flower) => void;
  onRemoveFeatured: (flower: Flower) => void;
}) {
  return flowers.map((flower) => (
    <ListRow
      key={flower._id}
      title={flower.name}
      subtitle={getFlowerCategoryName(flower)}
      status={flower.isFeatured ? "Featured" : "Available"}
      imageUrl={getApiAssetUrl(flower.image?.url)}
      imageAlt={flower.name}
      primaryActionLabel={flower.isFeatured ? "Remove" : "Set featured"}
      onPrimaryAction={() =>
        flower.isFeatured ? onRemoveFeatured(flower) : onSetFeatured(flower)
      }
      primaryActionDisabled={isLoading}
    />
  ));
}

export function TestimonialRows({
  testimonials,
  onEdit,
  onDelete,
}: {
  testimonials: Testimonial[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return testimonials.map((testimonial, index) => (
    <ListRow
      key={testimonial._id}
      title={testimonial.customerName || `Customer Moment #${index + 1}`}
      subtitle={`Bloomistry smile #${String(index + 1).padStart(2, "0")}`}
      status={testimonial.isActive ? "Active" : "Inactive"}
      imageUrl={getApiAssetUrl(testimonial.image?.url)}
      imageAlt={testimonial.customerName || "Bloomistry customer"}
      onEdit={() => onEdit(testimonial._id)}
      onDelete={() => onDelete(testimonial._id)}
    />
  ));
}
