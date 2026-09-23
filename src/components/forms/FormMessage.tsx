type FormMessageProps = {
  children: React.ReactNode;
  variant?: 'default' | 'muted' | 'success' | 'error';
};

export function FormMessage({ children, variant = 'default' }: FormMessageProps) {
  const classes = {
    default: 'text-[var(--text-secondary)]',
    muted: 'text-[var(--text-tertiary)]',
    success: 'text-emerald-600 dark:text-emerald-400',
    error: 'text-red-600 dark:text-red-400',
  };

  return <div className={`text-xs ${classes[variant]} mt-2.5` }>- {children}</div>;
}
