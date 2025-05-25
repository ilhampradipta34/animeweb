import { DELAY } from "@/constants/listConstant";
import useDebounce from "@/hooks/useDebounce";
import animeService from "@/services/anime.service";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";

const useNavbar = () => {

    const [search, setSearch] = useState("")
    const debounce = useDebounce()

    const getAnimeSearch = async () => {
        const params = `q=${search}`;
        const res = await animeService.getAnime(params);
        const {data} = res
        return data
    }

     const { data: dataAnimeSearch, isLoading: isLoadingAnimeSearch, isRefetching: isRefetchingAnimeSearch } =
    useQuery({
      queryKey: ["AnimeSearch", search],
      queryFn: getAnimeSearch,
      enabled: !!search
    });

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        debounce(() => setSearch(e.target.value), DELAY);
    }

    return {
        dataAnimeSearch, isLoadingAnimeSearch, isRefetchingAnimeSearch, handleSearch,
        search, setSearch
    }
}

export default useNavbar;