import styles from "./Content.module.css";

export function Content() {
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
        <div className={styles.sectionHeader}>
          <h2>Últimas atualizações</h2>
          <button>Ver mais</button>
        </div>

        <div className={styles.animeGrid}>{/* Animecard */}</div>
      </section>

      <section className={styles.sectionRecent}>
        <h2>Animes recentes</h2>
        <div className={styles.recentAnimesGrid}>{/* Animecard */}</div>
      </section>
    </main>
  );
}
