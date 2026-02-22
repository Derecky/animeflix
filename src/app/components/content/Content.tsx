export function Content() {
  return (
    <main className="section-main">
      <section className="section-novidade">
        <div className="section-title">
          <h2>Últimas novidades</h2>
          <p>O que você vai assistir hoje?</p>
        </div>
        <div className="section-banner">
          <div className="section-content">
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

      <section className="updates-section">
        <div className="section-header">
          <h2>Últimas atualizações</h2>
          <button>Ver mais</button>
        </div>

        <div className="anime-grid">
          {/* Animecard */}
        </div>
      </section>

      <section className="section-recent">
        <h2>Animes recentes</h2>
        <div className="recent-animes-grid">
          {/* Animecard */}
        </div>
      </section>
    </main>
  );
}
