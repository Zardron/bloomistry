import { Flower } from "../models/flower.model.js";
import { BaseRepository } from "./base.repository.js";

export const flowerRepository = new BaseRepository(Flower);
