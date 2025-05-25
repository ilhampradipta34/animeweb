import { Anime } from "@/types/Anime";
import { Card, CardBody, CardFooter } from "@heroui/react";
import Image from "next/image";
import useRenderStars from "../useRenderingStarts";
import Link from "next/link";

interface PropTypes {
  dataTopAnime: Anime[];
}

const TopAnime = (props: PropTypes) => {
  const { dataTopAnime } = props;
  const { renderStars } = useRenderStars();
  return (
    <div className="mt-4 w-full">
      <div className="flex items-center px-8 justify-between">
        <h2 className="font-semibold text-xl md:text-3xl">Top Anime</h2>
        <Link href={`/top-anime`}>
          <p className="text-sm p-1 md:p-2 text-white rounded-md md:rounded-xl bg-blue-700 cursor-pointer">
            view all
          </p>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-7 gap-3 mt-3 px-8 cursor-pointer">
        {dataTopAnime?.slice(0, 7).map((anime, index) => (
          <Card
            key={index}
            as={Link}
            href={`/list-anime/anime/${anime.mal_id}`}
            className="w-full h-[300px] flex flex-col transition duration-300 hover:shadow-[0_0_10px_2px_#00f] hover:border hover:border-blue-200"
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

            <CardFooter className="px-2 gap-2 pt-2 flex items-start flex-col">
              <div>
                <h4 className="font-bold text-sm line-clamp-2 min-h-[2.5rem] text-left">
                  {anime.title}
                </h4>
              </div>
              <div className="text-left flex items-center gap-4 w-full justify-between">
                <p className="text-xs flex">{renderStars(anime?.score)}</p>
                <p className="text-xs font-semibold">{anime?.score}</p>
              </div>
              <small className="text-foreground-700">
                Episode {anime?.episodes}
              </small>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TopAnime;
