const filters = ["Todos", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

export function Filter() {
  return (
    <header className="w-full overflow-x-auto mt-6 pb-6">
      <nav className="flex min-w-max items-center justify-start gap-6 lg:justify-center lg:gap-8">
        {filters.map((filter) => (
          <a
            key={filter}
            href={`#${filter}`}
            className={`font-inter h-8 w-14 content-center rounded-4xl border px-2 text-center text-sm font-normal text-gray-400 transition-all duration-200 hover:bg-white/5 md:h-11 md:w-27 md:text-lg ${
              filter === "Todos"
                ? "text-white w-24 border-none bg-slate-700 font-bold"
                : "border border-slate-700"
            } `}
          >
            {filter}
          </a>
        ))}
      </nav>
    </header>
  );
}
