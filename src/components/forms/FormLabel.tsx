type FormLabelProps = {
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
};

export function FormLabel({ htmlFor, children, className = '' }: FormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`mb-2 block text-sm font-medium text-[var(--text-primary)] ${className}`}
    >
      {children}
    </label>
  );
}
