import type { ThemeMode } from '../../types/auth';

type ThemeToggleProps = {
  theme: ThemeMode;
  onToggle: () => void;
  labelLight: string;
  labelDark: string;
};

export function ThemeToggle({ theme, onToggle, labelLight, labelDark }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex cursor-pointer h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-muted)] text-base text-[var(--text-primary)] transition hover:border-[var(--brand)]"
      aria-label={theme === 'dark' ? labelLight : labelDark}
      title={theme === 'dark' ? labelLight : labelDark}
    >
      {theme === 'dark' ? '☀' : '☾'}
    </button>
  );
}
