'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import style from './slide.module.css'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Autoplay } from 'swiper/modules'

const slides = [
  {
    image: '/banner1.jpg',
    title: 'FRETE GRÁTIS',
    subtitle: 'Compre agora e receba seu produto com frete grátis!',
    text: 'Aproveite esta oferta exclusiva e economize no frete.',
  },
  {
    image: '/banner2.jpg',
    title: 'NOVIDADES',
    subtitle: 'Confira os melhores produtos esportivos!',
    text: 'Qualidade profissional para atletas de todos os níveis.',
  },
  {
    image: '/banner3.jpg',
    title: 'OFERTAS',
    subtitle: 'Os melhores preços do mercado!',
    text: 'Não perca as ofertas exclusivas da zSPorts.',
  },
]

export default function App() {
  return (
    <Swiper
        style={{
            '--swiper-pagination-color': '#fff',
        } as React.CSSProperties}
        speed={600}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: true }}
        loop={true}
        modules={[Pagination, Autoplay]}
        className={style.container}
    >
      {slides.map((slide, index) => (
        <SwiperSlide
          key={index}
          style={{ backgroundImage: `url(${slide.image})` }}
          className={style.slide}
        >
        <div>
            <div className={style.title}>{slide.title}</div>
            <div className={style.subtitle}>{slide.subtitle}</div>
            <div className={style.text}><p>{slide.text}</p></div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}