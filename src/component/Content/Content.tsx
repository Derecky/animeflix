import { getAnimes } from "@/lib/animes";
import styles from "./Content.module.css";

export default function Content() {
  const { animes } = getAnimes({ limit: 12 });

  return (
    <main className={styles.sectionMain}>
      <section className={styles.sectionNovidade}>
        <div className={styles.sectionTitle}>
          <h2>Últimas novidades</h2>
          <p>O que você vai assistir hoje?</p>
        </div>
        <div className={styles.sectionBanner}>
          <div className={styles.sectionContent}>
            <h1>ONE PUNCH MAN TERÁ 3 TEMPORADA</h1>
            <p>
              Como relatado anteriormente, a franquia baseada no mangá escrito
              por ONE e ilustrado por Yusuke Murata, One Punch Man, divulgou um
              comunicado confirmando a produção de uma terceira temporada da
              adaptação para o anime […]
            </p>
          </div>
        </div>
      </section>

      <section className={styles.sectionUpdates}>
        <h2 className={styles.sectionTitleUpdates}>Últimas atualizações</h2>

        <div className={styles.sectionAnimeGrid}>
          <ul className={styles.sectionAnimeList}>
            {animes.map((anime) => (
              <li key={anime.id} className={styles.animeItem}>
                <a href={`/animes/${anime.id}`} className={styles.cardAnchor}>
                  <div className={styles.imageWrapper}>
                    <img
                      src={anime.capa || "/placeholder.png"}
                      alt={anime.titulo}
                      className={styles.animeThumb}
                    />
                    <span className={styles.episodeTag}>
                      {anime.episodios
                        ? `Episódio ${anime.episodios}`
                        : "Filme"}
                    </span>
                  </div>
                  <h3 className={styles.animeTitle}>{anime.titulo}</h3>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <button className={styles.sectionViewMoreButton}>Ver mais</button>
      </section>
    </main>
  );
}
