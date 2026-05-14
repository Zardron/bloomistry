import { categoryRepository } from "../repositories/category.repository.js";
import { ApiError } from "../utils/ApiError.js";
import { buildPaginationMeta, getPagination } from "../utils/pagination.js";
import { slugify } from "../utils/slugify.js";

function buildFilter(query) {
  const filter = {};

  if (query.status === "active") filter.isActive = true;
  if (query.status === "inactive") filter.isActive = false;
  if (query.search) filter.$text = { $search: query.search };

  return filter;
}

export const categoryService = {
  async list(query) {
    const { page, limit, skip } = getPagination(query);
    const filter = buildFilter(query);
    const [items, total] = await Promise.all([
      categoryRepository
        .find(filter)
        .sort({ sortOrder: 1, name: 1 })
        .skip(skip)
        .limit(limit),
      categoryRepository.count(filter),
    ]);

    return { items, meta: buildPaginationMeta({ page, limit, total }) };
  },

  async create(payload) {
    return categoryRepository.create({
      ...payload,
      slug: payload.slug || slugify(payload.name),
    });
  },

  async update(id, payload) {
    const update = {
      ...payload,
      ...(payload.name && !payload.slug ? { slug: slugify(payload.name) } : {}),
    };
    const category = await categoryRepository.updateById(id, update);

    if (!category) {
      throw new ApiError(404, "Category not found");
    }

    return category;
  },

  async remove(id) {
    const category = await categoryRepository.deleteById(id);

    if (!category) {
      throw new ApiError(404, "Category not found");
    }

    return category;
  },
};
