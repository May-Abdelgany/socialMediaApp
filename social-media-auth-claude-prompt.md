# Claude Prompt — Social Media App Authentication UI

## Role

Act as a **Senior Frontend React + TypeScript Engineer and UI/UX Designer**.

You are working on a modern social media application similar in quality to Facebook, Instagram, Threads, and X.

Your task is to generate **UI/design only** for the authentication experience using:

- React
- TypeScript
- Tailwind CSS
- Reusable components
- Responsive design
- Arabic + English localization
- Light + Dark themes

Do **not** implement backend APIs, authentication logic, database logic, or real API calls.

---

# 1. Project Goal

Create a polished, production-quality authentication UI containing:

1. Login Page
2. Register Page

The implementation must be structured so the authentication pages are composed from reusable sections and components rather than large page-specific components.

The final result should look like a real modern social media product, not a basic tutorial form.

---

# 2. Required Pages

## Login Page

Create:

`/login`

Fields:

- Email
- Password

Actions:

- Login
- Forgot password
- Navigate to Register

Optional social-login UI can be included as a visual/design element, but it must not contain real authentication logic.

---

## Register Page

Create:

`/register`

Fields:

- `nameAr`
- `nameEn`
- `email`
- `password`
- `confirmPassword`

Actions:

- Create account
- Navigate to Login

Include appropriate password visibility controls.

---

# 3. Localization

The entire UI must support:

- English
- Arabic

The UI must correctly support:

- LTR for English
- RTL for Arabic

Do not simply translate the page title.

All user-facing text should have Arabic and English versions, including:

- Labels
- Placeholders
- Buttons
- Validation/design messages
- Links
- Helper text
- Headings
- Descriptions
- Navigation text
- Empty states if any
- Accessibility labels

Use a clean localization structure so adding more languages later is easy.

Example:

```ts
const translations = {
  en: {
    auth: {
      login: "Login",
      register: "Create account",
      email: "Email",
      password: "Password",
    },
  },
  ar: {
    auth: {
      login: "تسجيل الدخول",
      register: "إنشاء حساب",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
    },
  },
};
```

The implementation should not hard-code English text directly inside reusable components.

---

# 4. Theme System

The application must support:

- Light mode
- Dark mode

Create a reusable theme system using Tailwind CSS.

The design must not depend on hard-coded colors scattered throughout components.

Use semantic design tokens/classes where possible.

Example conceptual tokens:

```text
background
surface
surface-muted
text-primary
text-secondary
border
primary
primary-hover
danger
success
```

The same component must look correct in both themes.

Persist the selected theme using `localStorage`.

Respect the user's system preference on first load when no saved theme exists.

Include a reusable theme toggle component.

---

# 5. Design Direction

Create a **modern premium social media design**.

The visual language should feel:

- Clean
- Modern
- Professional
- Minimal
- Friendly
- Premium
- Highly readable
- Mobile-first

Avoid:

- Old-fashioned Bootstrap-style layouts
- Excessive gradients
- Excessive shadows
- Huge decorative elements
- Overly complicated animations
- Generic template-looking UI
- Excessive rounded cards everywhere

Use spacing and typography to create hierarchy.

---

# 6. Authentication Layout

Create a reusable authentication layout:

```text
AuthLayout
 ├── AuthBrandingSection
 └── AuthFormSection
```

Desktop:

```text
------------------------------------------------
|                                              |
|       Branding        |      Form            |
|                       |                      |
|       Logo            |      Login/Register  |
|       Description     |      Card            |
|       Illustration    |                      |
|                       |                      |
------------------------------------------------
```

Mobile:

```text
-------------------------
| Logo                  |
|                       |
| Login / Register      |
| Form                  |
|                       |
| Footer links          |
-------------------------
```

On mobile, the branding section can be simplified or hidden.

---

# 7. Reusable Component Architecture

Create reusable components.

Recommended structure:

```text
src/
├── components/
│   ├── auth/
│   │   ├── AuthLayout.tsx
│   │   ├── AuthBranding.tsx
│   │   ├── AuthHeader.tsx
│   │   ├── AuthFormCard.tsx
│   │   ├── AuthFooter.tsx
│   │   ├── AuthDivider.tsx
│   │   └── SocialAuthButtons.tsx
│   │
│   ├── forms/
│   │   ├── FormInput.tsx
│   │   ├── PasswordInput.tsx
│   │   ├── FormLabel.tsx
│   │   └── FormMessage.tsx
│   │
│   ├── theme/
│   │   └── ThemeToggle.tsx
│   │
│   └── language/
│       └── LanguageToggle.tsx
│
├── pages/
│   └── auth/
│       ├── LoginPage.tsx
│       └── RegisterPage.tsx
│
├── i18n/
│   ├── en.ts
│   ├── ar.ts
│   └── index.ts
│
└── types/
    └── auth.ts
```

