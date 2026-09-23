import { ar } from './ar';
import { en } from './en';
import type { Locale, TranslationSet } from '../types/auth';

export const translations: Record<Locale, TranslationSet> = {
  en,
  ar,
};

export const getDictionary = (locale: Locale): TranslationSet => translations[locale];
