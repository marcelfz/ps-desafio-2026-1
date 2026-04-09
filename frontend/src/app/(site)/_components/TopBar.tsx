import styles from './topbar.module.css'

export default function TopBar() {
  return (
    <div className={styles.topbar}>
       <p className={styles.topbarText}>FRETE GRÁTIS em compras acima de R$ 299 · USE O CÓDIGO: ZSPORTS10 · 10% OFF NA PRIMEIRA COMPRA </p>
    </div>
  )
}
export { TopBar }