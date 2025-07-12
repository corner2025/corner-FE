import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ko from "./ko/translation.json";
import en from "./en/translation.json";
import ja from "./ja/translation.json";
import zh from "./zh/translation.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ko: { translation: ko },
      en: { translation: en },
      ja: { translation: ja },
      zh: { translation: zh },
    },
    lng: "ko",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    react: {
        bindI18n: 'loaded languageChanged',
        bindI18nStore: 'added',
        useSuspense: false,
      },
  });

export default i18n;