You may improve this structure if you have a better senior-level architecture.

---

# 8. Reusable Form Components

Create reusable form components instead of duplicating markup.

For example:

```tsx
<FormInput
  label="Email"
  name="email"
  type="email"
  placeholder="Enter your email"
/>
```

And:

```tsx
<PasswordInput
  label="Password"
  name="password"
  placeholder="Enter your password"
/>
```

Components should support:

- label
- placeholder
- helper text
- error state
- disabled state
- required state
- leading icon
- trailing icon
- accessibility attributes

---

# 9. Login UI

Design the Login page with:

### Header

- Brand/logo
- Welcome title
- Short description

### Form

Email input

Password input with show/hide icon

Forgot password link

Primary Login button

### Alternative

Optional divider:

`OR`

Social login buttons can be displayed for design purposes only.

### Footer

Example:

"Don't have an account? Create one"

Arabic equivalent:

"ليس لديك حساب؟ إنشاء حساب"

---

# 10. Register UI

Design the Register page with:

### Header

- Brand/logo
- Create account title
- Short description

### Form

Name Arabic

Name English

Email

Password

Confirm Password

### Actions

Primary Create Account button

Login navigation

Optional social signup UI

---

# 11. Responsive Design

The UI must be fully responsive.

Support:

- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+
- Large desktop: 1440px+

Test for:

- 320px
- 375px
- 390px
- 768px
- 1024px
- 1440px

Do not allow horizontal scrolling.

Forms must remain usable on small screens.

---

# 12. Arabic RTL Requirements

When language is Arabic:

```html
<html dir="rtl" lang="ar">
```

When language is English:

```html
<html dir="ltr" lang="en">
```

RTL must affect:

- Form alignment
- Icons
- Input padding
- Navigation
- Buttons
- Layout direction
- Branding section
- Password icons
- Arrow icons
- Dividers
- Spacing where direction matters

Do not create a separate Arabic page.

Use the same reusable components with direction-aware styling.

---

# 13. Accessibility

Follow accessibility best practices.

Requirements:

- Semantic HTML
- Proper labels
- Keyboard navigation
- Visible focus states
- Accessible buttons
- Accessible password visibility toggle
- Proper input autocomplete attributes
- Sufficient color contrast
- `aria-label` where necessary
- Do not rely only on color to communicate errors

Example:

```html
<input
  type="email"
  name="email"
  autoComplete="email"
/>
```

---

# 14. UX States

Design the UI for these states even if no real functionality is implemented:

### Default

Normal input.

### Focus

Clear focus indicator.

### Error

Show error styling and message.

### Disabled

Disabled button/input state.

### Loading

Create a loading state for the primary button.

Example:

```text
Creating account...
```

Arabic:

```text
جارٍ إنشاء الحساب...
```

These are UI states only.

---

# 15. Icons

Use a consistent icon library such as:

- Lucide React

Use icons for:

- Email
- Password
- Eye / EyeOff
- Language
- Theme
- Arrow
- Social providers

Do not mix multiple icon styles.

---

# 16. Typography

Use a modern font system.

The typography must work well for both:

- English
- Arabic

Prefer a font stack that supports Arabic properly.

Recommended direction:

```css
font-family:
  "Inter",
  "Noto Sans Arabic",
  system-ui,
  sans-serif;
```

Adjust if the project already has an existing font system.

---

# 17. Tailwind Requirements

Use Tailwind CSS for styling.

Prefer:

- Responsive utilities
- Dark mode utilities
- Logical spacing where practical
- Reusable component classes
- Consistent spacing scale

Avoid:

- Inline styles unless absolutely necessary
- Huge CSS files
- Duplicated styles
- Hard-coded colors repeated everywhere

---

# 18. Theme Colors

Create a professional social-media-oriented color system.

Use one primary brand color and neutral surfaces.

Light theme:

```text
Background: soft neutral
Surface: white
Primary: modern blue/indigo
Text: deep neutral
Border: subtle neutral
```

Dark theme:

```text
Background: deep neutral
Surface: elevated dark neutral
Primary: accessible bright brand color
Text: near-white
Border: subtle dark border
```

