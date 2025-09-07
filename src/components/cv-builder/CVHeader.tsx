import styles from '../CV.module.scss';

export default function CVHeader() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>CV Builder</h1>
      <p className={styles.subtle}>Wpisz dane po lewej — podgląd po prawej.</p>
    </header>
  );
}
