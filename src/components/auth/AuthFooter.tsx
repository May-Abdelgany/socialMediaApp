import { Link } from 'react-router-dom';
import type { Locale } from '../../types/auth';
import { getDictionary } from '../../i18n';

type AuthFooterProps = {
  locale: Locale;
  isLogin: boolean;
};

export function AuthFooter({ locale, isLogin }: AuthFooterProps) {
  const t = getDictionary(locale);

  return (
    <p className="pt-2 text-center text-sm text-[var(--text-secondary)]">
      {isLogin ? t.auth.noAccount : t.auth.haveAccount}{' '}
      <Link
        to={isLogin ? '/register' : '/login'}
        className="font-semibold text-[var(--brand)] hover:text-[var(--brand-strong)]"
      >
        {isLogin ? t.auth.goToRegister : t.auth.goToLogin}
      </Link>
    </p>
  );
}
