import { Testimonial } from "../models/testimonial.model.js";
import { BaseRepository } from "./base.repository.js";

export const testimonialRepository = new BaseRepository(Testimonial);
