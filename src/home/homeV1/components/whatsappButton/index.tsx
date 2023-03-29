import styles from "./styles.module.css";

export default function WhatsappButton() {
  return (
    <div className={styles.button}>
      <a
        href="https://wa.me/+51976227607"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="whatsapp.png" alt="" className={styles.img} />
      </a>
    </div>
  );
}
