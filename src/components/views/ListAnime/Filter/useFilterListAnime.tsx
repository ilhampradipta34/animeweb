import animeService from "@/services/anime.service"
import { useQuery } from "@tanstack/react-query";

const useFilterListAnime = () => {

    const getAnimeGenres = async () => {
        const res = await animeService.getGenresAnime()
        const {data} = res;
        return data;
    }

    const {
        data: dataAnimeGenres,
        isLoading: isLoadingAnimeGenres
    } = useQuery({
        queryKey: ["animeGenres"],
        queryFn: getAnimeGenres,
    })

    const statuses = [
        "airing", "complete", "upcoming"
    ]
    const types = [
        "tv",
        "movie",
        "ova", 
        "special",
        "ona",
        "music",
        "cm",
        "pv",
        "tv_special"
    ]

    const orders_by = [
        "title", "episodes", "score", "rank", "popularity", "members", "favorites"
    ]

    return {
        dataAnimeGenres,
        isLoadingAnimeGenres,
        statuses,
        types,
        orders_by
    }
}

export default useFilterListAnime;