import type { ReactNode } from "react";
import type { Locale, ThemeMode } from "../../types/auth";
import { getDictionary } from "../../i18n";
import { AuthBranding } from "./AuthBranding";
import { AuthHeader } from "./AuthHeader";

type AuthLayoutProps = {
  locale: Locale;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onToggleLanguage: () => void;
  children: ReactNode;
};

export function AuthLayout({
  locale,
  theme,
  onToggleTheme,
  onToggleLanguage,
  children,
}: AuthLayoutProps) {
  const t = getDictionary(locale);

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.16),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_33%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="w-full overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)] shadow-[0_24px_80px_rgba(10,14,23,0.12)] backdrop-blur-xl dark:shadow-[0_24px_80px_rgba(2,6,23,0.5)]">
          <header className="flex  items-center justify-between border-b border-(--border) px-4 py-3 sm:px-6 lg:hidden">
            <AuthHeader
              locale={locale}
              theme={theme}
              className="w-full"
              onToggleLanguage={onToggleLanguage}
              onToggleTheme={onToggleTheme}
              themeLightLabel={t.nav.themeLight}
              themeDarkLabel={t.nav.themeDark}
            />
          </header>

          <div className="grid  lg:grid-cols-[1.15fr_0.85fr]">
            <AuthBranding locale={locale} />

            <div className="flex flex-col">
              <div className="lg:flex hidden justify-end px-5 pt-5 lg:px-8 lg:pt-8">
                <AuthHeader
                  locale={locale}
                  theme={theme}
                  onToggleLanguage={onToggleLanguage}
                  onToggleTheme={onToggleTheme}
                  themeLightLabel={t.nav.themeLight}
                  themeDarkLabel={t.nav.themeDark}
                  compact
                />
              </div>

              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
