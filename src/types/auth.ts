export type Locale = 'en' | 'ar';
export type ThemeMode = 'light' | 'dark';
export type AuthMode = 'login' | 'register';

export type AuthFormState = {
  email: string;
  password: string;
  nameAr: string;
  nameEn: string;
  confirmPassword: string;
};

export type TranslationSet = {
  nav: {
    login: string;
    register: string;
    language: string;
    themeLight: string;
    themeDark: string;
  };
  brand: {
    badge: string;
    title: string;
    subtitle: string;
    stats: {
      members: string;
      membersLabel: string;
      creators: string;
      creatorsLabel: string;
      engagement: string;
      engagementLabel: string;
    };
    featureTitle: string;
    feature1: string;
    feature2: string;
    feature3: string;
  };
  auth: {
    welcome: string;
    loginTitle: string;
    registerTitle: string;
    subtext: string;
    email: string;
    nameAr: string;
    nameEn: string;
    password: string;
    confirmPassword: string;
    remember: string;
    forgot: string;
    loginAction: string;
    registerAction: string;
    loginSuccess: string;
    registerSuccess: string;
    continueWith: string;
    google: string;
    apple: string;
    noAccount: string;
    haveAccount: string;
    goToRegister: string;
    goToLogin: string;
    showPassword: string;
    hidePassword: string;
    showConfirmPassword: string;
    hideConfirmPassword: string;
    helper: string;
    legal: string;
  };
  validation: {
    email: {
      required: string;
      invalid: string;
      max: string;
    };
    password: {
      required: string;
      min: string;
      max: string;
      pattern: string;
    };
    confirmPassword: {
      required: string;
      mismatch: string;
    };
    nameAr: {
      required: string;
      min: string;
      max: string;
    };
    nameEn: {
      required: string;
      min: string;
      max: string;
    };
  };
};
