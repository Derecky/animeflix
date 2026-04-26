const filters = ["Todos", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

export function Filter() {
  return (
    <header className="w-full overflow-x-auto px-2 py-4">
      <nav className="gap-2md:justify-center flex min-w-max items-center justify-start md:gap-8">
        {filters.map((filter) => (
          <a
            key={filter}
            href={`#${filter}`}
            className={`hover:text-primary h-12 w-27 rounded-4xl border px-2 py-2 text-center text-lg font-normal transition-all duration-200 hover:bg-white/5 ${
              filter === "Todos"
                ? "text-primary border-none bg-slate-700 font-bold"
                : "text-primary border border-slate-700"
            } `}
          >
            {filter}
          </a>
        ))}
      </nav>
    </header>
  );
}
