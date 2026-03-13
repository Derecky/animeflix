import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerContent}>
        Todos os direitos reservados aos criadores e produtores dos animes
      </p>
    </footer>
  );
}
