import animeService from "@/services/anime.service"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

const useDetailAnime = () => {
    const {isReady, query} = useRouter()

    const getAnimeById = async () => {
        const {data} = await animeService.getAnimeById(`${query.id}`)
        return data.data 
    }

    const {data: dataAnimeId, refetch: refetchAnimeID, isLoading: isLoadingAnimeId} = useQuery({
        queryKey: ["AnimeId"],
        queryFn: getAnimeById,
        enabled: isReady
    })

    return {
        dataAnimeId,
        refetchAnimeID,
        isLoadingAnimeId
    }
}

export default useDetailAnime;