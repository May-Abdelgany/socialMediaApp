import { Navbar } from "../../../shared/components/Navbar";
import type { Locale, ThemeMode } from "../../../types/auth";
import { useAppSelector } from "../user/hooks";
import { selectUser } from "../user/userSelectors";

type HomepageProps = {
  locale: Locale;
  theme: ThemeMode;
  onToggleLanguage: () => void;
  onToggleTheme: () => void;
};

export function Homepage({
  locale,
  theme,
  onToggleLanguage,
  onToggleTheme,
}: HomepageProps) {
  const user = useAppSelector(selectUser);

  const userName = user?.nameEn || "Sociala User";

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <Navbar
        locale={locale}
        theme={theme}
        onToggleLanguage={onToggleLanguage}
        onToggleTheme={onToggleTheme}
        userName={userName}
      />
    </div>
  );
}
