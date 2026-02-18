/**
 * generate-db.mjs
 * node generate-db.mjs
 */

import fs from "fs";
import { randomUUID } from "crypto";

const TOTAL_ANIMES = 250;
const JIKAN_PAGE_LIMIT = 25;
const JIKAN_PAGES = Math.ceil(TOTAL_ANIMES / JIKAN_PAGE_LIMIT);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchJikan() {
  console.log(`Buscando animes na Jikan (${TOTAL_ANIMES} animes, ${JIKAN_PAGES} páginas)...`);
  const animes = [];

  for (let page = 1; page <= JIKAN_PAGES; page++) {
    const res = await fetch(`https://api.jikan.moe/v4/top/anime?limit=${JIKAN_PAGE_LIMIT}&page=${page}`);
    const json = await res.json();
    animes.push(...json.data);
    await sleep(500);
  }

  return animes.slice(0, TOTAL_ANIMES);
}

async function fetchAniListBanners() {
  console.log("Buscando banners na AniList...");

  const query = `
    query {
      Page(page: 1, perPage: ${TOTAL_ANIMES}) {
        media(type: ANIME, sort: POPULARITY_DESC) {
          title { english romaji }
          bannerImage
        }
      }
    }
  `;

  const res = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  const json = await res.json();
  const map = {};

  for (const item of json.data.Page.media) {
    const key = (item.title.english || item.title.romaji).toLowerCase();
    if (item.bannerImage) map[key] = item.bannerImage;
  }

  return map;
}

async function main() {
  const jikanAnimes = await fetchJikan();
  const bannerMap = await fetchAniListBanners();

  const animes = jikanAnimes.map((a) => {
    const titulo = a.title_english || a.title;
    const banner = bannerMap[titulo.toLowerCase()] || bannerMap[a.title.toLowerCase()] || null;

    return {
      id: randomUUID(),
      titulo,
      titulo_japones: a.title_japanese || null,
      capa: a.images?.jpg?.large_image_url || null,
      banner,
      sinopse: a.synopsis || null,
      generos: (a.genres || []).map((g) => g.name),
      status: a.status || null,
      episodios: a.episodes || null,
      nota: a.score || null,
      estudio: a.studios?.[0]?.name || null,
      ano: a.aired?.prop?.from?.year || null,
    };
  });

  const outputPath = "src/db/db.json";
  fs.mkdirSync("src/db", { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify({ animes }, null, 2));
  console.log(`✅ ${outputPath} gerado com ${animes.length} animes!`);
}

main();
