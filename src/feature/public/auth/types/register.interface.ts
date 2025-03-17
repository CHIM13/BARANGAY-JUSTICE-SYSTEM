import { AccountSchema } from "@/feature/shared/account/interfaces/account.interface";

export interface IRegisterValue extends AccountSchema {
  toa: boolean;
}
