import {
  Checkbox,
  CheckboxGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Select,
  SelectItem,
  Skeleton,
} from "@heroui/react";
import useFilterListAnime from "./useFilterListAnime";
import { MalInfo } from "@/types/Anime";
import useChangeUrl from "@/hooks/useChangeUrl";
import useListAnime from "../useListAnime";

const FilterListAnime = () => {
  const { dataAnimeGenres, isLoadingAnimeGenres, statuses, types, orders_by } =
    useFilterListAnime();
  const {
    currentListAnimeGenre,
    handleChangeFilterListAnimeGenre,
    currentListAnimeStatus,
    handleChangeFilterListAnimeStatus,
    currentListAnimeType,
    handleChangeFilterListAnimeType,
    currentListAnimeOrderBy,
    handleChangeFilterListAnimeOrderBy,
  } = useChangeUrl();

  const { isLoadingAnime } = useListAnime();

  const genreArray =
    typeof currentListAnimeGenre === "string"
      ? currentListAnimeGenre.split(",")
      : Array.isArray(currentListAnimeGenre)
      ? currentListAnimeGenre
      : [];

  return (
    <div className="grid grid-cols-2 md:flex md:flex-row gap-4 w-full">
      <div className="flex-1">
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <Button
              className="w-full justify-between bg-neutral-300/25 dark:bg-neutral-500/40 text-foreground-500"
              endContent={
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              }
            >
              Select genre
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Genre selection"
            className="max-h-48 w-64 md:max-w-[1000px] md:max-h-96 overflow-y-auto"
            closeOnSelect={false}
          >
            <DropdownItem key="genre-list" className="p-0 dark:bg-neutral-800/40 bg-slate-100">
              <div className="w-full p-4">
                {isLoadingAnimeGenres ? (
                  <p className="text-sm text-gray-500 px-2">Memuat genre...</p>
                ) : (
                  <CheckboxGroup
                    label="Pilih Genre"
                    defaultValue={genreArray}
                    onChange={(values: string[]) => {
                      // values adalah array dari nilai yang dicentang
                      const genreString = values.join(",");
                      handleChangeFilterListAnimeGenre(genreString);
                    }}
                  >
                    <div className="grid md:grid-cols-6 md:gap-5 md:py-2">
                      {dataAnimeGenres?.data?.map((genre: MalInfo) => (
                        <div
                          key={genre.mal_id}
                          className="flex items-center space-x-2  p-2 rounded"
                        >
                          <Checkbox value={String(genre.mal_id)}>
                            <span className="break-words">{genre.name}</span>
                          </Checkbox>
                        </div>
                      ))}
                    </div>
                  </CheckboxGroup>
                )}
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      {/* Tempat filter status lainnya */}
      <div className="flex-1">
        {!isLoadingAnime ? (
          <Select
            className="max-w-xs font-bold"
            size="md"
            placeholder="Select status"
            defaultSelectedKeys={[`${currentListAnimeStatus}`]}
            onChange={(e) => handleChangeFilterListAnimeStatus(e.target.value)}
          >
            {statuses.map((status) => (
              <SelectItem className="rounded-md capitalize" key={status}>
                {status}
              </SelectItem>
            ))}
          </Select>
        ) : (
          <div>
            <Skeleton className="h-8 w-5/6 rounded-md" />
          </div>
        )}
      </div>
      <div className="flex-1">
        {!isLoadingAnime ? (
          <Select
            className="max-w-xs font-bold"
            size="md"
            placeholder="Select type"
            defaultSelectedKeys={[`${currentListAnimeType}`]}
            onChange={(e) => handleChangeFilterListAnimeType(e.target.value)}
          >
            {types.map((type) => (
              <SelectItem className="rounded-md capitalize" key={type}>
                {type}
              </SelectItem>
            ))}
          </Select>
        ) : (
          <div>
            <Skeleton className="h-8 w-5/6 rounded-md" />
          </div>
        )}
      </div>
      <div className="flex-1">
        {!isLoadingAnime ? (
          <Select
            className="max-w-xs font-bold"
            size="md"
            placeholder="Select order_by"
            defaultSelectedKeys={[`${currentListAnimeOrderBy}`]}
            onChange={(e) => handleChangeFilterListAnimeOrderBy(e.target.value)}
          >
            {orders_by.map((orderby) => (
              <SelectItem className="rounded-md capitalize" key={orderby}>
                {orderby}
              </SelectItem>
            ))}
          </Select>
        ) : (
          <div>
            <Skeleton className="h-8 w-5/6 rounded-md" />
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterListAnime;
