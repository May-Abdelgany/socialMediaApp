type FormInputProps = {
  id?: string;
  type?: string;
  value: string;
  placeholder?: string;
  autoComplete?: string;
  onChange: (value: string) => void;
  className?: string;
};

export function FormInput({
  id,
  type = 'text',
  value,
  placeholder,
  autoComplete,
  onChange,
  className = '',
}: FormInputProps) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      autoComplete={autoComplete}
      onChange={(event) => onChange(event.target.value)}
      className={`w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--brand)] focus:ring-2 focus:ring-[rgba(99,102,241,0.18)] ${className}`}
    />
  );
}
