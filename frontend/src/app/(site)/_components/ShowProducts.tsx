import { sportsItemType } from '@/types/sportsItem'
import Card from './Card'

import style from './showProduct.module.css'

interface ShowProductsProps {
  sportingProducts: sportsItemType[]
}

export default function ShowProducts({ sportingProducts }: ShowProductsProps) {
  return (
    <div className={style.wrapper}>
      {sportingProducts.map((sportingProduct, index) => (
        <Card sportingProduct={sportingProduct} key={index} />
      ))}
    </div>
  )
}

