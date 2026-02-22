export function Header() {
  return (
    <header className="header">
      <a href="#" className="header-title">
        <h1>Ani.me</h1>
      </a>

      <nav className="header-nav">
        <ul className="header-menu">
          <li>
            <a href="#">Inicio</a>
          </li>
          <li>
            <a href="#">Lista</a>
          </li>
          <li>
            <a href="#">Gêneros</a>
          </li>
          <li>
            <a href="#">Novos episódios</a>
          </li>
        </ul>

        <input type="text" placeholder="Buscar" className="header-search" />
      </nav>
    </header>
  );
}
