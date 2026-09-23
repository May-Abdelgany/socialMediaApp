type PasswordInputProps = {
  id?: string;
  value: string;
  placeholder?: string;
  autoComplete?: string;
  visible: boolean;
  onChange: (value: string) => void;
  onToggleVisibility: () => void;
  ariaLabel: string;
};

export function PasswordInput({
  id,
  value,
  placeholder,
  autoComplete,
  visible,
  onChange,
  onToggleVisibility,
  ariaLabel,
}: PasswordInputProps) {
  return (
    <div className="relative">
      <input
        id={id}
        type={visible ? 'text' : 'password'}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 pr-12 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--brand)] focus:ring-2 focus:ring-[rgba(99,102,241,0.18)]"
      />
      <button
        type="button"
        aria-label={ariaLabel}
        onClick={onToggleVisibility}
        className="absolute cursor-pointer inset-y-0 right-3 flex items-center text-[var(--text-secondary)] transition hover:text-[var(--brand)]"
      >
        {visible ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M3 3l18 18" />
            <path d="M10.58 10.58A2 2 0 0 0 13.41 13.41" />
            <path d="M9.88 5.09A10.94 10.94 0 0 1 12 5c6.5 0 10 7 10 7a17.18 17.18 0 0 1-5.09 6.33" />
            <path d="M6.61 6.61A16.9 16.9 0 0 0 2 12s3.5 7 10 7a10.97 10.97 0 0 0 5.39-1.61" />
          </svg>
        )}
      </button>
    </div>
  );
}
