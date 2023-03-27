import styles from "./styles.module.css";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <img src="logo.jpg" alt="" className={styles.logo} />
      <div className={styles.socialMediaContainer}>
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
        <a
          href="https://wa.me/+51976227607"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="whatsapp.png" alt="" className={styles.img} />
        </a>
      </div>
    </div>
  );
}
