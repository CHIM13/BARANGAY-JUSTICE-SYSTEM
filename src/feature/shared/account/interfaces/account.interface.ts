export interface AccountSchema {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

export type Account = {
  _id?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  password: string;
  status?: string;
  role: string;
  refreshToken?: string;
  isDeleted?: boolean;
  deletedAt?: Date;
};

export type Profile = Pick<
  Account,
  "firstName" | "middleName" | "lastName" | "email"
>;

export type InitialAccount = Pick<Account, "_id" | "role">;
