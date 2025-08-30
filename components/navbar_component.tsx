'use client';

import React , { useEffect, useState } from 'react'
import Image from 'next/image'
import logo_netflix from '../public/images/nexflix_logo.png'
import logo_netflix_mobile from '../public/images/logo_mobile.png'
import { useRouter } from 'next/navigation';
import UiState from './stateMenage/UiState';
import { useUi } from '../components/stateMenage/UiProvider';
import { useTranslation } from 'react-i18next';


export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();
  const [keyword , setKeyword] = useState('');
 const { setLoadingOverlay, setError } = useUi();
 const [dark, setDark] = useState(false);
 const [mounted, setMounted] = useState(false);
 const { t, i18n } = useTranslation();
 const [language , setLanguage] = useState('');
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  });

    const params = {
    language: i18n.language || 'en',
  } ;

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    if (!mounted) return;
    setLanguage(i18n.language);
    fetch(`${apiUrl}/movies/ChangeLanguage?${new URLSearchParams(params).toString()}`).then((response) => response.json())
    
    // const savedDarkMode = localStorage.getItem('darkMode');
    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // if (savedDarkMode !== null) {
    //   setDark(savedDarkMode === 'true');
    // } else {
    //   setDark(prefersDark);
    // }
  }, [mounted,i18n.language]);

  const toggleLang = () => {
    try {
      if (i18n && typeof i18n.changeLanguage === 'function') {
        const newLang = i18n.language === 'en' ? 'th' : 'en';
        console.log("🚀 ~ toggleLang ~ newLang:", newLang)
        i18n.changeLanguage(newLang);
        setLanguage(newLang);
    }
  }
    catch (error) {
      setError("Error changing language:" + error);
    }

    window.location.reload();
  };

  // useEffect(() => {
  //   if (dark) {
  //     document.documentElement.classList.add('dark');
  //     document.documentElement.style.setProperty('--background', '#141414');
  //     document.documentElement.style.setProperty('--foreground', '#ededed');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //     document.documentElement.style.setProperty('--background', '#ffffff');
  //     document.documentElement.style.setProperty('--foreground', '#171717');
  //   }
    
  //   // Save preference to localStorage
  //   localStorage.setItem('darkMode', dark.toString());
  // }, [dark]);

  
  const handleSearchIconClick = () => {
    setShowSearch(!showSearch);
  }

  const routetoSearch = (e : any) => {
    console.log("🚀 ~ routetoSearch ~ e:", e)
    const query = e
    if (query.trim()) {
      setLoadingOverlay(true);
      localStorage.setItem('lastSearch', query);
      window.dispatchEvent(new Event('lastSearchChange'));
      router.push(`/search`);
    }
  }

  const routeToHome = () => {
    router.push('/');
  }
  return (
    <div className="md:py-2 py-8 px-14 bg-linear-to-b h-35 md:h-20 from-black to-transparent ">
      <div className="flex justify-between h-16">
        <div className="flex items-center">
          <Image
            onClick={routeToHome}
            src={logo_netflix}
            alt="logo"
            width={100}
            className="cursor-pointer object-contain hidden md:block"
          />
          <Image
            onClick={routeToHome}
            src={logo_netflix_mobile}
            alt="logo"
            width={20}
            className="cursor-pointer object-contain block md:hidden"
          />
          <ul className="xl:flex gap-8 ml-10 hidden ">
            <li onClick={routeToHome} className="hover:text-red-500">
              {mounted ? t("home") : "Home"}
            </li>
            <li onClick={() => router.push('/search')} className="hover:text-red-500"> {mounted ? t("tvShows") : "TV Shows"}</li>
            <li onClick={() => router.push('/search')} className="hover:text-red-500">{mounted ? t("movies") : "Movies"}</li>
            <li onClick={() => router.push('/search')}className="hover:text-red-500">{mounted ? t("newAndPopular") : "New & Popular"}</li>
            <li className="hover:text-red-500">
              {mounted ? t("myList") : "My List"}
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-6">
          {showSearch && (
            <div>
              <input
                type="text"
                className="px-2 py-1 rounded border hidden xl:block"
                placeholder={mounted ? t("search") : "Search"}
                onKeyDown={(e) =>
                  e.key === "Enter" && routetoSearch(e.currentTarget.value)
                }
              />
            </div>
          )}
          <i
            onClick={handleSearchIconClick}
            className="fa-solid fa-magnifying-glass cursor-pointer"
          ></i>
          <p className="text-sm cursor-pointer hidden md:inline">{mounted ? t("kids") : "Kids"}</p>
          <i className="fa-solid fa-bell cursor-pointer"></i>
          <i className="fa-solid fa-user cursor-pointer"></i>
          {/* <button
            onClick={() => setDark(!dark)}
            className="bg-white dark:bg-black p-2 rounded-full cursor-pointer transition-colors duration-200"
          ></button> */}
          <button onClick={toggleLang}>
            {language === "en" ? "EN" : "TH"}
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full items-center sm:items-end">
       
          <div className="flex gap-2 sm:w-full sm:justify-end xl:hidden">
            <input
              type="text"
              className="px-2 py-1 rounded border bg-black opacity-70 sm:w-full"
              placeholder={mounted ? t("search") : "Search"}
              onChange={(e) => setKeyword(e.currentTarget.value)}
            />
            <button
              onClick={() => routetoSearch(keyword)}
              className="bg-white text-black px-3 py-2 rounded"
            >
              {mounted ? t("search") : "Search"}
            </button>
          </div>
     
        {/* <ul className="xl:hidden gap-8 flex justify-center mt-4 ">
          <li className="text-nowrap bg-black opacity-70 p-3 rounded ">{mounted ? t("tvShows") : "TV Shows"}</li>
          <li className="text-nowrap bg-black opacity-70 p-3 rounded ">{mounted ? t("movies") : "Movies"}</li>
          <li className="text-nowrap bg-black opacity-70 p-3 rounded ">{mounted ? t("categories") : "Categories"}</li>
        </ul> */}
      </div>
    </div>
  );
}
