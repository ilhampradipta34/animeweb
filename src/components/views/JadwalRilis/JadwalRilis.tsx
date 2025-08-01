import useChangeUrl from "@/hooks/useChangeUrl";
import useJadwalRilis from "./useJadwalRilis";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Card, CardBody, CardFooter, Skeleton } from "@heroui/react";
import Image from "next/image";
import useRenderStars from "../Home/useRenderingStarts";
import { Anime } from "@/types/Anime";
import { LIMIT_DEFAULT } from "@/constants/listConstant";
import FooterJadwalRilis from "./Footer";
import Link from "next/link";

const JadwalRilis = () => {
  const router = useRouter();
  const { renderStars } = useRenderStars();
  const {
    handleChangeFilterDay,
    setUrlJadwalRilis,
    currentFilterDay,
  } = useChangeUrl();

  const {
    days,
    dataAnimeSchedule,
    isLoadingAnimeSchedule,
    isFetchingAnimeSchedule,
  } = useJadwalRilis();
  const jumlahAnimeHariIni = dataAnimeSchedule?.pagination?.items?.total;

  // Saat router sudah siap, set URL jadwal rilis sesuai state/url sekarang
  useEffect(() => {
    if (router.isReady) {
      setUrlJadwalRilis();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return (
    <div className="flex w-full -mt-5 md:justify-between">
      <div className="w-1/6">
        <div className="flex flex-col gap-5 sticky top-20 z-10">
          {days.map((day) => (
            <div key={day} className="w-full">
              <button
                onClick={() => {
                  handleChangeFilterDay(day);
                }}
                className={`py-2 w-full rounded-tr-lg border-sky-400 border font-semibold text-sm capitalize shadow-lg line-clamp-1 px-1 mx-1 transition-colors duration-1000 ${
                  currentFilterDay === day
                    ? "bg-sky-400 text-black"
                    : "bg-black/5 dark:text-white"
                }`}
              >
                {day}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="w-5/6 md:w-full mx-5">
        <div>
          <div className="flex items-center gap-4">
            <h2 className="font-bold text-blue-500 text-xl md:text-2xl capitalize">
              {currentFilterDay}
            </h2>
            <div className="h-0.5 bg-blue-500 flex-1" />
          </div>

          {currentFilterDay && (
            <div>
              {jumlahAnimeHariIni === null ||
              jumlahAnimeHariIni === undefined ? (
                <Skeleton className="h-6 w-1/6 rounded-md" />
              ) : (
                <span className="text-sm md:text-base ml-1 font-semibold">
                  ({jumlahAnimeHariIni} Anime)
                </span>
              )}
            </div>
          )}
        </div>
        <div className="mt-3">
          {isLoadingAnimeSchedule || isFetchingAnimeSchedule ? (
            // Loading skeleton
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-5">
              {Array.from({ length: LIMIT_DEFAULT }).map((_, i) => (
                <Card key={i} className="h-[300px] flex flex-col">
                  <CardBody className="p-2">
                    <Skeleton className="rounded-xl w-full h-44 bg-gray-300 animate-pulse" />
                  </CardBody>
                  <CardFooter className="px-4 gap-1 pt-2 flex items-start flex-col">
                    <div className="bg-gray-300 rounded-md w-1/3 h-4 animate-pulse mb-1" />
                    <Skeleton className="min-h-[1.5rem] text-left bg-gray-300 rounded-md w-full h-5 animate-pulse mb-1" />
                    <div className="text-left flex items-center w-full justify-between">
                      <Skeleton className="bg-gray-300 rounded-md w-2/3 h-4 animate-pulse" />
                      <Skeleton className="bg-gray-300 rounded-md w-1/4 h-4 animate-pulse" />
                    </div>
                    <div className="bg-gray-300 rounded-md w-1/3 h-4 animate-pulse" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : dataAnimeSchedule?.data?.length > 0 ? (
            // Anime grid
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-5">
              {dataAnimeSchedule.data.map((anime: Anime, index: number) => (
                <Card
                  as={Link}
                  href={`/list-anime/anime/${anime.mal_id}`}
                  key={`jadwalrilis-${anime.mal_id}-${index}`}
                  className="h-[300px] cursor-pointer flex flex-col transition duration-300 hover:shadow-[0_0_10px_2px_#00f] hover:border hover:border-blue-200"
                >
                  <CardBody className="p-2">
                    <Image
                      alt={anime.title}
                      className="object-cover rounded-xl w-full h-[180px] overflow-hidden"
                      src={anime?.images?.jpg?.large_image_url}
                      width={270}
                      height={100}
                    />
                  </CardBody>
                  <CardFooter className="px-4 gap-1 pt-2 flex items-start flex-col">
                    <small className="text-foreground-700">{anime?.type}</small>
                    <h4 className="font-bold text-sm line-clamp-1 min-h-[1.5rem] text-left">
                      {anime.title}
                    </h4>
                    <div className="text-left flex items-center w-full justify-between">
                      <p className="text-base flex">
                        {renderStars(anime?.score) || "-"}
                      </p>
                      <p className="text-base font-semibold">{anime?.score}</p>
                    </div>
                    <small className="text-foreground-700 mb-2">
                      Episode {anime?.episodes || "-"}
                    </small>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            // No data
            <div className="flex flex-col items-center justify-center gap-4 py-20">
              <Image
                src="/images/no-data.svg"
                alt="no-data"
                width={200}
                height={200}
                className="rounded-none"
              />
              <h2 className="font-bold text-center text-2xl text-danger">
                Anime is empty
              </h2>
            </div>
          )}
        </div>

        {/* pagination */}
        <div className="mt-5">
          {!isLoadingAnimeSchedule && dataAnimeSchedule?.data?.length > 0 && (
            <FooterJadwalRilis
              totalPages={dataAnimeSchedule?.pagination?.last_visible_page}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default JadwalRilis;
