import { Category } from "../models/category.model.js";
import { BaseRepository } from "./base.repository.js";

export const categoryRepository = new BaseRepository(Category);
