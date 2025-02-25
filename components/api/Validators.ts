import * as yup from "yup";

export const signUpValidation = yup.object({
  email: yup
    .string()
    .trim("Name is missing")
    .email("Invalid email")
    .required("email is required"),
  password: yup
    .string()
    .trim("password is missing")
    .min(8, "password is too short")

    .required("password is required"),
});
