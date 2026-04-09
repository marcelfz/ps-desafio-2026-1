import { Suspense } from 'react'
import { api } from '@/services/api'
import { sportsItemType } from '@/types/sportsItem'
import Filter from './_components/Filter'
import { Header } from './_components/Header'
import { Hero } from './_components/Hero'
import Slide from './_components/Slide'
import Footer from './_components/Footer'
import { Loading } from './_components/Loading'
import style from './page.module.css'

async function getProducts() {
  const { response } = await api<sportsItemType[]>('GET', '/sporting-product')
  return response ?? []
}

export default async function Home() {
  const produtos = await getProducts()

  return (
    <>
      <Header />
      <Slide/>
      <Hero />
      <div className={style.page}>
        <h1 className={style.title} id='catalogo'>Todos os  <span>produtos</span></h1>
        <Suspense fallback={<Loading />}>
            <Filter sportingProducts={produtos} />
        </Suspense>
      </div>
      <Footer/>
    </>
  )
}