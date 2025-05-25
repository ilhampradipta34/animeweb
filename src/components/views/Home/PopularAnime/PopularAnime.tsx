import { Anime } from "@/types/Anime";
import { Card, CardBody, CardFooter, Spinner } from "@heroui/react";
import Image from "next/image";
import useHome from "../useHome";
import useRenderStars from "../useRenderingStarts";
import Link from "next/link";

interface PropTypes {
  dataPopularAnime: Anime[];
}

const PopularAnime = (props: PropTypes) => {
  const { dataPopularAnime } = props;
  const { renderStars } = useRenderStars();
  const { handleViewMore, hasMore, loading, popularAnime } =
    useHome(dataPopularAnime);
  return (
    <div className="mt-6 w-full">
      <div className="flex items-center px-8 justify-between">
        <h2 className="font-semibold text-3xl">Popular Anime</h2>
      </div>
      <div className="w-full mt-3 grid gap-3 grid-cols-2 md:grid-cols-5 px-8 cursor-pointer">
        {popularAnime?.map((anime, index) => (
          <Card
            key={index}
            as={Link}
            href={`/list-anime/anime/${anime.mal_id}`}
            className="h-[300px] flex flex-col transition duration-300 hover:shadow-[0_0_10px_2px_#00f] hover:border hover:border-blue-200"
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
              <div>
                <h4 className="font-bold text-sm line-clamp-1 min-h-[1.5rem] text-left">
                  {anime.title}
                </h4>
              </div>
              <div className="text-left flex items-center w-full justify-between">
                <p className="text-base flex">{renderStars(anime?.score)}</p>
                <p className="text-base font-semibold">{anime?.score}</p>
              </div>
              <small className="text-foreground-700 mb-2">
                  Episode {anime?.episodes}
                </small>
             
            </CardFooter>
          </Card>
        ))}
      </div>
      {hasMore && !loading && (
        <div className="text-center mt-4">
          <button
            onClick={handleViewMore}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            View More
          </button>
        </div>
      )}

      {loading && (
        <div className="text-center mt-2">
          <Spinner color="primary" label="Loading..." />
        </div>
      )}
    </div>
  );
};

export default PopularAnime;