Do not use pure black backgrounds unless necessary.

Make sure the primary color has sufficient contrast.

---

# 19. Logo / Branding

Create a simple reusable brand area.

Example:

```text
[Logo]

Connect.
Share.
Discover.
```

The actual application name can be represented as a configurable brand constant.

Do not create a complicated logo that requires external assets.

If no real logo asset exists, create a clean text/icon-based placeholder.

---

# 20. Animations

Use subtle animations only.

Examples:

- Page entrance
- Form card entrance
- Button hover
- Input focus
- Theme transition

Animations should be short and professional.

Respect:

```css
prefers-reduced-motion
```

Do not add distracting animations.

---

# 21. Routing

Assume the project uses React Router.

Routes:

```text
/login
/register
```

Do not implement backend authentication.

Navigation buttons should navigate between these pages.

---

# 22. No Backend

IMPORTANT:

Do not implement:

- API calls
- Axios services
- Fetch requests
- JWT
- Cookies
- Authentication state
- Database
- Backend validation
- Real social login

This task is **DESIGN/UI ONLY**.

Forms can use local state only when required to demonstrate UI states.

---

# 23. Code Quality

Write production-quality React TypeScript.

Requirements:

- Functional components
- Strong TypeScript typing
- No unnecessary `any`
- Reusable components
- Clear naming
- Small focused components
- Avoid duplicated JSX
- Avoid duplicated Tailwind classes where a reusable component makes more sense
- Keep page components lightweight

Example:

```tsx
export function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
```

---

# 24. Important Architecture Rule

Do NOT create one huge:

```text
LoginPage.tsx
```

containing everything.

Instead:

```text
LoginPage
   ↓
AuthLayout
   ↓
AuthFormCard
   ↓
AuthHeader
   ↓
FormInput
PasswordInput
AuthFooter
```

The same components should be reusable by RegisterPage.

---

# 25. Expected Final Pages

Generate:

### Login

```text
Brand
↓
Welcome Back
↓
Description
↓
Email
↓
Password
↓
Forgot password
↓
Login
↓
OR
↓
Social login UI
↓
Don't have an account?
Create account
```

### Register

```text
Brand
↓
Create your account
↓
Description
↓
Arabic Name
↓
English Name
↓
Email
↓
Password
↓
Confirm Password
↓
Create Account
↓
OR
↓
Social signup UI
↓
Already have an account?
Login
```

---

# 26. Theme + Language Controls

Place reusable controls in a consistent location.

Example:

```text
[ Language ] [ Theme ]
```

The controls must work on both pages.

Language:

```text
EN ↔ AR
```

Theme:

```text
Light ↔ Dark
```

Changing language must immediately update the UI direction.

Changing theme must immediately update the UI appearance.

---

# 27. Deliverables

Generate the complete UI implementation.

Expected files should include something similar to:

```text
src/
├── components/
│   ├── auth/
│   ├── forms/
│   ├── theme/
│   └── language/
├── pages/
│   └── auth/
├── i18n/
├── types/
└── ...
```

Also provide:

1. All required React/TypeScript files
2. Tailwind configuration changes if needed
3. Theme configuration
4. Localization configuration
5. Routing configuration
6. Reusable components
7. Responsive implementation
8. Light/dark implementation
9. Arabic/English implementation

---

# 28. Final Quality Checklist

Before finishing, verify:

- [ ] Login page exists
- [ ] Register page exists
- [ ] Login has email/password
- [ ] Register has nameAr/nameEn/email/password/confirmPassword
- [ ] Components are reusable
- [ ] No duplicated authentication layout
- [ ] Arabic supported
- [ ] English supported
- [ ] RTL supported
- [ ] LTR supported
- [ ] Light theme supported
- [ ] Dark theme supported
- [ ] Theme persists
- [ ] Language switch works
- [ ] Fully responsive
- [ ] Mobile optimized
- [ ] Accessible inputs
- [ ] Password visibility toggle
- [ ] Loading UI state
- [ ] Error UI state
- [ ] Disabled UI state
- [ ] Keyboard accessible
- [ ] No backend/API implementation
- [ ] No real authentication logic
- [ ] No unnecessary dependencies
- [ ] Clean TypeScript
- [ ] Reusable components
- [ ] Production-quality UI

## Final instruction

Act as a senior frontend engineer.

Do not generate a quick demo.

Build a polished, scalable authentication design system that can become the foundation for the rest of the social media application.

Prioritize:

**reusability → accessibility → responsive design → localization → theming → clean architecture → visual quality.**
