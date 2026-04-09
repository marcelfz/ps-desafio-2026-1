'use client'

import { sportsItemType } from '@/types/sportsItem'
import style from './card.module.css'
import { useState } from 'react'
import { comprar } from '@/actions/sportsItem'
import ModalProduto from './ModalProduto'

interface sportingProductProp {
    sportingProduct: sportsItemType
}

export default function Card({ sportingProduct }: sportingProductProp) {
    const [estoque, setEstoque] = useState(sportingProduct.stock_quantity)
    const [modalOpen, setModalOpen] = useState(false)

    const handleBuy = async (id: string) => {
        const result = await comprar(id)
        if (result) {
            setEstoque(estoque - 1)
        } else {
            console.error(`Erro ao comprar produto: ${id}`)
        }
    }

    return (
        <>
            <div className={style.card} onClick={() => setModalOpen(true)}>
                <div className={style.imgWrapper}>
                    <img
                        src={sportingProduct.image}
                        alt={sportingProduct.name}
                        className={style.cardImg}
                    />
                </div>
                <div className={style.cardBody}>
                    <div className={style.cardTop}>
                        <h2 className={style.cardName}>{sportingProduct.name}</h2>
                        <span className={style.cardPrice}>
                            R$ {Number(sportingProduct.price).toFixed(2)}
                        </span>
                    </div>
                    
                    <p className={`${style.cardStock} ${estoque <= 3 ? style.low : ''}`}>
                        {estoque > 0 ? `${estoque} em estoque` : ''}
                    </p>
                    
                    <button className={style.cardBtn} disabled={estoque === 0}>
                        {estoque > 0 ? 'Comprar' : 'Esgotado'}
                    </button>
                </div>
            </div>

            {modalOpen && (
                <ModalProduto
                    sportingProduct={sportingProduct}
                    estoque={estoque}
                    onClose={() => setModalOpen(false)}
                    onBuy={handleBuy}
                />
            )}
        </>
    )
}