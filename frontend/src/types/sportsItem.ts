import { categoryType } from "./category"

export type sportsItemType = {
    id: string
    name: string
    brand: string
    price: number
    launch_year: number
    image: string 
    stock_quantity: number
    category_id: string
    category: categoryType
    created_at: Date
    updated_at: Date
}