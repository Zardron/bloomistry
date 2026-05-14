import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { userRepository } from "../repositories/user.repository.js";
import { ApiError } from "../utils/ApiError.js";

function signToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      role: user.role,
    },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN },
  );
}

export const authService = {
  async login({ email, password }) {
    const user = await userRepository.model.findOne({ email }).select("+password");

    if (!user || !user.isActive) {
      throw new ApiError(401, "Invalid email or password");
    }

    const passwordMatches = await user.comparePassword(password);
    if (!passwordMatches) {
      throw new ApiError(401, "Invalid email or password");
    }

    const token = signToken(user);
    const safeUser = user.toObject();
    delete safeUser.password;

    return { token, user: safeUser };
  },
};
