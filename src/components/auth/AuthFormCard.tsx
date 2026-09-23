import type { FormEvent, ReactNode } from 'react';
import type { Locale } from '../../types/auth';
import { getDictionary } from '../../i18n';

type AuthFormCardProps = {
  locale: Locale;
  title: string;
  eyebrow: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
};

export function AuthFormCard({ locale, title, eyebrow, onSubmit, children }: AuthFormCardProps) {
  const t = getDictionary(locale);

  return (
    <div className="flex items-center justify-center bg-[var(--surface)] p-5 sm:p-7 lg:p-10">
      <div className="w-full max-w-lg">
        <div className="mb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--text-tertiary)]">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-[var(--text-primary)]">{title}</h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">{t.auth.subtext}</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          {children}
        </form>
      </div>
    </div>
  );
}
