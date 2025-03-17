import RegisterValidation from "./register.validation";

const LoginValidation = RegisterValidation.pick({
  email: true,
  password: true,
});

export default LoginValidation;
