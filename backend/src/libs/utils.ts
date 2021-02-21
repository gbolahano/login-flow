import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { promisify } from "util";
import getEnv from "../config/getEnv";

export const generateToken = (data: any) => {
  return jwt.sign(data, getEnv("JWT_SECRET", "secret"), {
    expiresIn: "24h",
  });
};

export const comparePassword = (password: string, hashedPassword: string): boolean => {
  return bcrypt.compareSync(password, hashedPassword);
};

export const decryptToken = (token: string) => {
  const userData = jwt.verify(token, getEnv("JWT_SECRET", "secret"));
  return userData;
};

export const generateResetToken = async () => {
  const randomBytesPromisyfied = promisify(randomBytes);
  const resetToken = (await randomBytesPromisyfied(20)).toString("hex");
  return resetToken;
}

