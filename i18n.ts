
'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { dir } from 'console';

// Ensure i18n is only initialized once
if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          translation: {
            home: "Home",
            search: "Search",
            play: "Play",
            moreInfo: "More Info",
            myList: "My List",
            noData: "No Data Found",
            searchData: "Search Results: ",
            tvShows: "TV Shows",
            movies: "Movies",
            newAndPopular: "New & Popular",
            kids: "Kids",
            popInNetflix: "Popular on Netflix",
            cast: "Cast",
            director: "Director",
            datePublished: "Date Published",
            episodes: "Episodes",
            categories: "Categories",
            topRatedToDay: "#1 in TV Shows Today",
            overview:"Determined to protect a young patient who escaped a mysterious cult, a psychiatrist takes the girl in, putting her own family — and life — in danger."
          },
        },
        th: {
          translation: {
            home: "หน้าแรก",
            search: "ค้นหา",
            play: "เล่น",
            moreInfo: "ข้อมูลเพิ่มเติม",
            myList: "รายการของฉัน",
            noData: " ไม่พบข้อมูล",
            searchData: "ผลการค้นหา : ",
            tvShows: "ทีวีโชว์",
            movies: "ภาพยนตร์",
            newAndPopular: "ใหม่และยอดนิยม",
            kids: "เด็ก",
            popInNetflix: "ยอดนิยมใน Netflix",
            cast: "นักแสดง",
            director: "ผู้กำกับ",
            datePublished: "วันที่เผยแพร่",
            episodes: "ตอน",
            categories: "หมวดหมู่",
            topRatedToDay: "#1 ในรายการทีวีวันนี้",
            overview: "มุ่งมั่นที่จะปกป้องผู้ป่วยรายหนึ่งที่หนีออกจากลัทธิลึกลับ จิตแพทย์จึงรับเด็กหญิงคนนั้นเข้ามา ซึ่งทำให้ครอบครัวและชีวิตของเธอตกอยู่ในอันตราย"
          },
        },
      },
      fallbackLng: "en",
      debug: false,
      interpolation: { escapeValue: false },
      react: {
        useSuspense: false,
      },
      // Ensure consistent language detection
      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
        lookupLocalStorage: "i18nextLng",
      },
    });
}

export default i18n;
