'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function createSportsItem(form: FormData) {

    const res = await api('POST', '/sporting-product', {data: form})

    if(!res.error){
        revalidatePath('/admin/sporting-product')
    }

    return JSON.stringify(res)

}

export async function updateSportsItem(form: FormData) {

    const res = await api('POST', `/sporting-product/${form.get('id')}`, {data: form})

    if(!res.error){
        revalidatePath('/admin/sporting-product')
    }

    return JSON.stringify(res)

}

export async function destroySportsItem(id: string) {

    const res = await api('DELETE', `/sporting-product/${id}`)

    if(!res.error){
        revalidatePath('/admin/sporting-product')
    }

    return JSON.stringify(res)

}


export async function comprar(id: string) {

    const res = await api('POST', `/sporting-product/${id}/buy`)

    if(!res.error){
        revalidatePath('/')
    }

    return JSON.stringify(res)

}