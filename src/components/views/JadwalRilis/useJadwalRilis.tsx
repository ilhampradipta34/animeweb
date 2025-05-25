import useChangeUrl from "@/hooks/useChangeUrl";
import animeService from "@/services/anime.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";


const useJadwalRilis = () => {
  const router = useRouter();
    const days = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];

  const { currentLimit, currentPage, currentFilterDay } = useChangeUrl();

const getAnimeSchedule = async () => {
  // eslint-disable-next-line prefer-const
  let params = `limit=${currentLimit}&page=${currentPage}&filter=${currentFilterDay}`
  const res = await animeService.getAnimeSchedule(params);;
  return res.data;
};


  const {
    data: dataAnimeSchedule,
    isLoading: isLoadingAnimeSchedule,
    isSuccess: isSuccessGetAnimeSchedule,
    isFetching: isFetchingAnimeSchedule,
    refetch: refetchingAnimeSchedule,
    isRefetching: isRefetchingAnimeSchedule,
  } = useQuery({
    queryKey: ["ANIMSCHEDULE", currentPage, currentLimit, currentFilterDay],
    queryFn: () => getAnimeSchedule(),
    enabled:
      router.isReady && !!currentPage && !!currentLimit && !!currentFilterDay,

  });
  console.log(dataAnimeSchedule);

  return {
    days,
    dataAnimeSchedule,
    isLoadingAnimeSchedule,
    isFetchingAnimeSchedule,
    refetchingAnimeSchedule,
    isRefetchingAnimeSchedule,
    isSuccessGetAnimeSchedule,
  };
};

export default useJadwalRilis;
