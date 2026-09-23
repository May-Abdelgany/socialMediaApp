import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import type { Locale, ThemeMode } from './types/auth';

const getInitialTheme = (): ThemeMode => {
  const saved = localStorage.getItem('social-theme');
  if (saved === 'light' || saved === 'dark') return saved;

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getInitialLocale = (): Locale => {
  const saved = localStorage.getItem('social-locale') as Locale | null;
  return saved === 'ar' ? 'ar' : 'en';
};

function App() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.dir = locale === 'ar' ? 'rtl' : 'ltr';
    root.lang = locale;
    localStorage.setItem('social-theme', theme);
    localStorage.setItem('social-locale', locale);
  }, [theme, locale]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] transition-colors duration-200">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="/login"
            element={
              <LoginPage
                locale={locale}
                theme={theme}
                onToggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
                onToggleLanguage={() => setLocale((current) => (current === 'en' ? 'ar' : 'en'))}
              />
            }
          />
          <Route
            path="/register"
            element={
              <RegisterPage
                locale={locale}
                theme={theme}
                onToggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
                onToggleLanguage={() => setLocale((current) => (current === 'en' ? 'ar' : 'en'))}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
