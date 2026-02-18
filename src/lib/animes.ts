import { readFileSync } from "fs";
import { join } from "path";

export interface Anime {
  id: string;
  titulo: string;
  titulo_japones: string | null;
  capa: string | null;
  banner: string | null;
  sinopse: string | null;
  generos: string[];
  status: string | null;
  episodios: number | null;
  nota: number | null;
  estudio: string | null;
  ano: number | null;
}

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

export interface AnimesPaginados {
  animes: Anime[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetAnimesOptions {
  page?: number;
  limit?: number;
}

function paginar(animes: Anime[], page: number, limit: number): AnimesPaginados {
  const total = animes.length;
  const limitClamped = Math.min(Math.max(1, limit), MAX_LIMIT);
  const totalPages = Math.ceil(total / limitClamped) || 1;
  const pageClamped = Math.max(1, Math.min(page, totalPages));
  const start = (pageClamped - 1) * limitClamped;
  const animesPagina = animes.slice(start, start + limitClamped);
  return {
    animes: animesPagina,
    total,
    page: pageClamped,
    limit: limitClamped,
    totalPages,
  };
}

export function getAnimes(): Anime[];
export function getAnimes(options: GetAnimesOptions): AnimesPaginados;
export function getAnimes(
  options?: GetAnimesOptions
): Anime[] | AnimesPaginados {
  const filePath = join(process.cwd(), "src/db/db.json");
  const raw = readFileSync(filePath, "utf-8");
  const animes = JSON.parse(raw).animes as Anime[];

  if (options?.page != null || options?.limit != null) {
    const page = options?.page ?? DEFAULT_PAGE;
    const limit = options?.limit ?? DEFAULT_LIMIT;
    return paginar(animes, page, limit);
  }

  return animes;
}

export function getAnimesPaginados(
  animes: Anime[],
  page: number = DEFAULT_PAGE,
  limit: number = DEFAULT_LIMIT
): AnimesPaginados {
  return paginar(animes, page, limit);
}

export function getAnimeById(id: string): (Anime & { relacionados?: Anime[] }) | null {
  const animes = getAnimes();
  const anime = animes.find((a) => a.id === id) ?? null;
  if (!anime) return null;
  const relacionados = animes
    .filter(
      (a) =>
        a.id !== anime.id &&
        a.generos.some((g) => anime.generos.includes(g))
    )
    .slice(0, 8);
  return { ...anime, relacionados };
}
