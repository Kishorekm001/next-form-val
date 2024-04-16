import * as yup from "yup";

export const formSchema = yup.object({
  name: yup.string().min(5).max(20).required(),

  dob: yup
    .date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future")
    .min(new Date(1970, 0, 1), "Date of birth cannot be before 1900"),

  email: yup.string().email().required(),

  number: yup
    .string()
    .matches(
      /^[6-9]\d{9}$/,
      "Phone Number must start with 6, 7, 8, or 9 and have 10 digits"
    )
    .required("Phone number is required"),

  password: yup
    .string()
    .required("Password is required")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .min(8, "Password must be at least 8 characters long"),

  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Confirm Password not matched."),

  interests: yup
    .mixed()
    .test("interests", "Please select at least one interest.", (data) => {
      const isValid = data?.length >= 1;
      return isValid;
    }),
});
