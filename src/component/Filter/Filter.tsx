import styles from "./Filter.module.css";

const filters = ["Todos", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

export function Filter() {
  return (
    <header className={styles.FilterContainer}>
      <nav className={styles.navbar}>
        {filters.map((filter) => (
          <a
            key={filter}
            href="#"
            className={`${styles.navlink} ${filter === "Todos" ? styles.todos : ""}`}
          >
            {filter}
          </a>
        ))}
      </nav>
    </header>
  );
}
