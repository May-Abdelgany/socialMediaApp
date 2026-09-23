import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthFooter } from '../../../components/auth/AuthFooter';
import { AuthFormCard } from '../../../components/auth/AuthFormCard';
import { AuthLayout } from '../../../components/auth/AuthLayout';
import { SocialAuthButtons } from '../../../components/auth/SocialAuthButtons';
import { FormInput } from '../../../components/forms/FormInput';
import { FormLabel } from '../../../components/forms/FormLabel';
import { FormMessage } from '../../../components/forms/FormMessage';
import { PasswordInput } from '../../../components/forms/PasswordInput';
import { getDictionary } from '../../../i18n';
import type { Locale, ThemeMode } from '../../../types/auth';
import { useFormik } from 'formik';
import type { RegisterRequest } from '../interfaces/registerRequest';
import { registerSchema } from '../validation/register.schema';
import { register } from '../apis/auth.api';
import getApiErrorMessage from '../../../shared/error/apiErrorMessage';

type RegisterPageProps = {
  locale: Locale;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onToggleLanguage: () => void;
};

export function RegisterPage({ locale, theme, onToggleTheme, onToggleLanguage }: RegisterPageProps) {
  const t = getDictionary(locale);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik<RegisterRequest & { confirmPassword: string }>({
    initialValues: {
      nameAr: '',
      nameEn: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await register({
          nameAr: values.nameAr.trim(),
          nameEn: values.nameEn.trim(),
          email: values.email.trim(),
          password: values.password,
          confirmPassword: values.confirmPassword,
        });
        toast.success(t.auth.registerSuccess);
        setTimeout(() => {
          navigate('/login');
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
    !formik.values.nameAr.trim() ||
    !formik.values.nameEn.trim() ||
    !formik.values.email.trim() ||
    !formik.values.password ||
    !formik.values.confirmPassword;

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
        title={t.auth.registerTitle}
        onSubmit={formik.handleSubmit}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FormLabel htmlFor="register-name-ar">{t.auth.nameAr}</FormLabel>
            <FormInput
              id="register-name-ar"
              name="nameAr"
              value={formik.values.nameAr}
              placeholder={locale === 'ar' ? 'أحمد علي' : 'Ahmed Ali'}
              onChange={(value) => formik.setFieldValue('nameAr', value)}
              onBlur={formik.handleBlur}
            />
            {formik.touched.nameAr && formik.errors.nameAr ? (
              <FormMessage variant="error">{formik.errors.nameAr}</FormMessage>
            ) : null}
          </div>

          <div>
            <FormLabel htmlFor="register-name-en">{t.auth.nameEn}</FormLabel>
            <FormInput
              id="register-name-en"
              name="nameEn"
              value={formik.values.nameEn}
              placeholder="Ahmed Ali"
              onChange={(value) => formik.setFieldValue('nameEn', value)}
              onBlur={formik.handleBlur}
            />
            {formik.touched.nameEn && formik.errors.nameEn ? (
              <FormMessage variant="error">{formik.errors.nameEn}</FormMessage>
            ) : null}
          </div>
        </div>

        <div>
          <FormLabel htmlFor="register-email">{t.auth.email}</FormLabel>
          <FormInput
            id="register-email"
            name="email"
            type="email"
            value={formik.values.email}
            placeholder="name@example.com"
            autoComplete="email"
            onChange={(value) => formik.setFieldValue('email', value)}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <FormMessage variant="error">{formik.errors.email}</FormMessage>
          ) : null}
        </div>


        <div>
          <FormLabel htmlFor="register-password">{t.auth.password}</FormLabel>
          <PasswordInput
            id="register-password"
            name="password"
            locale={locale}
            value={formik.values.password}
            placeholder={t.auth.password}
            autoComplete="new-password"
            visible={showPassword}
            onChange={(value) => formik.setFieldValue('password', value)}
            onBlur={formik.handleBlur}
            onToggleVisibility={() => setShowPassword((current) => !current)}
            ariaLabel={showPassword ? t.auth.hidePassword : t.auth.showPassword}
          />
          {formik.touched.password && formik.errors.password ? (
            <FormMessage variant="error">{formik.errors.password}</FormMessage>
          ) : null}
        </div>

        <div>
          <FormLabel htmlFor="register-confirm-password">{t.auth.confirmPassword}</FormLabel>
          <PasswordInput
            id="register-confirm-password"
            name="confirmPassword"
            locale={locale}
            value={formik.values.confirmPassword}
            placeholder={t.auth.confirmPassword}
            autoComplete="new-password"
            visible={showConfirmPassword}
            onChange={(value) => formik.setFieldValue('confirmPassword', value)}
            onBlur={formik.handleBlur}
            onToggleVisibility={() => setShowConfirmPassword((current) => !current)}
            ariaLabel={showConfirmPassword ? t.auth.hideConfirmPassword : t.auth.showConfirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <FormMessage variant="error">{formik.errors.confirmPassword}</FormMessage>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isSubmitDisabled}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--button-primary-bg)] px-5 py-3.5 text-base font-semibold text-[var(--button-primary-text)] shadow-[0_18px_38px_var(--button-primary-shadow)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--button-primary-hover)] cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {formik.isSubmitting ? (
            <>
              <img
                src={theme === 'dark' ? '/spinner1.svg' : '/spinner2.svg'}
                className="h-4 w-4"
                alt="spinner"
              />
              <span>Loading...</span>
            </>
          ) : (
            t.auth.registerAction
          )}
        </button>

        <SocialAuthButtons locale={locale} />

        <AuthFooter locale={locale} isLogin={false} />

        <p className="text-center text-xs text-[var(--text-tertiary)]">{t.auth.legal}</p>
      </AuthFormCard>
    </AuthLayout>
  );
}
