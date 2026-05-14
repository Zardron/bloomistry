"use client";

import Image from "next/image";
import type { FormEvent } from "react";
import { getApiAssetUrl } from "@/src/lib/api";
import type { Category, Flower, Testimonial } from "@/src/types/api";
import { Checkbox, FileInput, FormActions, TextArea, TextInput } from "./FormControls";

export function CategoryForm({
  category,
  onCancel,
  onSubmit,
  isLoading,
}: {
  category?: Category;
  onCancel: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}) {
  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <h2 className="font-serif text-2xl text-[#67558a]">
        {category ? "Edit category" : "Add category"}
      </h2>
      <TextInput name="name" label="Name" defaultValue={category?.name} required />
      <TextArea name="description" label="Description" defaultValue={category?.description} />
      <TextInput
        name="priceLabel"
        label="Price label"
        placeholder="PHP 120 - PHP 300"
        defaultValue={category?.priceLabel}
      />
      <TextInput
        name="sortOrder"
        label="Sort order"
        type="number"
        defaultValue={category?.sortOrder ?? 0}
      />
      <Checkbox name="isActive" label="Visible on site" defaultChecked={category?.isActive ?? true} />
      <FormActions isLoading={isLoading} isEditing={Boolean(category)} onCancel={onCancel} />
    </form>
  );
}

export function FlowerForm({
  categories,
  flower,
  onCancel,
  onSubmit,
  isLoading,
}: {
  categories: Category[];
  flower?: Flower;
  onCancel: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}) {
  const selectedCategory = typeof flower?.category === "object" ? flower.category._id : flower?.category;
  const currentImageUrl = getApiAssetUrl(flower?.image?.url);

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <h2 className="font-serif text-2xl text-[#67558a]">
        {flower ? "Edit flower" : "Add flower"}
      </h2>
      {currentImageUrl ? (
        <div>
          <p className="mb-2 text-sm font-semibold text-[#5d5364]">Current image</p>
          <Image
            src={currentImageUrl}
            alt={flower?.name ?? "Current flower"}
            width={640}
            height={480}
            unoptimized
            className="aspect-[4/3] w-full border border-[#dfd2ea] bg-[#fbf8ff] object-cover"
          />
        </div>
      ) : null}
      <TextInput name="name" label="Name" defaultValue={flower?.name} required />
      <TextArea name="description" label="Description" defaultValue={flower?.description} />
      <input type="hidden" name="price" value={flower?.price ?? 0} />
      <label className="block text-sm font-semibold text-[#5d5364]">
        Category
        <select
          name="category"
          required
          defaultValue={selectedCategory ?? ""}
          className="mt-2 w-full border border-[#dfd2ea] bg-white px-4 py-3 outline-none focus:border-[#77669d]"
        >
          <option value="">Select category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <TextInput name="tags" label="Tags" placeholder="custom, sunflower, graduation" />
      <FileInput />
      <Checkbox name="isFeatured" label="Featured" defaultChecked={flower?.isFeatured ?? false} />
      <Checkbox name="isActive" label="Visible on site" defaultChecked={flower?.isActive ?? true} />
      <FormActions isLoading={isLoading} isEditing={Boolean(flower)} onCancel={onCancel} />
    </form>
  );
}

export function TestimonialForm({
  testimonial,
  onCancel,
  onSubmit,
  isLoading,
}: {
  testimonial?: Testimonial;
  onCancel: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}) {
  const currentImageUrl = getApiAssetUrl(testimonial?.image?.url);

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <h2 className="font-serif text-2xl text-[#67558a]">
        {testimonial ? "Edit customer photo" : "Add customer photo"}
      </h2>
      {currentImageUrl ? (
        <div>
          <p className="mb-2 text-sm font-semibold text-[#5d5364]">Current photo</p>
          <Image
            src={currentImageUrl}
            alt={testimonial?.customerName ?? "Customer photo"}
            width={640}
            height={480}
            unoptimized
            className="aspect-[4/3] w-full border border-[#dfd2ea] bg-[#fbf8ff] object-cover"
          />
        </div>
      ) : null}
      <FileInput required={!testimonial} />
      <Checkbox
        name="isActive"
        label="Visible on site"
        defaultChecked={testimonial?.isActive ?? true}
      />
      <FormActions isLoading={isLoading} isEditing={Boolean(testimonial)} onCancel={onCancel} />
    </form>
  );
}
