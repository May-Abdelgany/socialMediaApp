import { useState } from 'react';
import { AuthFooter } from '../../components/auth/AuthFooter';
import { AuthFormCard } from '../../components/auth/AuthFormCard';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { SocialAuthButtons } from '../../components/auth/SocialAuthButtons';
import { FormInput } from '../../components/forms/FormInput';
import { FormLabel } from '../../components/forms/FormLabel';
import { FormMessage } from '../../components/forms/FormMessage';
import { PasswordInput } from '../../components/forms/PasswordInput';
import { getDictionary } from '../../i18n';
import type { Locale, ThemeMode } from '../../types/auth';

type RegisterPageProps = {
  locale: Locale;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onToggleLanguage: () => void;
};

export function RegisterPage({ locale, theme, onToggleTheme, onToggleLanguage }: RegisterPageProps) {
  const t = getDictionary(locale);
  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

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
        onSubmit={handleSubmit}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FormLabel htmlFor="register-name-ar">{t.auth.nameAr}</FormLabel>
            <FormInput
              id="register-name-ar"
              value={nameAr}
              placeholder={locale === 'ar' ? 'أحمد علي' : 'Ahmed Ali'}
              onChange={setNameAr}
            />
          </div>

          <div>
            <FormLabel htmlFor="register-name-en">{t.auth.nameEn}</FormLabel>
            <FormInput
              id="register-name-en"
              value={nameEn}
              placeholder="Ahmed Ali"
              onChange={setNameEn}
            />
          </div>
        </div>

        <div>
          <FormLabel htmlFor="register-email">{t.auth.email}</FormLabel>
          <FormInput
            id="register-email"
            type="email"
            value={email}
            placeholder="name@example.com"
            autoComplete="email"
            onChange={setEmail}
          />
        </div>

        <FormMessage variant="error">{t.auth.helper}</FormMessage>

        <div>
          <FormLabel htmlFor="register-password">{t.auth.password}</FormLabel>
          <PasswordInput
            id="register-password"
            value={password}
            placeholder={t.auth.password}
            autoComplete="new-password"
            visible={showPassword}
            onChange={setPassword}
            onToggleVisibility={() => setShowPassword((current) => !current)}
            ariaLabel={showPassword ? t.auth.hidePassword : t.auth.showPassword}
          />
        </div>

        <div>
          <FormLabel htmlFor="register-confirm-password">{t.auth.confirmPassword}</FormLabel>
          <PasswordInput
            id="register-confirm-password"
            value={confirmPassword}
            placeholder={t.auth.confirmPassword}
            autoComplete="new-password"
            visible={showConfirmPassword}
            onChange={setConfirmPassword}
            onToggleVisibility={() => setShowConfirmPassword((current) => !current)}
            ariaLabel={showConfirmPassword ? t.auth.hideConfirmPassword : t.auth.showConfirmPassword}
          />
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-2xl bg-[var(--button-primary-bg)] px-5 py-3.5 text-base font-semibold text-[var(--button-primary-text)] shadow-[0_18px_38px_var(--button-primary-shadow)] transition-transform hover:-translate-y-0.5 hover:bg-[var(--button-primary-hover)]"
        >
          {t.auth.registerAction}
        </button>

        <SocialAuthButtons locale={locale} />

        <AuthFooter locale={locale} isLogin={false} />

        <p className="text-center text-xs text-[var(--text-tertiary)]">{t.auth.legal}</p>
      </AuthFormCard>
    </AuthLayout>
  );
}
