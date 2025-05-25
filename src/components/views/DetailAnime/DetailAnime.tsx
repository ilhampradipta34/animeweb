import Image from "next/image";
import useDetailAnime from "./useDetailAnime";
import { MalInfo } from "@/types/Anime";
import useRenderStars from "../Home/useRenderingStarts";
import { Button } from "@heroui/react";
import { useState } from "react";

const DetailAnime = () => {
  const { dataAnimeId, isLoadingAnimeId } = useDetailAnime();
  const { renderStars } = useRenderStars();
  const [showTrailer, setShowTrailer] = useState(false);

  return (
    <div className="w-full">
      {!isLoadingAnimeId && dataAnimeId ? (
        <div className="relative w-full shadow-md rounded overflow-visible pb-20 bg-[#1c1c2a] text-white">
          {/* Banner Background */}
          <div className="relative w-full h-[100px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
            <Image
              src={dataAnimeId?.images?.webp?.large_image_url}
              alt={`cover-${dataAnimeId?.title}`}
              fill
              className="object-cover"
              priority
              quality={100}
            />

            {/* Gambar kecil ngambang */}
            <div className="flex bottom-[-200px] absolute md:bottom-[-100px] left-2 md:left-8 w-[120px] h-[170px] md:w-[200px] md:h-[280px] rounded overflow-hidden border-4 border-white dark:border-black shadow-xl bg-white z-10">
              <Image
                src={dataAnimeId?.images?.webp?.large_image_url}
                alt={`thumb-${dataAnimeId?.title}`}
                width={200}
                height={100}
                className="object-fill"
              />
            </div>
          </div>

          {/* Konten Detail */}
          <div className="ml-28 md:ml-60 flex flex-col md:flex-row mt-28 px-8 gap-6 justify-between">
            {/* Detail Text */}
            <div className="-mt-20">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                {dataAnimeId?.title}
              </h2>
              <h2 className="text-lg text-neutral-600 md:text-xl font-semibold mb-4">
                {dataAnimeId?.title_japanese}
              </h2>

              {/* Genre */}
              <div className="flex flex-wrap gap-2 mb-4">
                {dataAnimeId?.genres?.map((genre: MalInfo, index: number) => (
                  <span
                    key={index}
                    className="bg-gray-700 px-3 py-1 rounded text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                <p>
                  <span className="text-blue-400">📅 Released:</span>{" "}
                  {dataAnimeId?.year}
                </p>
                <p>
                  <span className="text-blue-400">📌 Status:</span>{" "}
                  {dataAnimeId?.status}
                </p>
                <p>
                  <span className="text-blue-400">📖 Total episode:</span>{" "}
                  {dataAnimeId?.episodes || "?"}
                </p>
                <p>
                  <span className="text-blue-400">🖊️ Studios:</span>{" "}
                  {dataAnimeId?.studios?.[0]?.name}
                </p>
                <p>
                  <span className="text-blue-400">📚 Type:</span>{" "}
                  {dataAnimeId?.type}
                </p>
                <p>
                  <span className="text-blue-400">🕒 Updated on:</span>{" "}
                  {new Date().toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Rating & Bookmark */}
            <div className="flex justify-center flex-col w-[120px] items-center gap-4 md:-mt-14 mb-5 ">
              <div className="text-center w-[200px] md:w-[140px] bg-[#111] p-4 rounded-md">
                <p className="text-sm mb-2">
                  Rating {dataAnimeId?.score ?? "?"}
                </p>
                <div className="flex gap-1 justify-center">
                  <span>{renderStars(dataAnimeId?.score)}</span>
                </div>
              </div>
              <Button
                onPress={() => setShowTrailer(true)}
                className="bg-red-600 w-[200px] font-semibold text-white md:w-[140px] -mt-2"
                radius="sm"
              >
                Trailer
              </Button>
            </div>
          </div>

          <div className="mx-8">
            <h1 className="text-xl mb-2 font-semibold text-foreground-400">
              Sinopsis
            </h1>
            <h2 className="border border-b-neutral-100 mb-4"></h2>
            <div className="text-foreground-500 text-justify">
              {dataAnimeId?.synopsis}
            </div>
          </div>
        </div>
      ) : null}
      {showTrailer && (
        <div className="fixed inset-0 z-[999] bg-black bg-opacity-70 flex items-center justify-center  backdrop-blur-sm">
          <div className="bg-transparent p-4 rounded-lg shadow-lg md:w-full max-w-2xl relative">
            {/* Tombol Close */}
            <button
              className="absolute w-6 h-6 text-[20px] font-bold -top-5 flex items-center justify-center rounded-full bg-white right-0 text-red-500 hover:text-red-500 leading-none"
              onClick={() => setShowTrailer(false)}
            >
              <span className="-mt-[1px]">&times;</span>
            </button>

            {/* Embed Video */}
            <div className="aspect-video">
              <iframe
                className="w-full h-full rounded-md"
                src={dataAnimeId?.trailer?.embed_url}
                title="Trailer"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailAnime;
