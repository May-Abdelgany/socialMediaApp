import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthFooter } from '../../components/auth/AuthFooter';
import { AuthFormCard } from '../../components/auth/AuthFormCard';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { SocialAuthButtons } from '../../components/auth/SocialAuthButtons';
import { FormInput } from '../../components/forms/FormInput';
import { FormLabel } from '../../components/forms/FormLabel';
import { PasswordInput } from '../../components/forms/PasswordInput';
import { getDictionary } from '../../i18n';
import type { Locale, ThemeMode } from '../../types/auth';

type LoginPageProps = {
  locale: Locale;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onToggleLanguage: () => void;
};

export function LoginPage({ locale, theme, onToggleTheme, onToggleLanguage }: LoginPageProps) {
  const t = getDictionary(locale);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
        title={t.auth.loginTitle}
        onSubmit={handleSubmit}
      >
        <div>
          <FormLabel htmlFor="login-email">{t.auth.email}</FormLabel>
          <FormInput
            id="login-email"
            type="email"
            value={email}
            placeholder="name@example.com"
            autoComplete="email"
            onChange={setEmail}
          />
        </div>

        <div>
          <FormLabel htmlFor="login-password">{t.auth.password}</FormLabel>
          <PasswordInput
            id="login-password"
            value={password}
            placeholder={t.auth.password}
            autoComplete="current-password"
            visible={showPassword}
            onChange={setPassword}
            onToggleVisibility={() => setShowPassword((current) => !current)}
            ariaLabel={showPassword ? t.auth.hidePassword : t.auth.showPassword}
          />
        </div>

        <div className="flex items-center justify-between gap-3 text-sm">
          <label className="flex items-center gap-2 text-[var(--text-secondary)]">
            <input
              type="checkbox"
              className="h-4 w-4 cursor-pointer rounded border-[var(--border)] bg-[var(--surface-muted)] text-[var(--brand)] accent-[var(--brand)]"
            />
            {t.auth.remember}
          </label>

          <Link to="/register" className="font-medium text-[var(--brand)] hover:text-[var(--brand-strong)]">
            {t.auth.forgot}
          </Link>
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-2xl bg-[var(--button-primary-bg)] px-5 py-3.5 text-base font-semibold text-[var(--button-primary-text)] shadow-[0_18px_38px_var(--button-primary-shadow)] transition-transform hover:-translate-y-0.5 hover:bg-[var(--button-primary-hover)]"
        >
          {t.auth.loginAction}
        </button>

        <SocialAuthButtons locale={locale} />

        <AuthFooter locale={locale} isLogin />
      </AuthFormCard>
    </AuthLayout>
  );
}
