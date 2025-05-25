// import useChangeUrl from "@/hooks/useChangeUrl";
import useChangeUrl from "@/hooks/useChangeUrl";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Card, CardBody, CardFooter, Skeleton } from "@heroui/react";
import Image from "next/image";
import useRenderStars from "../Home/useRenderingStarts";
import { Anime } from "@/types/Anime";
import { LIMIT_DEFAULT } from "@/constants/listConstant";
import FooterListAnime from "./Footer";
import Link from "next/link";
import FilterListAnime from "./Filter";
import useListAnime from "./useListAnime";

const ListAnime = () => {
  const router = useRouter();
  const { renderStars } = useRenderStars();
  const {
    //   currentLimit,
    //   currentPage,
    setUrlListAnime,
  } = useChangeUrl();

  const { dataAnime, isLoadingAnime, isFetchingAnime } = useListAnime();

  // Saat router sudah siap, set URL jadwal rilis sesuai state/url sekarang
  useEffect(() => {
    if (router.isReady) {
      setUrlListAnime();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return (
    <div className="flex w-full -mt-5 justify-between">
      <div className="w-full mx-3 md:mx-8">
        <h2 className="text-xl md:text-2xl font-bold text-blue-600 mb-4 border-b border-blue-200 pb-2 tracking-wide">
          List Anime
        </h2>
        <FilterListAnime />
        <div className="mt-3">
          {isLoadingAnime || isFetchingAnime ? (
            // Loading skeleton
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
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
          ) : dataAnime?.data?.length > 0 ? (
            // Anime grid
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
              {dataAnime.data.map((anime: Anime, index: number) => (
                <Card
                as={Link} href={`/list-anime/anime/${anime.mal_id}`}
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

        <div className="mt-5">
          {!isLoadingAnime && dataAnime?.data?.length > 0 && (
            <FooterListAnime
              totalPages={dataAnime?.pagination?.last_visible_page}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ListAnime;
