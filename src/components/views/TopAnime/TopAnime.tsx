import useChangeUrl from "@/hooks/useChangeUrl";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useTopAnime from "./useTopAnime";
import { LIMIT_DEFAULT } from "@/constants/listConstant";
import {
  Card,
  CardBody,
  CardFooter,
  Select,
  SelectItem,
  Skeleton,
} from "@heroui/react";
import { Anime } from "@/types/Anime";
import Image from "next/image";
import FooterTopAnime from "./Footer";
import Link from "next/link";

const TopAnime = () => {
  const router = useRouter();
  const { setUrlTopAnime, handleChangeFilterTopAnime, currentTopAnimeFilter } =
    useChangeUrl();
  const {
    dataTopAnimePage,
    isLoadingTopAnimePage,
    isRefetchingTopAnimePage,
    filterTopAnime,
    dataTopAnimeCharacter,
    isLoadingTopAnimeCharacter,
  } = useTopAnime();

  useEffect(() => {
    if (router.isReady) {
      setUrlTopAnime();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return (
    <div className="w-full -mt-5">
      <div className="px-8 flex items-center gap-2 mb-4">
        <h2 className="font-bold text-2xl">Top Anime</h2>
        <div className="flex-1 h-0.5 bg-blue-500" />
      </div>
      <div className="block md:hidden px-8 mb-4">
        {!isLoadingTopAnimePage ? (
          <Select
            className="max-w-full font-bold"
            label="Filter"
            placeholder="Pilih filter"
            labelPlacement="inside"
            defaultSelectedKeys={[`${currentTopAnimeFilter}`]}
            onChange={(e) => handleChangeFilterTopAnime(e.target.value)}
          >
            {filterTopAnime.map((filter) => (
              <SelectItem className="rounded-md capitalize" key={filter}>
                {filter}
              </SelectItem>
            ))}
          </Select>
        ) : (
          <Skeleton className="h-8 w-full rounded-md" />
        )}
      </div>
      <div className="mx-8 flex gap-4">
        <div className="hidden md:block w-1/4">
          {!isLoadingTopAnimePage ? (
            <Select
              className="max-w-xs font-bold"
              label="Filter"
              placeholder="Pilih filter"
              labelPlacement="outside"
              defaultSelectedKeys={[`${currentTopAnimeFilter}`]}
              onChange={(e) => handleChangeFilterTopAnime(e.target.value)}
            >
              {filterTopAnime.map((filter) => (
                <SelectItem className="rounded-md capitalize" key={filter}>
                  {filter}
                </SelectItem>
              ))}
            </Select>
          ) : (
            <div>
              <Skeleton className="h-8 w-5/6 rounded-md" />
            </div>
          )}
          <div className="mt-4 max-h-[500px]p-4">
            <h2 className="text-xl font-bold mb-4 dark:text-white text-black text-center drop-shadow-sm">
              Top 10 Favorite Anime Characters
            </h2>

            {!isLoadingTopAnimeCharacter
              ? dataTopAnimeCharacter?.data
                  .slice(0, 10)
                  .map((character: Anime, index: number) => (
                    <div
                      key={`topChar-${character}-${index}`}
                      className="flex gap-4 items-start mb-6"
                    >
                      <span
                        key={index}
                        className="border p-2 rounded-md h-fit mt-2 shadow-md bg-blue-500 text-white"
                      >
                        {index + 1}
                      </span>
                      <Card className="w-full shadow-md h-[50px] border border-gray-500">
                        <div className="relative flex flex-col">
                          {/* Nama karakter */}
                          <h3 className="absolute text-white font-bold text-base mb-2 ml-2 drop-shadow-[2px_2px_3px_#4B0082]">
                            {character.name}
                          </h3>

                          {/* Gambar karakter */}
                          <Image
                            alt={`topCharacter-${index}`}
                            className="aspect-video rounded-md"
                            src={character.images.webp.image_url}
                            width={270}
                            height={30} // biar proporsional tinggi gambar
                          />
                        </div>
                      </Card>
                    </div>
                  ))
              : null}
          </div>
        </div>

        <div className="w-full">
          {isLoadingTopAnimePage || isRefetchingTopAnimePage ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {Array.from({
                length: dataTopAnimePage?.data?.length || LIMIT_DEFAULT,
              }).map((_, i) => (
                <Card key={i} className="h-[300px] flex flex-col">
                  <CardBody className="p-2">
                    <Skeleton className="rounded-xl w-full h-44 bg-gray-300 animate-pulse" />
                  </CardBody>
                  <CardFooter className="px-4 gap-1 pt-2 flex items-start flex-col">
                    <div className="bg-gray-300 rounded-md w-1/3 h-4 animate-pulse mb-1" />
                    <div>
                      <Skeleton className="min-h-[1.5rem] text-left bg-gray-300 rounded-md w-full h-5 animate-pulse mb-1" />
                    </div>
                    <div className="text-left flex items-center w-full justify-between">
                      <Skeleton className="text-base flex bg-gray-300 rounded-md w-2/3 h-4 animate-pulse" />
                      <Skeleton className="text-base font-semibold bg-gray-300 rounded-md w-1/4 h-4 animate-pulse" />
                    </div>
                    <div className="text-foreground-700 mb-2 bg-gray-300 rounded-md w-1/3 h-4 animate-pulse" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : dataTopAnimePage?.data?.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {dataTopAnimePage?.data?.map((anime: Anime, index: number) => (
                <Card
                  as={Link}
                  href={`/list-anime/anime/${anime.mal_id}`}
                  key={`topanime-${anime.mal_id}-${index}`}
                  onClick={() => router.push(`/anime/${anime.mal_id}`)}
                  className="max-h-[350px] cursor-pointer flex flex-col transition duration-300 hover:shadow-[0_0_10px_2px_#00f] hover:border hover:border-blue-200"
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

                  <CardFooter className="px-4 gap-1 flex items-start flex-col">
                    <small className="text-foreground-700">{anime?.type}</small>
                    <div>
                      <h4 className="font-bold text-sm line-clamp-1 min-h-[1.5rem] text-left">
                        {anime.title}
                      </h4>
                    </div>
                    <div className="text-left flex items-center w-full gap-2">
                      <p className="text-sm font-semibold rounded-md bg-blue-400 text-white px-2 py-1">
                        {anime?.score || "-"}
                      </p>
                      <p className="text-sm flex">{anime?.year || "-"}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {anime?.genres?.length
                        ? anime.genres.slice(0, 4).map((genre) => (
                            <small
                              key={genre.mal_id}
                              className="rounded-md border border-gray-400 px-2 py-0.5 text-xs dark:text-foreground-700 text-gray-700"
                            >
                              {genre.name}
                            </small>
                          ))
                        : "-"}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            dataTopAnimePage?.data?.length < 1 &&
            !isLoadingTopAnimePage &&
            !isRefetchingTopAnimePage && (
              <div className="flex flex-col items-center justify-center gap-4 py-20">
                <Image
                  src={"/images/no-data.svg"}
                  alt="no-data"
                  width={200}
                  height={200}
                  className="rounded-none"
                />
                <h2 className="font-bold text-center text-2xl text-danger">
                  Anime is empty
                </h2>
              </div>
            )
          )}
          <div className="mt-5">
            {!isLoadingTopAnimePage && dataTopAnimePage?.data?.length > 0 && (
              <FooterTopAnime
                totalPages={dataTopAnimePage?.pagination?.last_visible_page}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopAnime;
