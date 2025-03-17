import LoginValidation from "./login.validation";

export const forgotPasswordValidation = LoginValidation.pick({
  email: true,
});
