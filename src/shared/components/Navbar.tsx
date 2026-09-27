import { useState } from "react";
import type { Locale, ThemeMode } from "../../types/auth";
import { ThemeToggle } from "../../components/theme/ThemeToggle";
import { LanguageToggle } from "../../components/language/LanguageToggle";
import { getDictionary } from "../../i18n";
import { logout } from "../../features/auth/apis/auth.api";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../features/auth/user/hooks";
import { logoutUser } from "../../features/auth/user/userSlice";
import { useNavigate } from "react-router-dom";
import getApiErrorMessage from "../error/apiErrorMessage";

type NavbarProps = {
  locale: Locale;
  theme: ThemeMode;
  onToggleLanguage: () => void;
  onToggleTheme: () => void;
  userName?: string;
};

export function Navbar({
  locale,
  theme,
  onToggleLanguage,
  onToggleTheme,
  userName,
}: NavbarProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const t = getDictionary(locale);
  const dispatch = useAppDispatch();

  const navItems = [
    {
      key: "home",
      label: t.nav.home,
    },
    {
      key: "explore",
      label: t.nav.explore,
    },
    {
      key: "notifications",
      label: t.nav.notifications,
    },
    {
      key: "messages",
      label: t.nav.messages,
    },
  ];

  const handleNavigation = (item: string) => {
    console.log("Navigate to:", item);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    try {
      await logout();
      toast.success(t.nav.logoutSuccess);
      localStorage.removeItem("userData");
      sessionStorage.removeItem("userData");
      dispatch(logoutUser());
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    } catch (error: any) {
      const messages = getApiErrorMessage(error, locale);
      messages.forEach((message) => toast.error(message));
    }
  };

  return (
    <header
      className={`sticky left-0 right-0 top-0 z-30 border-b border-[var(--border)] bg-[color:rgba(255,255,255,0.72)]/80 backdrop-blur-xl dark:bg-[color:rgba(2,8,23,0.72)]/80 ${
        locale === "ar" ? "rtl" : "ltr"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ================= HEADER ================= */}
        <div className="flex h-[68px] items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/logo.svg"
              alt={t.nav.socialaLogo}
              className="w-22 cursor-pointer"
            />

            <div className="hidden sm:block">
              <p className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
                Sociala
              </p>
            </div>
          </div>

          {/* ================= DESKTOP NAVIGATION ================= */}
          <nav className="hidden cursor-pointer items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-muted)] p-1 lg:flex">
            {navItems.map((item, index) => (
              <button
                key={item.key}
                type="button"
                onClick={() => handleNavigation(item.key)}
                className={[
                  "cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition",
                  index === 0
                    ? "bg-[var(--brand)] text-white shadow-sm"
                    : "text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-[var(--text-primary)]",
                ].join(" ")}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* ================= RIGHT SIDE ================= */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Create */}
            <button
              type="button"
              className="hidden cursor-pointer rounded-full bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_var(--button-primary-shadow)] transition hover:bg-[var(--button-primary-hover)] lg:inline-flex"
            >
              + {t.nav.create}
            </button>

            {/* ================= USER DROPDOWN ================= */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsUserMenuOpen((prev) => !prev);
                  setIsMobileMenuOpen(false);
                }}
                className="flex cursor-pointer items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-2 py-1.5 shadow-sm transition hover:bg-[var(--surface-muted)] sm:gap-3 sm:px-3 md:px-4"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--brand),var(--brand-strong))] text-sm font-bold text-white">
                  {userName?.slice(0, 1).toUpperCase()}
                </div>

                <div className="hidden text-left sm:block">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {userName}
                  </p>

                  <p className="text-[10px] text-[var(--text-tertiary)]">
                    {t.nav.online}
                  </p>
                </div>

                <svg
                  className={`hidden h-4 w-4 text-[var(--text-secondary)] transition-transform sm:block ${
                    isUserMenuOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 1.04l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* User Menu */}
              {isUserMenuOpen && (
                <div
                  className={`absolute mt-3 w-64 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-xl ${
                    locale === "ar" ? "left-0" : "right-0"
                  }`}
                >
                  {/* User Info */}
                  <div className="mb-2 border-b border-[var(--border)] px-3 pb-3">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      {userName}
                    </p>

                    <p className="text-xs text-[var(--text-tertiary)]">
                      {t.nav.online}
                    </p>
                  </div>

                  {/* Language */}
                  <div className="flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-[var(--surface-muted)]">
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">
                        {t.nav.language}
                      </p>

                      <p className="text-xs text-[var(--text-tertiary)]">
                        {locale === "en" ? t.nav.english : t.nav.arabic}
                      </p>
                    </div>

                    <LanguageToggle
                      locale={locale}
                      onToggle={onToggleLanguage}
                    />
                  </div>

                  {/* Theme */}
                  <div className="flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-[var(--surface-muted)]">
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">
                        {t.nav.theme}
                      </p>

                      <p className="text-xs text-[var(--text-tertiary)]">
                        {theme === "dark" ? t.nav.darkMode : t.nav.lightMode}
                      </p>
                    </div>

                    <ThemeToggle
                      theme={theme}
                      onToggle={onToggleTheme}
                      labelLight={t.nav.lightMode}
                      labelDark={t.nav.darkMode}
                    />
                  </div>

                  {/* Divider */}
                  <div className="my-2 border-t border-[var(--border)]" />

                  {/* Logout */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/30"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 17l5-5-5-5"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12H3"
                      />
                    </svg>

                    {t.nav.logout}
                  </button>
                </div>
              )}
            </div>

            {/* ================= MOBILE MENU BUTTON ================= */}
            <button
              type="button"
              aria-label={t.nav.toggleNavigation}
              aria-expanded={isMobileMenuOpen}
              onClick={() => {
                setIsMobileMenuOpen((prev) => !prev);
                setIsUserMenuOpen(false);
              }}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] transition hover:bg-[var(--surface-muted)] lg:hidden"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6l12 12M18 6L6 18"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ================= MOBILE NAVIGATION ================= */}
        {isMobileMenuOpen && (
          <div className="border-t border-[var(--border)] py-3 lg:hidden">
            <nav className="flex cursor-pointer flex-col gap-1">
              {navItems.map((item, index) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleNavigation(item.key)}
                  className={[
                    "flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium transition",
                    locale === "ar" ? "text-right" : "text-left",
                    index === 0
                      ? "bg-[var(--brand)] text-white"
                      : "text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]",
                  ].join(" ")}
                >
                  {item.label}
                </button>
              ))}

              {/* Mobile Create */}
              <button
                type="button"
                className="mt-2 flex w-full cursor-pointer items-center justify-center rounded-xl bg-[var(--brand)] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_var(--button-primary-shadow)] transition hover:bg-[var(--button-primary-hover)]"
              >
                + {t.nav.create}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
