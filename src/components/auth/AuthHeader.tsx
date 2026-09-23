import { LanguageToggle } from "../language/LanguageToggle";
import { ThemeToggle } from "../theme/ThemeToggle";
import type { Locale, ThemeMode } from "../../types/auth";

type AuthHeaderProps = {
  locale: Locale;
  theme: ThemeMode;
  onToggleLanguage: () => void;
  onToggleTheme: () => void;
  themeLightLabel: string;
  themeDarkLabel: string;
  compact?: boolean;
  className?: string;
};

export function AuthHeader({
  locale,
  theme,
  onToggleLanguage,
  onToggleTheme,
  themeLightLabel,
  themeDarkLabel,
  compact = false,
  className = "",
}: AuthHeaderProps) {
  if (compact) {
    return (
      <div
        className={`flex items-center w-full gap-2 ${className} justify-end`}
      >
        <LanguageToggle locale={locale} onToggle={onToggleLanguage} />
        <ThemeToggle
          theme={theme}
          onToggle={onToggleTheme}
          labelLight={themeLightLabel}
          labelDark={themeDarkLabel}
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-between gap-3 ${className}`}>
      <div className="flex items-center">
        <img src="/logo.svg" alt="Social Media" className="w-13 object-cover" />
        <span className="text-lg font-semibold text-[var(--text-primary)]">
          Sociala
        </span>
      </div>

      <div className="flex items-center gap-2">
        <LanguageToggle locale={locale} onToggle={onToggleLanguage} />
        <ThemeToggle
          theme={theme}
          onToggle={onToggleTheme}
          labelLight={themeLightLabel}
          labelDark={themeDarkLabel}
        />
      </div>
    </div>
  );
}
