import Image from "next/image";
import { getAnimes } from "@/lib/animes";

export default function Content() {
  const todosOsAnimes = getAnimes();
  const animes = todosOsAnimes.slice(0, 12);
  const animesRecentes = todosOsAnimes
    .filter((anime) => anime.ano !== null && anime.ano >= 2025)
    .slice(0, 6);

  return (
    <main className="container mx-auto">
      <section>
        <div className="mt-12 flex flex-col gap-2 text-2xl font-normal md:mt-16">
          <h2 className="font-rubik md:text-4xl">Últimas novidades</h2>
          <p className="font-inter text-sm text-gray-400 md:text-lg">
            O que você vai assistir hoje?
          </p>
        </div>
        <div className="relative mt-10">
          <Image
            src="/images/one-punch-man-mobile.png"
            alt="One Punch Man"
            fill
            className="absolute w-sm object-cover"
          />
          <div className="relative space-y-2 p-6 pt-14">
            <h1 className="font-rubik text-sm font-medium">
              ONE PUNCH MAN TERÁ 3 TEMPORADA
            </h1>
            <p className="font-inter text-xs font-normal text-gray-400">
              Como relatado anteriormente, a franquia baseada no mangá escrito
              por ONE e ilustrado por Yusuke Murata, One Punch Man, divulgou um
              comunicado confirmando a produção de uma terceira temporada da
              adaptação para o anime […]
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="font-rubik mt-12 text-lg font-medium">
          Últimas atualizações
        </h2>

        <div className="relative">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4 lg:grid-cols-6">
            {animes.map((anime, index) => (
              <li
                key={anime.id}
                className={` ${index >= 4 ? "hidden md:block" : "block"} `}
              >
                <a href={`/#/${anime.id}`} className="group block space-y-3">
                  <div className="relative aspect-2/3 overflow-hidden rounded-xl bg-slate-800 after:absolute after:inset-0 after:bg-linear-to-t after:from-[#06090F] after:to-transparent">
                    <Image
                      src={anime.capa || "/placeholder.png"}
                      alt={anime.titulo}
                      fill
                      className="object-cover transition-transform group-hover:scale-110"
                    />
                    <span className="font-inter absolute bottom-9 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-gray-400">
                      {anime.episodios
                        ? `Episódio ${anime.episodios}`
                        : "Filme"}
                    </span>
                  </div>
                  <h3 className="font-rubik mt-4 text-sm font-normal group-hover:text-sky-400">
                    {anime.titulo}
                  </h3>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <button className="font-inter h-9.25 w-46.75 self-center rounded-b-sm bg-slate-700 text-sm font-semibold">
          Ver mais
        </button>
      </section>

      <section className="mt-12 flex flex-col gap-8 pb-10">
        <h2 className="font-rubik pl-3 text-lg font-medium text-white">
          Animes recentes
        </h2>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 lg:grid-cols-6">
          {animesRecentes.map((anime) => (
            <li key={anime.id} className="group block space-y-3">
              <div className="relative aspect-2/3 overflow-hidden rounded-xl bg-slate-800 after:absolute after:inset-0 after:bg-linear-to-t after:from-[#06090F] after:to-transparent">
                <Image
                  src={anime.capa || "/placeholder.png"}
                  alt={anime.titulo}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <h3 className="font-rubik text-sm font-normal text-gray-200 group-hover:text-sky-400">
                {anime.titulo}
              </h3>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
