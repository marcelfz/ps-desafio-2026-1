import style from './loading.module.css'

export function Loading() {
  return (
    <div className={style.wrapper}>
      <div className={style.spinner} />
    </div>
  )
}