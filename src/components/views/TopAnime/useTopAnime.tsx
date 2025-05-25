import useChangeUrl from "@/hooks/useChangeUrl";
import animeService from "@/services/anime.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";


const useTopAnime = () => {
  const router = useRouter()  

  const filterTopAnime = [
    "airing",
    "upcoming",
    "bypopularity",
    "favorite"
  ]

const {currentLimit, currentPage, currentTopAnimeFilter} = useChangeUrl()

    const getTopAnime = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentTopAnimeFilter) {
      params += `&filter=${currentTopAnimeFilter}`
    }
    const res = await animeService.getTopAnime(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataTopAnimePage,
    isLoading: isLoadingTopAnimePage,
    refetch: refetchingTopAnimePage,
    isRefetching: isRefetchingTopAnimePage,
  } = useQuery({
    queryKey: ["topanimepage", currentPage, currentLimit, currentTopAnimeFilter],
    queryFn: () => getTopAnime(),
    enabled: router.isReady  && !!currentPage && !!currentLimit,
  });

  const getTopCharacter = async () =>{
    const res = await animeService.getTopCharacters()
    const {data} = res;
    return data
  }

    const {
    data: dataTopAnimeCharacter,
    isLoading: isLoadingTopAnimeCharacter,
  } = useQuery({
    queryKey: ["topcharacters"],
    queryFn: () => getTopCharacter(),
  });


  return {
    filterTopAnime,
    dataTopAnimePage,
    isLoadingTopAnimePage,
    refetchingTopAnimePage,
    isRefetchingTopAnimePage,
    dataTopAnimeCharacter,
    isLoadingTopAnimeCharacter
  };
};

export default useTopAnime;
