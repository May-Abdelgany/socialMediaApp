import { LanguageToggle } from '../language/LanguageToggle';
import { ThemeToggle } from '../theme/ThemeToggle';
import type { Locale, ThemeMode } from '../../types/auth';

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
  className = '',
}: AuthHeaderProps) {
  if (compact) {
    return (
      <div className={`flex items-center w-full gap-2 ${className} justify-end`}>
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
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--brand)] text-sm font-bold text-white shadow-lg shadow-[rgba(79,70,229,0.3)]">
          S
        </div>
        <span className="text-lg font-semibold text-[var(--text-primary)]">Sociala</span>
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
