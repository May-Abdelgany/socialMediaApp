import * as Yup from "yup";
import { getDictionary } from "../../../i18n";
import type { Locale } from "./../../../types/auth";

export const createLoginSchema = (locale: Locale) => {
  const t = getDictionary(locale);

  return Yup.object({
    email: Yup.string()
      .trim()
      .max(254, t.validation.email.max)
      .email(t.validation.email.invalid)
      .required(t.validation.email.required),

    password: Yup.string()
      .required(t.validation.password.required)
      .min(8, t.validation.password.min)
      .max(72, t.validation.password.max)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
        t.validation.password.pattern,
      ),
  });
};

export const loginSchema = createLoginSchema("en");
