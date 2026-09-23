import * as Yup from "yup";
import { getDictionary } from "../../../i18n";
import type { Locale } from "../../../types/auth";

export const createRegisterSchema = (locale: Locale) => {
  const t = getDictionary(locale);

  return Yup.object({
    nameAr: Yup.string()
      .trim()
      .required(t.validation.nameAr.required)
      .min(2, t.validation.nameAr.min)
      .max(50, t.validation.nameAr.max),
    nameEn: Yup.string()
      .trim()
      .required(t.validation.nameEn.required)
      .min(2, t.validation.nameEn.min)
      .max(50, t.validation.nameEn.max),
    email: Yup.string()
      .trim()
      .required(t.validation.email.required)
      .email(t.validation.email.invalid)
      .max(254, t.validation.email.max),
    password: Yup.string()
      .required(t.validation.password.required)
      .min(8, t.validation.password.min)
      .max(72, t.validation.password.max)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
        t.validation.password.pattern,
      ),
    confirmPassword: Yup.string()
      .required(t.validation.confirmPassword.required)
      .oneOf([Yup.ref("password")], t.validation.confirmPassword.mismatch),
  });
};

export const registerSchema = createRegisterSchema("en");
