export interface AnimeResponse {
  data: Anime[];
  pagination: Pagination;
}

export interface Anime {
  mal_id: number;
  url: string;
  images: Images;
  name: string;
  trailer: Trailer;
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: "TV" | "Movie" | "OVA" | "Special" | "ONA" | "Music" | string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: Aired;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: Broadcast;
  producers: MalInfo[];
  licensors: MalInfo[];
  studios: MalInfo[];
  genres: MalInfo[];
  explicit_genres: MalInfo[];
  themes: MalInfo[];
  demographics: MalInfo[];
}

export interface Images {
  jpg: ImageSet;
  webp: ImageSet;
}


export interface ImageSet {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface Trailer {
  youtube_id: string;
  url: string;
  embed_url: string;
}

export interface Title {
  type: string;
  title: string;
}

export interface Aired {
  from: string;
  to: string;
  prop: AiredProp;
}

export interface AiredProp {
  from: DateParts;
  to: DateParts;
  string: string;
}

export interface DateParts {
  day: number;
  month: number;
  year: number;
}

export interface Broadcast {
  day: string;
  time: string;
  timezone: string;
  string: string;
}

export interface MalInfo {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: PaginationItems;
}

export interface PaginationItems {
  count: number;
  total: number;
  per_page: number;
}
