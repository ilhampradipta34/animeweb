import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import Home from "@/components/views/Home";
import { LIMIT_POPULAR_ANIME, PAGE_DEFAULT } from "@/constants/listConstant";
import animeService from "@/services/anime.service";
import { Anime } from "@/types/Anime";

export async function getServerSideProps() {
  try{

    const [seasonNowRes, topAnimeRes, popularAnimeRes, ] = await Promise.all([
      animeService.getAnimeSeasonNow(),
      animeService.getTopAnime(),
      animeService.getAnime(`order_by=popularity&sort=asc&limit=${LIMIT_POPULAR_ANIME}&page=${PAGE_DEFAULT}`),
      // animeService.getAnime(`status=Currently Airing&order_by=score&sort=asc`),
    ]);

    return {
      props: {
        seasonNow: seasonNowRes.data.data,
        topAnime: topAnimeRes.data.data,
        popularAnime: popularAnimeRes.data.data,
        // onGoingAnime: onGoingAnime.data.data,
      }
    };

  } catch (error) {
     console.error(error);
    return {
      props: {
        seasonNow: [],
        topAnime: [],
        popularAnime: [],
        error: 'Failed to fetch data'
      }
    };
  }
}

interface PropTypes {
  seasonNow: Anime[];
  topAnime: Anime[];
  popularAnime: Anime[];
  // onGoingAnime: Anime[];
}


const HomePage = (props: PropTypes) => {
  const {seasonNow, topAnime, popularAnime, } = props;
  
  return (
   <LandingPageLayout title="Home">
      <Home dataBanner={seasonNow} dataTopAnime={topAnime} dataPopularAnime={popularAnime} />
   </LandingPageLayout>
  )
}

export default HomePage;