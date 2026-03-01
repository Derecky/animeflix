import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerTitle}>
        <a href="#" className={styles.headerTitleLink}>
          <h1>Ani.me</h1>
        </a>
      </div>

      <nav className={styles.headerNav}>
        <ul className={styles.headerMenu}>
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

        <input
          type="text"
          placeholder="Buscar"
          className={styles.headerSearch}
        />
      </nav>
    </header>
  );
}
