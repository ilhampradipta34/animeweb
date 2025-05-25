import { useRouter } from "next/router";
import {
  FilterDay,
  LIMIT_DEFAULT,
  LIMIT_DEFAULT_ANIME,
  PAGE_DEFAULT,
} from "@/constants/listConstant";
import { ChangeEvent } from "react";

const useChangeUrl = () => {
  const router = useRouter();
  // const debounce = useDeboundce();

  const currentLimit = Number(router.query.limit);
  const currentPage = Number(router.query.page);
  const currentSearch = router.query.search;
  const currentFilterDay = router.query.filter;
  const currentTopAnimeFilter = router.query.filter;
  const currentListAnimeGenre = router.query.genres;
  const currentListAnimeStatus = router.query.status;
  const currentListAnimeType = router.query.type;
  const currentListAnimeOrderBy = router.query.order_by;

  const setUrl = () => {
    router.replace({
      query: {
        limit: currentLimit || LIMIT_DEFAULT,
        page: currentPage || PAGE_DEFAULT,
        search: currentSearch || "",
      },
    });
  };

  const setUrlJadwalRilis = () => {
    router.replace({
      query: {
        limit: currentLimit || LIMIT_DEFAULT,
        page: currentPage || PAGE_DEFAULT,
        filter: currentFilterDay || FilterDay,
      },
    });
  };

  const handleChangeFilterDay = (filter: string) => {
    router.push({
      query: {
        ...router.query,
        filter,
        page: PAGE_DEFAULT,
      },
    });
  };
  const setUrlTopAnime = () => {
    router.replace({
      query: {
        limit: currentLimit || LIMIT_DEFAULT,
        page: currentPage || PAGE_DEFAULT,
        filter: currentTopAnimeFilter || "",
      },
    });
  };

  const handleChangeFilterTopAnime = (filter: string) => {
    router.push({
      query: {
        ...router.query,
        filter,
        page: PAGE_DEFAULT,
      },
    });
  };

  const setUrlListAnime = () => {
    const query: Record<string, string | number> = {
      limit: currentLimit || LIMIT_DEFAULT_ANIME,
      page: currentPage || PAGE_DEFAULT,
    };

    if (currentListAnimeGenre) {
      query.genres = Array.isArray(currentListAnimeGenre)
        ? currentListAnimeGenre.join(",")
        : currentListAnimeGenre;
    }

    if (currentListAnimeStatus) {
      query.status = Array.isArray(currentListAnimeStatus)
        ? currentListAnimeStatus.join(",")
        : currentListAnimeStatus;
    }

    if (currentListAnimeType) {
      query.type = Array.isArray(currentListAnimeType)
        ? currentListAnimeType.join(",")
        : currentListAnimeType;
    }

    if (currentListAnimeOrderBy) {
      query.order_by = Array.isArray(currentListAnimeOrderBy)
        ? currentListAnimeOrderBy.join(",")
        : currentListAnimeOrderBy;
    }

    router.replace({ query });
  };

  //   const handleChangeFilterListAnimeGenre = (genres: string) => {
  //   router.push({
  //     query: {
  //       ...router.query,
  //       genres,
  //       page: PAGE_DEFAULT,
  //     },
  //   });
  // };

  const handleChangeFilterListAnimeGenre = (genres: string) => {
    const updatedQuery = { ...router.query };

    // Hapus genres jika kosong
    if (!genres) {
      delete updatedQuery.genres;
    } else {
      updatedQuery.genres = genres;
    }

    // Reset page
    updatedQuery.page = String(PAGE_DEFAULT);

    router.push({
      query: updatedQuery,
    });
  };
  const handleChangeFilterListAnimeStatus = (status: string) => {
    const updatedQuery = { ...router.query };

    // Hapus status jika kosong
    if (!status) {
      delete updatedQuery.status;
    } else {
      updatedQuery.status = status;
    }

    // Reset page
    updatedQuery.page = String(PAGE_DEFAULT);

    router.push({
      query: updatedQuery,
    });
  };

  const handleChangeFilterListAnimeType = (type: string) => {
    const updatedQuery = { ...router.query };

    // Hapus type jika kosong
    if (!type) {
      delete updatedQuery.type;
    } else {
      updatedQuery.type = type;
    }

    // Reset page
    updatedQuery.page = String(PAGE_DEFAULT);

    router.push({
      query: updatedQuery,
    });
  };

   const handleChangeFilterListAnimeOrderBy = (order_by: string) => {
    const updatedQuery = { ...router.query };

    // Hapus order_by jika kosong
    if (!order_by) {
      delete updatedQuery.order_by;
    } else {
      updatedQuery.order_by = order_by;
    }

    // Reset page
    updatedQuery.page = String(PAGE_DEFAULT);

    router.push({
      query: updatedQuery,
    });
  };
  
  // const handleChangeIsFeatured = (isFeatured: string) => {
  //   router.push({
  //     query: {
  //       ...router.query,
  //       isFeatured,
  //       page: PAGE_DEFAULT
  //     }
  //   })
  // }

  const handleChangePage = (page: number) => {
    router.push({
      query: {
        ...router.query,
        page,
      },
    });
  };

  const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedLimit = e.target.value;

    router.push({
      query: {
        ...router.query,
        limit: selectedLimit,
        page: PAGE_DEFAULT,
      },
    });
  };

  // const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
  //   debounce(() => {
  //     const search = e.target.value;
  //     router.push({
  //       query: {
  //         ...router.query,
  //         search,
  //         page: PAGE_DEFAULT,
  //       },
  //     });
  //   }, DELAY);
  // };

  // const handleClearSearch = () => {
  //   router.push({
  //     query: {
  //       ...router.query,
  //       search: "",
  //       page: PAGE_DEFAULT,
  //     },
  //   });
  // };

  return {
    currentLimit,
    currentPage,
    currentSearch,
    currentTopAnimeFilter,
    currentFilterDay,
    currentListAnimeGenre,
    currentListAnimeOrderBy,
    currentListAnimeStatus,
    currentListAnimeType,

    setUrl,
    setUrlListAnime,
    setUrlJadwalRilis,
    handleChangeFilterDay,
    handleChangeLimit,
    handleChangeFilterListAnimeGenre,
    handleChangeFilterListAnimeStatus,
    handleChangeFilterListAnimeType,
    handleChangeFilterListAnimeOrderBy,
    handleChangePage,
    setUrlTopAnime,
    handleChangeFilterTopAnime,
    // handleSearch,
    // handleClearSearch,
    // setUrlExplore,
    // handleChangeCategory,
    // handleChangeIsFeatured,
    // handleChangeIsOnline
  };
};

export default useChangeUrl;
