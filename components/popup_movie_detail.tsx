'use client';

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import React, { useEffect, useState } from "react";
import { useUi } from '../components/stateMenage/UiProvider';

interface MovieDetailModalProps {
  isOpen: boolean;
  closeModal: () => void;
  movieId: number;
}

export default function MovieDetailModal({ isOpen, closeModal, movieId }: MovieDetailModalProps) {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [movieDetail, setMovieDetail] = useState<any>({});
    const { setLoadingOverlay, setError } = useUi();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!movieId) return;
        setLoadingOverlay(true);
        setLoading(true);
        fetch(`${apiUrl}/movies/details/${movieId}`).then((response) => response.json())
        .then((data) => {
          setLoading(false);
          setMovieDetail(data);
        })
        .catch((error) => setError(error.message)).finally(() => setLoadingOverlay(false));
    } , [movieId, apiUrl]);

    // Early return after hooks
    if (!movieId) {
          return null;
    }

    
    const episodeList = [
        { id: 1, title: "Episode 1", description: "Description of Episode 1" , posterUrl: "https://image.tmdb.org/t/p/w500/yvirUYrva23IudARHn3mMGVxWqM.jpg" },
        { id: 2, title: "Episode 2", description: "Description of Episode 2" , posterUrl: "https://image.tmdb.org/t/p/w500/yvirUYrva23IudARHn3mMGVxWqM.jpg" },
        { id: 3, title: "Episode 3", description: "Description of Episode 3"  , posterUrl: "https://image.tmdb.org/t/p/w500/yvirUYrva23IudARHn3mMGVxWqM.jpg"},
    ];

  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-50"
            leave="ease-in duration-200"
            leaveFrom="opacity-50"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black opacity-50" />
          </Transition.Child>
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2  flex items-center justify-center px-4 w-full ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-10"
              enterTo="opacity-50 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-50 translate-y-0"
              leaveTo="opacity-0 translate-y-10"
            >
              <Dialog.Panel className="rounded max-w-3xl w-full">
                {!loading && (
                  <div className="overflow-y-auto scrollbar-glass max-h-[95vh]">
                    <div className="relative h-100 w-full">
                      {movieDetail.posterUrl ? (
                        <img loading="lazy" 
                          src={movieDetail.posterUrl}
                          alt={movieDetail.title}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <div className="w-full h-full bg-black rounded"></div>
                      )}
                      <div className="absolute left-0 bottom-0 p-6 z-10 w-full flex items-center md:items-start flex-col ">
                        <div className="text-white text-3xl mb-5 font-bold">
                          {movieDetail.title}
                        </div>
                        <div className="flex gap-4 items-center w-full ">
                          <button className="bg-white text-black py-2 md:px-8 w-full md:w-auto rounded">
                            <i className="fa-solid fa-play mr-2 ml-[-10px] md:ml-0"></i>
                            Play
                          </button>
                          <button className="border text-white w-10 h-10 rounded-full hidden md:flex items-center justify-center">
                            <i className="fa-solid fa-plus text-xl"></i>
                          </button>
                          <button className="border hidden text-white w-10 h-10 rounded-full md:flex items-center justify-center">
                            <i className="fa-solid fa-thumbs-up text-xl"></i>
                          </button>
                          <button className="border hidden text-white w-10 h-10 rounded-full md:flex items-center justify-center">
                            <i className="fa-solid fa-thumbs-down text-xl"></i>
                          </button>
                        </div>
                      </div>
                      <div className="absolute  bottom-0 w-full h-50 bg-gradient-to-t from-[#141414]  to-transparent"></div>
                    </div>
                    <div className="relative top-[-10px] bg-[#141414] p-6">
                      <div className="flex flex-col md:flex-row md:gap-10 gap-5">
                        <div className="md:max-w-[70%] w-full">
                          <div className="text-sm">
                            {movieDetail.overview || "-"}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 text-sm text-gray-400">
                          <div>Cast : {movieDetail.cast}</div>
                          <div>Director : {movieDetail.director}</div>
                          <div>Release Date : {movieDetail.releaseDate}</div>
                        </div>
                        <div className="flex gap-4 md:hidden ">
                          <button className="border text-white w-10 h-10 rounded-full md:hidden flex items-center justify-center">
                            <i className="fa-solid fa-plus text-sm"></i>
                          </button>
                          <button className="border md:hidden text-white w-10 h-10 rounded-full flex items-center justify-center">
                            <i className="fa-solid fa-thumbs-up text-sm"></i>
                          </button>
                          <button className="border md:hidden text-white w-10 h-10 rounded-full flex items-center justify-center">
                            <i className="fa-solid fa-thumbs-down text-sm"></i>
                          </button>
                        </div>
                      </div>
                      <div className="mt-10">
                        <div className="text-xl font-bold">Episodes</div>
                        <div>
                          <ul>
                            {episodeList.map((episode) => (
                              <li
                                key={episode.id}
                                className="flex items-center gap-4 my-4 cursor-pointer  hover:bg-white/10 p-2 rounded"
                              >
                              { movieDetail.posterUrl ?(  <img loading="lazy" 
                                  src={movieDetail.posterUrl}
                                  alt={episode.title}
                                  className="w-32 h-20 object-cover rounded"
                                />
                                ) : 
                                <div className="w-32 h-20 bg-black rounded"></div>
                                } 

                                <div>
                                  <div className="font-bold">
                                    {episode.title}
                                  </div>
                                  <div className="text-sm">
                                    {episode.description}
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
