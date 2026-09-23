type LanguageToggleProps = {
  locale: 'en' | 'ar';
  onToggle: () => void;
};

export function LanguageToggle({ locale, onToggle }: LanguageToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex cursor-pointer h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-muted)] text-base text-[var(--text-primary)] transition hover:border-[var(--brand)]"
      aria-label={locale === 'en' ? 'Switch to Arabic' : 'Switch to English'}
      title={locale === 'en' ? 'Switch to Arabic' : 'Switch to English'}
    >
      {locale === 'en' ? 'AR' : 'EN'}
    </button>
  );
}
