import useChangeUrl from "@/hooks/useChangeUrl";
import animeService from "@/services/anime.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";


const useListAnime = () => {
  const router = useRouter();
 

  const { currentLimit, currentPage, currentListAnimeGenre, currentListAnimeOrderBy, currentListAnimeStatus, currentListAnimeType } = useChangeUrl();

const getAnime = async () => {
  
  let params = `limit=${currentLimit}&page=${currentPage}`
  if (currentListAnimeGenre) {
    params += `&genres=${currentListAnimeGenre}`
  }
  if (currentListAnimeStatus) {
    params += `&status=${currentListAnimeStatus}`
  }
  if (currentListAnimeType) {
    params += `&type=${currentListAnimeType}`
  }
  if (currentListAnimeOrderBy) {
    params += `&order_by=${currentListAnimeOrderBy}`
  }

  const res = await animeService.getAnime(params);
  const {data} = res
  return data;
};

  const {
    data: dataAnime,
    isLoading: isLoadingAnime,
    isSuccess: isSuccessGetAnime,
    isFetching: isFetchingAnime,
    refetch: refetchingAnime,
    isRefetching: isRefetchingAnime,
  } = useQuery({
    queryKey: ["ANIM", currentPage, currentLimit, currentListAnimeGenre, currentListAnimeStatus, currentListAnimeType, currentListAnimeOrderBy],
    queryFn: () => getAnime(),
    enabled:
      router.isReady && !!currentPage && !!currentLimit,

  });


  return {
    dataAnime,
    isLoadingAnime,
    isFetchingAnime,
    refetchingAnime,
    isRefetchingAnime,
    isSuccessGetAnime,
  };
};

export default useListAnime;
