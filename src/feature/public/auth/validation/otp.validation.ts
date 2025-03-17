import { z } from "zod";

export const otpAccountValidation = z.object({
  otp: z.string().min(6, { message: "OTP is required" }),
});
