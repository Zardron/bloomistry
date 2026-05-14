import { flowerRepository } from "../repositories/flower.repository.js";
import { ApiError } from "../utils/ApiError.js";
import { buildPaginationMeta, getPagination } from "../utils/pagination.js";
import { slugify } from "../utils/slugify.js";

function buildFilter(query) {
  const filter = {};

  if (query.category) filter.category = query.category;
  if (query.featured !== undefined) filter.isFeatured = query.featured === "true";
  if (query.status === "active") filter.isActive = true;
  if (query.status === "inactive") filter.isActive = false;
  if (query.minPrice) filter.price = { ...filter.price, $gte: Number(query.minPrice) };
  if (query.maxPrice) filter.price = { ...filter.price, $lte: Number(query.maxPrice) };
  if (query.search) filter.$text = { $search: query.search };

  return filter;
}

function buildImage(file) {
  if (!file) return undefined;

  return {
    url: `/uploads/${file.filename}`,
    filename: file.filename,
  };
}

export const flowerService = {
  async list(query) {
    const { page, limit, skip } = getPagination(query);
    const filter = buildFilter(query);
    const sort = query.sort === "price" ? { price: 1 } : { createdAt: -1 };
    const [items, total] = await Promise.all([
      flowerRepository
        .find(filter)
        .populate("category", "name slug")
        .sort(sort)
        .skip(skip)
        .limit(limit),
      flowerRepository.count(filter),
    ]);

    return { items, meta: buildPaginationMeta({ page, limit, total }) };
  },

  async getById(id) {
    const flower = await flowerRepository.findById(id).populate("category", "name slug");
    if (!flower) {
      throw new ApiError(404, "Flower not found");
    }

    return flower;
  },

  async create(payload, file) {
    return flowerRepository.create({
      ...payload,
      slug: payload.slug || slugify(payload.name),
      tags: payload.tags ?? [],
      ...(buildImage(file) ? { image: buildImage(file) } : {}),
    });
  },

  async update(id, payload, file) {
    const update = {
      ...payload,
      ...(payload.name && !payload.slug ? { slug: slugify(payload.name) } : {}),
      ...(buildImage(file) ? { image: buildImage(file) } : {}),
    };
    const flower = await flowerRepository.updateById(id, update);

    if (!flower) {
      throw new ApiError(404, "Flower not found");
    }

    return flower;
  },

  async remove(id) {
    const flower = await flowerRepository.deleteById(id);

    if (!flower) {
      throw new ApiError(404, "Flower not found");
    }

    return flower;
  },
};
