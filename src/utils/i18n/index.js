import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslations from "./locales/en/translation.json";
import uaTranslations from "./locales/ua/translation.json";

const LANGUAGES = {
  EN: "en",
  UA: "ua",
};

const resources = {
  [LANGUAGES.EN]: {
    translation: enTranslations,
  },
  [LANGUAGES.UA]: {
    translation: uaTranslations,
  },
};

const detection = {
  order: ["querystring", "navigator"],
  lookupQuerystring: "lng",
};

export const detectLanguage = () => {
  const localLanguage = localStorage.getItem("APP_LANG") || LANGUAGES.UA;

  return localLanguage;
};

const languageDetector = {
  type: "languageDetector",
  detect: () => {
    const lng = detectLanguage();

    return lng;
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    detection,
    resources,
    fallbackLng: LANGUAGES.EN,
    supportedLngs: Object.values(LANGUAGES),
    interpolation: {
      escapeValue: false,
    },
    debug: false,
  });

export default i18n;
