import styles from './hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>

      <div className={styles.left}>
        <div className={styles.heroLabel}>Loja de Produtos Esportivos</div>

        <h1 className={styles.heroTitle}>
          <span className={styles.line1}>EQUIPE</span>
          <em>SUA</em>
          <span className={styles.line2}>VITÓRIA</span>
        </h1>

        <p className={styles.heroDescription}>
          Os melhores artigos esportivos das marcas mais reconhecidas do mundo.
          Qualidade profissional para atletas de todos os níveis.
        </p>

        <div className={styles.heroBottom}>
          <a href="#catalogo" className={styles.btnRed}>
            Ver Catálogo 
          </a>
          <a href="#destaques" className={styles.btnOutline}>
            Destaques 
          </a>
        </div>
      </div>

      <div className={styles.right}>
        <img
          src="/produto2.jpg"
          alt="Produto da zSPorts"
          className={styles.heroImg}
        />
        <div className={styles.tag}>Nova coleção 2026</div>
      </div>

    </section>
  )
}

export { Hero }
