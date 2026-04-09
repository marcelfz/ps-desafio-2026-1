'use client'

import style from './modal.module.css'
import { sportsItemType } from '@/types/sportsItem'
import { useState } from 'react'
import axios from 'axios'

interface AddressType {
    cep: string
    logradouro: string
    bairro: string
    localidade: string
    uf: string
}

interface ModalProdutoProps {
    sportingProduct: sportsItemType
    estoque: number
    onClose: () => void
    onBuy: (id: string) => void
}

export default function ModalProduto({ sportingProduct, estoque, onClose, onBuy }: ModalProdutoProps) {
    const [cepInput, setCepInput] = useState('')
    const [address, setAddress] = useState<AddressType | null>(null)
    const [cepError, setCepError] = useState('')
    const [cepLoading, setCepLoading] = useState(false)

    const checkCEP = async (value: string) => {
        const cep = value.replace(/\D/g, '')
        setCepInput(value)
        setAddress(null)
        setCepError('')

        if (cep.length !== 8) return

        setCepLoading(true)
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            const data = response.data

            if (data.erro) {
                setCepError('CEP não encontrado.')
            } else {
                setAddress({
                    cep: data.cep,
                    logradouro: data.logradouro,
                    bairro: data.bairro,
                    localidade: data.localidade,
                    uf: data.uf,
                })
            }
        } catch {
            setCepError('Erro ao buscar o CEP. Tente novamente.')
        } finally {
            setCepLoading(false)
        }
    }

    const handleBuy = () => {
        if (!address) return
        onBuy(sportingProduct.id)
    }

    return (
        <div className={style.overlay} onClick={onClose}>
            <div className={style.modal} onClick={(e) => e.stopPropagation()}>
                <button className={style.modalClose} onClick={onClose}>X</button>

                <div className={style.modalImg}>
                    <img src={sportingProduct.image} alt={sportingProduct.name} />
                </div>

                <div className={style.modalBody}>
                    <h2 className={style.modalName}>{sportingProduct.name}</h2>
                    <p className={style.modalPrice}>R$ {Number(sportingProduct.price).toFixed(2)}</p>

                    <div className={style.modalInfo}>
                        <div className={style.modalInfoItem}>
                            <span className={style.modalInfoLabel}>Lançamento</span>
                            <span className={style.modalInfoValue}>{sportingProduct.launch_year}</span>
                        </div>
                        <div className={style.modalInfoItem}>
                            <span className={style.modalInfoLabel}>Categoria</span>
                            <span className={style.modalInfoValue}>{sportingProduct.category.name}</span>
                        </div>
                        <div className={style.modalInfoItem}>
                            <span className={style.modalInfoLabel}>Marca</span>
                            <span className={style.modalInfoValue}>{sportingProduct.brand}</span>
                        </div>
                        <div className={style.modalInfoItem}>
                            <span className={style.modalInfoLabel}>Estoque</span>
                            <span className={`${style.modalInfoValue} ${estoque <= 3 ? style.low : ''}`}>
                                {estoque > 0 ? `${estoque} unidades` : 'Esgotado'}
                            </span>
                        </div>
                    </div>

                    
                    <div className={style.cepSection}>
                        <label className={style.cepLabel}>Calcular frete / Verificar entrega</label>
                        <input
                            className={style.cepInput}
                            type="text"
                            placeholder="Digite seu CEP"
                            maxLength={9}
                            value={cepInput}
                            onChange={(e) => checkCEP(e.target.value)}
                        />
                        {cepLoading && <p className={style.cepLoading}>Buscando CEP...</p>}
                        {cepError && <p className={style.cepError}>{cepError}</p>}
                        {address && (
                            <div className={style.cepResult}>
                                <p>{address.logradouro}{address.bairro ? `, ${address.bairro}` : ''}</p>
                                <p>{address.localidade} — {address.uf}</p>
                            </div>
                        )}
                    </div>

                    {estoque > 0 ? (
                        <button
                            className={style.modalBtn}
                            onClick={handleBuy}
                            disabled={!address}
                            title={!address ? 'Informe um CEP válido para comprar' : ''}
                        >
                            {address ? 'Comprar agora' : 'Informe o CEP para comprar'}
                        </button>
                    ) : (
                        <button className={style.modalBtn} disabled>Esgotado</button>
                    )}
                </div>
            </div>
        </div>
    )
}