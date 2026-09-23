import type { Locale } from '../../types/auth';
import { getDictionary } from '../../i18n';

type SocialAuthButtonsProps = {
  locale: Locale;
};

export function SocialAuthButtons({ locale }: SocialAuthButtonsProps) {
  const t = getDictionary(locale);

  return (
    <>
      <div className="relative my-3 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--border)]" />
        </div>
        <span className="relative bg-[var(--surface)] px-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
          {t.auth.continueWith}
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <SocialButton label={t.auth.google} icon="G" />
        <SocialButton label={t.auth.apple} icon="" />
      </div>
    </>
  );
}

function SocialButton({ label, icon }: { label: string; icon: string }) {
  return (
    <button
      type="button"
      className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm font-medium text-[var(--text-primary)] transition hover:border-[var(--brand)] hover:bg-[var(--surface)]"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--surface)] text-xs font-bold text-[var(--text-primary)]">
        {icon}
      </span>
      {label}
    </button>
  );
}
