import { testimonialRepository } from "../repositories/testimonial.repository.js";
import { ApiError } from "../utils/ApiError.js";
import { buildPaginationMeta, getPagination } from "../utils/pagination.js";

function buildFilter(query) {
  const filter = {};

  if (query.status === "active") filter.isActive = true;
  if (query.status === "inactive") filter.isActive = false;
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

export const testimonialService = {
  async list(query) {
    const { page, limit, skip } = getPagination(query);
    const filter = buildFilter(query);
    const [items, total] = await Promise.all([
      testimonialRepository.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      testimonialRepository.count(filter),
    ]);

    return { items, meta: buildPaginationMeta({ page, limit, total }) };
  },

  async create(payload, file) {
    return testimonialRepository.create({
      ...payload,
      ...(buildImage(file) ? { image: buildImage(file) } : {}),
    });
  },

  async update(id, payload, file) {
    const testimonial = await testimonialRepository.updateById(id, {
      ...payload,
      ...(buildImage(file) ? { image: buildImage(file) } : {}),
    });

    if (!testimonial) {
      throw new ApiError(404, "Testimonial not found");
    }

    return testimonial;
  },

  async remove(id) {
    const testimonial = await testimonialRepository.deleteById(id);

    if (!testimonial) {
      throw new ApiError(404, "Testimonial not found");
    }

    return testimonial;
  },
};
