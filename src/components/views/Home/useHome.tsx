import { LIMIT_POPULAR_ANIME, PAGE_DEFAULT } from "@/constants/listConstant";
import animeService from "@/services/anime.service";
import { Anime } from "@/types/Anime";
import { useState } from "react";

const useHome = (initialData: Anime[] = []) => {
  const [popularAnime, setPopularAnime] = useState<Anime[]>(initialData);
  const [currentPage, setCurrentPage] = useState(PAGE_DEFAULT);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);


  const handleViewMore = async () => {
     if (loading || !hasMore) return;

     setLoading(true);

     try {

      const nextPage = currentPage + 1;
      const params = `order_by=popularity&sort=asc&limit=${LIMIT_POPULAR_ANIME}&page=${nextPage}`
      const res = await animeService.getAnime(params)

      setPopularAnime(prev => [...prev, ...res.data.data]);
      setCurrentPage(nextPage);
      setHasMore(res.data.pagination?.has_next_page);
      
     }catch (err) {
      console.error("Failed to load more anime:", err);
    } finally {
      setLoading(false);
    }
  }


  return {
     popularAnime,
    loading,
    hasMore,
    handleViewMore,
  };
};

export default useHome;
