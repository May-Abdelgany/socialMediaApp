import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import type { Locale, ThemeMode } from "./types/auth";
import { LoginPage } from "./features/auth/components/LoginPage";
import { RegisterPage } from "./features/auth/components/RegisterPage";
import { Homepage } from "./features/auth/components/HomePage";

const getInitialTheme = (): ThemeMode => {
  const saved = localStorage.getItem("social-theme");
  if (saved === "light" || saved === "dark") return saved;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const getInitialLocale = (): Locale => {
  const saved = localStorage.getItem("social-locale") as Locale | null;
  return saved === "ar" ? "ar" : "en";
};

function App() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.dir = locale === "ar" ? "rtl" : "ltr";
    root.lang = locale;
    localStorage.setItem("social-theme", theme);
    localStorage.setItem("social-locale", locale);
  }, [theme, locale]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] transition-colors duration-200">
        <ToastContainer
          position="top-left"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={theme === "dark" ? "dark" : "light"}
          closeButton={true}
          rtl={locale === "ar"}
        />

        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="/login"
            element={
              <LoginPage
                locale={locale}
                theme={theme}
                onToggleTheme={() =>
                  setTheme((current) => (current === "dark" ? "light" : "dark"))
                }
                onToggleLanguage={() =>
                  setLocale((current) => (current === "en" ? "ar" : "en"))
                }
              />
            }
          />
          <Route
            path="/register"
            element={
              <RegisterPage
                locale={locale}
                theme={theme}
                onToggleTheme={() =>
                  setTheme((current) => (current === "dark" ? "light" : "dark"))
                }
                onToggleLanguage={() =>
                  setLocale((current) => (current === "en" ? "ar" : "en"))
                }
              />
            }
          />
          <Route path="/home" element={<Homepage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
