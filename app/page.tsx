"use client";

import Image from "next/image";
import image_show_mock from "../public/images/Main_Show_BG.jpg";
import Thumbnail from "../components/thumbnail_component";
import thumbnail_img from "../public/images/Card.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import name_movie from "../public/images/Show_Logo.png";
import { Autoplay } from "swiper/modules";
import top10 from "../public/images/Top10.png";
import { useEffect, useState } from "react";
import MovieDetailModal from "../components/popup_movie_detail";
import { useUi } from '../components/stateMenage/UiProvider';
import { useTranslation } from "react-i18next";


export default function Home() {

 const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const [popular , setPopular] = useState([]);
const [movieId, setMovieId] = useState(Number(0));
const [openModal, setOpenModal] = useState(false);
const { setLoading, setError } = useUi();
const [mounted, setMounted] = useState(false);
 const { t, i18n } = useTranslation();

  useEffect(() => {
    setMounted(true);
  });

  const params = {
    language: i18n.language || 'en',
  } ;


useEffect(() => {
  setLoading(true);
  fetch(`${apiUrl}/movies/popular`)
  .then((response) => response.json())
  .then((data) => setPopular(data))
  .catch((error) => setError("Error fetching movies:" + error))
  .finally(() => setLoading(false));
}, []);

const showModalDetails = (movieId: number) => {
  setMovieId(movieId);
  setOpenModal(true);
};

  return (
    
    <div>
      <div>
        <div className="relative">
          <Image
            src={image_show_mock}
            alt="logo"
            className="w-[100vw] h-[100vh] object-cover object-[70%_0] md:object-center"
          />
          <div className="absolute md:top-1/2 md:left-[3%] md:-translate-y-1/2 md:translate-x-0 bottom-[7%] left-1/2 -translate-x-1/2 w-70 md:w-160">
            <div className="flex flex-col gap-5 md:gap-6 items-center md:items-start">
              <Image src={name_movie} alt="logo" width={500} /> 
              <div className="flex gap-3 items-center ">
                <Image
                  src={top10}
                  alt="logo"
                  width={30}
                  className="hidden md:flex "
                ></Image>
                <div className=" text-xl md:text-3xl font-bold">
                  {mounted ? t("topRatedToDay") : "#1 in TV Shows Today"}
                </div>
              </div>
              <div className="text-lg max-w-xl line-clamp-3 hidden md:flex">
                {mounted ? t("overview") : "Determined to protect a young patient who escaped a mysterious cult, a psychiatrist takes the girl in, putting her own family — and life — in danger."}
              </div>
              <div className="flex  justify-between gap-4 items-center md:hidden">
                <div className="flex flex-col justify-center items-center gap-2 ">
                  <i className="fas fa-plus text-xl"></i>
                  <div className="text-sm font-semibold text-nowrap">
                    {mounted ? t("myList") : "My List"}
                  </div>
                </div>
                <button className="bg-white text-black px-4 py-2 rounded-md text-nowrap text-lg font-semibold md:mr-4 hover:bg-gray-300 transition duration-300">
                  <i className="fas fa-play mr-2"></i> {mounted ? t("play") : "Play"}
                </button>
                <div className="flex flex-col justify-center items-center gap-2  ">
                  <i className="fas fa-info-circle mr-2 text-xl"></i>
                  <div className="text-sm font-semibold text-nowrap">
                    {mounted ? t("moreInfo") : "More Info"}
                  </div>
                </div>
              </div>
              <div className="hidden md:flex">
                <button className="bg-white text-black px-6 py-3 rounded-md text-lg font-semibold mr-4 hover:bg-gray-300 transition duration-300">
                  <i className="fas fa-play mr-2"></i> {mounted ? t("play") : "Play"}
                </button>
                <button className="bg-gray-700 bg-opacity-70 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-gray-600 transition duration-300">
                  <i className="fas fa-info-circle mr-2"></i> {mounted ? t("moreInfo") : "More Info"}
                </button>
              </div>
            </div>
          </div>
        </div>
          <div className="relative z-10 md:top-[-100px]">
            <div className="md:text-2xl text-md font-bold mb-3 md:pl-14 pl-4 mt-4 md:mt-0">
              {mounted ? t("popInNetflix") : "Popular on Netflix"}
            </div>
            <div>
              <Swiper
                spaceBetween={10}
                slidesPerView={3.5}
                slidesOffsetBefore={20}
                breakpoints={{
                  480: { slidesPerView: 4.5, spaceBetween: 10 , slidesOffsetBefore: 30}, // xs
                  640: { slidesPerView: 5.5, spaceBetween: 10 , slidesOffsetBefore: 30}, // sm
                  768: { slidesPerView: 4, spaceBetween: 15  , slidesOffsetBefore: 55}, // md
                  1024: { slidesPerView: 4.5, spaceBetween: 20 , slidesOffsetBefore: 55 }, // lg
                  1280: { slidesPerView: 5.5, spaceBetween: 20 , slidesOffsetBefore: 55 }, // xl
                  1536: { slidesPerView: 6.5, spaceBetween: 20 , slidesOffsetBefore: 55 }, // 2xl
                }}
                
              >
                {popular.map((movie: any) => (
                  <SwiperSlide key={movie.id} onClick={() => showModalDetails(movie.id)}>
                    <Thumbnail image={movie.posterUrl} title={movie.title} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
      </div>
      <MovieDetailModal isOpen={openModal} closeModal={() => setOpenModal(false)} movieId={movieId} />
    </div>
  );
}
