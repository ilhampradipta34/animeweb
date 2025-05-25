import endpoint from "./endpoint.constant";
import instance from "@/libs/axios/instance";

const animeService = {
    getAnime: (params? : string) => instance.get(`${endpoint.ANIME}?${params}`),
    getAnimeById: (id : string) => instance.get(`${endpoint.ANIME}/${id}`),
    getAnimeSeasonNow: () => instance.get(`${endpoint.SEASON}/now`),
    getTopAnime: (params?: string) => instance.get(`${endpoint.TOP}${endpoint.ANIME}?${params}`),
    getAnimeSchedule: (params?: string) => instance.get(`${endpoint.SCHEDULES}?${params}`),
    getTopCharacters: () => instance.get(`${endpoint.TOP}/characters`),
    getGenresAnime: () => instance.get(`${endpoint.GENRES}${endpoint.ANIME}`),
}

export default animeService;
