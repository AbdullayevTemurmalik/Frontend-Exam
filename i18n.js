import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from "./English.json";
import uzTranslation from "./Uzbek.json";
import ruTranslation from "./Russinon.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      uz: { translation: uzTranslation },
      ru: { translation: ruTranslation },
    },
    fallbackLng: "en",
    lng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
