type MediaType = "movie" | "tv";

interface GetMedia {
  id: string;
  media?: MediaType;
}

interface SearchMedia {
  query: string;
  media?: MediaType;
}

interface GetProviders {
  id: string;
  media?: MediaType;
}

export default class TmdbClient {
  baseUrl: string;
  apiKey: string;

  constructor({ baseUrl, apiKey }: { baseUrl: string; apiKey: string }) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async getConfig() {
    const url = `https://api.themoviedb.org/3/configuration?api_key=b40fa92d7307fa0dbe5ffb7ec0f06c17`;
    return fetch(url).then((res) => res.json());
  }

  async get({ id, media = "movie" }: GetMedia) {
    const url = `https://api.themoviedb.org/3/${media}/${id}?api_key=${this.apiKey}&append_to_response=recommendations,credits`;
    return fetch(url).then((res) => res.json());
  }

  async search({ query, media = "movie" }: SearchMedia) {
    const url = `${this.baseUrl}/search/${media}?api_key=${this.apiKey}&query=${query}&page=1`;
    return fetch(url).then((res) => res.json());
  }

  async getPopularList(media: MediaType = "movie") {
    const url = `${this.baseUrl}/discover/${media}?api_key=${this.apiKey}&language=en-US&sort_by=popularity.desc`;
    return fetch(url).then((res) => res.json());
  }

  async getProviders({ id, media = "movie" }: GetProviders) {
    const url = `${this.baseUrl}/${media}/${id}}/watch/providers?api_key=${this.apiKey}&language=en-US&watch_region=US`;
    return fetch(url).then((res) => res.json());
  }

  getImage({ id, size }: { id: string; size: string }) {
    return `https://image.tmdb.org/t/p/${size}${id}`;
  }
}

export const tmdbClient = new TmdbClient({
  baseUrl: "https://api.themoviedb.org/3",
  apiKey: "b40fa92d7307fa0dbe5ffb7ec0f06c17",
});
