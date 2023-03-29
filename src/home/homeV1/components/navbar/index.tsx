import styles from "./styles.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.greenBar}>
        <span>
          <p className={styles.title}>Envios a toda</p>
          <p className={styles.title}>Lima Metropolitana</p>
        </span>
        <a
          href="https://www.facebook.com/larisPastry?mibextid=LQQJ4d"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="facebook.png" alt="" className={styles.img} />
        </a>
        <a
          href="https://www.instagram.com/laris.pastry/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="instagram.png" alt="" className={styles.img} />
        </a>
      </div>
      <img src="logo.jpg" alt="" className={styles.logo} />
    </nav>
  );
}
