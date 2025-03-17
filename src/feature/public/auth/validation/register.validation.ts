import z from "zod";

const RegisterValidation = z.object({
  firstName: z
    .string()
    .min(1, "First name is too short")
    .max(64, "First name is too long"),

  lastName: z
    .string()
    .min(1, "Last name is too short")
    .max(64, "Last name is too long"),

  email: z
    .string()
    .email("Invalid Email")
    .min(1, "Last name is too short")
    .max(64, "Last name is too long"),

  password: z
    .string()
    .min(8, "Password is too short")
    .max(16, "Password is too long"),

  toa: z.boolean(),
});

export default RegisterValidation;
