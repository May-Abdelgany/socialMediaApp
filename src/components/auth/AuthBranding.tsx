import type { Locale } from '../../types/auth';
import { getDictionary } from '../../i18n';

type AuthBrandingProps = {
  locale: Locale;
};

export function AuthBranding({ locale }: AuthBrandingProps) {
  const t = getDictionary(locale);

  return (
    <div className="hidden min-h-[620px] flex-col justify-between border-r border-[var(--border)] bg-[linear-gradient(160deg,var(--brand-soft),var(--surface))] p-6 sm:p-8 lg:flex lg:p-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand)] text-lg font-black text-white shadow-lg shadow-[rgba(79,70,229,0.3)]">
            S
          </div>
          <div>
            <p className="text-lg font-semibold text-[var(--text-primary)]">Sociala</p>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-tertiary)]">
              {t.brand.badge}
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-2 xl:flex">
          <div className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)]">
            {locale === 'en' ? 'English' : 'العربية'}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 mt-8 text-xs font-medium text-[var(--text-secondary)]">
          Community-first design
        </div>

        <div className="space-y-4">
          <h1 className="max-w-md text-4xl font-semibold leading-tight text-[var(--text-primary)] xl:text-5xl">
            {t.brand.title}
          </h1>
          <p className="max-w-lg text-base leading-7 text-[var(--text-secondary)]">
            {t.brand.subtitle}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { value: t.brand.stats.members, label: t.brand.stats.membersLabel },
            { value: t.brand.stats.creators, label: t.brand.stats.creatorsLabel },
            { value: t.brand.stats.engagement, label: t.brand.stats.engagementLabel },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
              <div className="text-2xl font-bold text-[var(--text-primary)]">{item.value}</div>
              <div className="mt-1 text-xs text-[var(--text-secondary)]">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-semibold text-[var(--text-primary)] mt-8">{t.brand.featureTitle}</p>
        </div>

        <div className="space-y-3">
          {[t.brand.feature1, t.brand.feature2, t.brand.feature3].map((feature, index) => (
            <div key={feature} className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--brand-soft)] text-sm font-semibold text-[var(--brand)]">
                {index + 1}
              </div>
              <span className="text-sm text-[var(--text-primary)]">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
