import { User } from "../models/user.model.js";
import { BaseRepository } from "./base.repository.js";

export const userRepository = new BaseRepository(User);
