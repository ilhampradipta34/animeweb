import { Anime } from "@/types/Anime"
import Banner from "./Banner";
import TopAnime from "./TopAnime";
import PopularAnime from "./PopularAnime";



interface PropTypes {
    dataBanner: Anime[];
    dataTopAnime: Anime[];
    dataPopularAnime: Anime[];
}

const Home = (props: PropTypes) => {
 
    const {dataBanner, dataTopAnime, dataPopularAnime} = props;
    return (
        <div className="w-full">
           <Banner dataBanner={dataBanner}  />
           <TopAnime dataTopAnime={dataTopAnime} />
           <PopularAnime dataPopularAnime={dataPopularAnime} />
        </div>
    )
}

export default Home