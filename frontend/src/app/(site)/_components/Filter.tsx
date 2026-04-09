'use client'

import { useState } from 'react';
import { sportsItemType } from '@/types/sportsItem';
import ShowProducts from './ShowProducts';
import style from './filter.module.css'

export default function Filter({sportingProducts} : {sportingProducts : sportsItemType[]}) {
    const [busca, setBusca] = useState('');
    const [categoria, setCategoria] = useState('Categoria');
    const [marca, setMarca] = useState('Marca');
    const [ordem, setOrdem] = useState('padrao');

    const filtrados = sportingProducts.filter(product=>{
        const matchBusca = product.name.toLowerCase().includes(busca.toLowerCase());
        const matchCategoria = categoria === 'Categoria' || product.category.name === categoria;
        const matchMarca = marca === 'Marca' || product.brand === marca;
        return matchBusca && matchCategoria && matchMarca;
    })
    .sort((a, b) => {
        if (ordem === 'menor') return a.price - b.price;
        if (ordem === 'maior') return b.price - a.price;
        if (ordem === 'a-z') return a.name.localeCompare(b.name);
        if (ordem === 'z-a') return b.name.localeCompare(a.name);
        return 0;
    })

    return (
        <div className={style.wrapper}>
            <div className={style.filtros}>
                
                    <input className={style.input} value={busca} onChange={e => setBusca(e.target.value)} placeholder="Buscar..." />

                    <select 
                        className={style.select}
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                    >
                        <option value="Categoria">Categoria</option>
                        {Array.from(new Set(sportingProducts.map(p => p.category.name))).map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                       
                    <select
                        className={style.select}
                        value={marca}
                        onChange={e => setMarca(e.target.value)}
                    >
                        <option value="Marca">Marca</option>
                        {Array.from(new Set(sportingProducts.map(p => p.brand))).map(brand => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>

                    <select
                        className={style.select}
                        value={ordem}
                        onChange={e => setOrdem(e.target.value)}
                    >
                        <option value="padrao">Ordenar por</option>
                        <option value="menor">Menor preço</option>
                        <option value="maior">Maior preço</option>
                        <option value="a-z">A-Z</option>
                        <option value="z-a">Z-A</option>
                    </select>

            </div>

                <p className={style.total}>
                    Exibindo <span>{filtrados.length}</span> produtos
                </p>

            <ShowProducts sportingProducts={filtrados} />
        </div>
    )

}