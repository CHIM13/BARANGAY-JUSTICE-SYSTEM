import { AccountSchema } from "@/feature/shared/account/interfaces/account.interface";

export interface LoginRequestValue
  extends Pick<AccountSchema, "email" | "password"> {}

export interface LoginResponseValue {}
