import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthFooter } from "../../../components/auth/AuthFooter";
import { AuthFormCard } from "../../../components/auth/AuthFormCard";
import { AuthLayout } from "../../../components/auth/AuthLayout";
import { SocialAuthButtons } from "../../../components/auth/SocialAuthButtons";
import { FormInput } from "../../../components/forms/FormInput";
import { FormLabel } from "../../../components/forms/FormLabel";
import { FormMessage } from "../../../components/forms/FormMessage";
import { PasswordInput } from "../../../components/forms/PasswordInput";
import { getDictionary } from "../../../i18n";
import type { Locale, ThemeMode } from "../../../types/auth";
import { useFormik } from "formik";
import type { LoginRequest } from "../interfaces/loginRequest";
import { loginSchema } from "../validation/login.schema";
import { login } from "../apis/auth.api";
import getApiErrorMessage from "../../../shared/error/apiErrorMessage";
import type { LoginResponseData } from "../interfaces/loginResponse";
import type { GeneralResponse } from "../../../shared/interfaces/generalResponse";
import { useAppDispatch } from "../user/hooks";
import { setUser } from "../user/userSlice";

type LoginPageProps = {
  locale: Locale;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onToggleLanguage: () => void;
};

export function LoginPage({
  locale,
  theme,
  onToggleTheme,
  onToggleLanguage,
}: LoginPageProps) {
  const t = getDictionary(locale);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [rememberMe, setRememberMe] = useState(false);
  const formik = useFormik<LoginRequest>({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: loginSchema,

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response: GeneralResponse<LoginResponseData> = await login({
          email: values.email.trim(),
          password: values.password,
        });
        toast.success(t.auth.loginSuccess);
        if (rememberMe) {
          localStorage.setItem("userData", JSON.stringify(response.data.user));
        } else {
          sessionStorage.setItem("userData", JSON.stringify(response.data.user));
        }
        dispatch(setUser(response.data.user));
        setTimeout(() => {
          navigate("/home");
        }, 4000);
      } catch (error: any) {
        const messages = getApiErrorMessage(error, locale);
        messages.forEach((message) => toast.error(message));
      } finally {
        setSubmitting(false);
      }
    },
  });

  const isSubmitDisabled =
    formik.isSubmitting ||
    !formik.isValid ||
    !formik.dirty ||
    !formik.values.email.trim() ||
    !formik.values.password;

  return (
    <AuthLayout
      locale={locale}
      theme={theme}
      onToggleLanguage={onToggleLanguage}
      onToggleTheme={onToggleTheme}
    >
      <AuthFormCard
        locale={locale}
        eyebrow={t.auth.welcome}
        title={t.auth.loginTitle}
        onSubmit={formik.handleSubmit}
      >
        <div>
          <FormLabel htmlFor="login-email">{t.auth.email}</FormLabel>
          <FormInput
            id="login-email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={(value) => formik.setFieldValue("email", value)}
            onBlur={formik.handleBlur}
            placeholder="name@example.com"
            autoComplete="email"
          />
          {formik.touched.email && formik.errors.email ? (
            <FormMessage variant="error">
              {locale === "ar"
                ? t.validation.email.invalid
                : t.validation.email.invalid}
            </FormMessage>
          ) : null}
        </div>

        <div>
          <FormLabel htmlFor="login-password">{t.auth.password}</FormLabel>
          <PasswordInput
            id="login-password"
            name="password"
            locale={locale}
            placeholder={t.auth.password}
            autoComplete="current-password"
            visible={showPassword}
            value={formik.values.password}
            onChange={(value) => formik.setFieldValue("password", value)}
            onBlur={formik.handleBlur}
            onToggleVisibility={() => setShowPassword((current) => !current)}
            ariaLabel={showPassword ? t.auth.hidePassword : t.auth.showPassword}
          />
          {formik.touched.password && formik.errors.password ? (
            <FormMessage variant="error">
              {locale === "ar"
                ? t.validation.password.required
                : t.validation.password.required}
            </FormMessage>
          ) : null}
        </div>

        <div className="flex items-center justify-between gap-3 text-sm">
          <label className="flex items-center gap-2 text-[var(--text-secondary)]">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 cursor-pointer rounded border-[var(--border)] bg-[var(--surface-muted)] text-[var(--brand)] accent-[var(--brand)]"
            />
            {t.auth.remember}
          </label>

          <Link
            to="/register"
            className="font-medium text-[var(--brand)] hover:text-[var(--brand-strong)]"
          >
            {t.auth.forgot}
          </Link>
        </div>

        <button
          type="submit"
          disabled={isSubmitDisabled}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--button-primary-bg)] px-5 py-3.5 text-base font-semibold text-[var(--button-primary-text)] shadow-[0_18px_38px_var(--button-primary-shadow)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--button-primary-hover)] cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {formik.isSubmitting ? (
            <>
              <img
                src={theme === "dark" ? "/spinner1.svg" : "/spinner2.svg"}
                className="h-4 w-4"
                alt="spinner"
              />
              <span>Loading...</span>
            </>
          ) : (
            t.auth.loginAction
          )}
        </button>

        <SocialAuthButtons locale={locale} />

        <AuthFooter locale={locale} isLogin />
      </AuthFormCard>
    </AuthLayout>
  );
}
