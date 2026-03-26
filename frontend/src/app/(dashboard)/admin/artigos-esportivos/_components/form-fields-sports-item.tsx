'use client'

import { Button } from '@/components/button'
import {
  FormFieldsGroup,
  FormField,
  ImageForm,
  handleImageChange,
} from '@/components/dashboard/form'
import { DialogFooter } from '@/components/dialog'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from '@/components/select'
import { cn } from '@/lib/utils'
import { api, ResponseErrorType } from '@/services/api'
import { categoryType } from '@/types/category'
import { sportsItemType } from '@/types/sportsItem'
import { use, useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'

interface FormFieldsSportsItemProps {
  sportsItem?: sportsItemType | null
  readOnly?: boolean
  error?: ResponseErrorType | null
}

export default function FormFieldsSportsItem({
  sportsItem,
  readOnly,
  error,
}: FormFieldsSportsItemProps) {
  const { pending } = useFormStatus()
  const [category, setCategory] = useState<categoryType[]>()
  const [updateImage, setUpdateImage] = useState<string | undefined>()

  const requestData = async () => {
    try{
      const response = await api('GET', '/category')
      if(response.error){
        console.log('Não foi possível obter uma categoria.')
      }else{
        setCategory(response.response as categoryType[])
      }
    }catch(e){
      console.log('Ocorreu um erro inesperado.')
    }
  }

  useEffect(()=>{
    requestData()
  }, [])

  return (
    <>
      <FormFieldsGroup>
        {sportsItem && <Input defaultValue={sportsItem.id} type="text" name="id" hidden />}
        
        <FormField>
          <Label htmlFor='name' required={!sportsItem}>
            Nome
          </Label>
          <Input 
          type="text" 
          id='name' 
          name='name' 
          placeholder='Insira o nome do produto'
          defaultValue={sportsItem?.name}
          disabled={pending}
          readOnly={readOnly}
          error={error?.errors?.name}
          />
        </FormField>

        <FormField>
          <Label htmlFor='brand' required={!sportsItem}>
            Marca
          </Label>
          <Input
            name='brand'
            id='brand'
            placeholder='Insira a marca do produto'
            defaultValue={sportsItem?.brand}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.brand}
          />
        </FormField>

        <FormField>
          <Label htmlFor='price' required={!sportsItem}>
            Preço
          </Label>
          <Input
            name='price'
            id='price'
            placeholder='Insira o preço do produto'
            defaultValue={sportsItem?.price}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.price}
          />
        </FormField>

        <FormField>
          <Label htmlFor='launch_year' required={!sportsItem}>
            Ano de lançamento
          </Label>
          <Input
            name='launch_year'
            id='launch_year'
            placeholder='Insira o ano de lançamento do produto'
            defaultValue={sportsItem?.launch_year}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.launch_year}
          />
        </FormField>

        <FormField>
          <Label htmlFor='image' 
          hidden={readOnly && !sportsItem?.image}
          required={!sportsItem}>
            Imagem
          </Label>
          <ImageForm src={updateImage ?? sportsItem?.image} />
          <Input
            name='image'
            id='image'
            type='file'
            accept='image/*'
            disabled={pending}
            hidden={readOnly}
            onChange={(e) => handleImageChange(e, setUpdateImage)}
            error={error?.errors?.image}
          />
        </FormField>

        <FormField>
          <Label htmlFor='stock_quantity' required={!sportsItem}>
            Quantidade em estoque
          </Label>
          <Input
            name='stock_quantity'
            id='stock_quantity'
            placeholder='Insira a quantidade em estoque do produto'
            defaultValue={sportsItem?.stock_quantity}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.stock_quantity}
          />
        </FormField>

        <FormField>
          <Select
            disabled={pending || readOnly}
            name='category_id'
            defaultValue={sportsItem?.category_id}
            >
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent id='category_id'>
              <SelectGroup id='category_id'>
                {category?.map((category: categoryType, index: number) => (
                  <SelectItem key={index} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormField>

        {error?.errors?.category_id && (
          <p>
            {error.errors.category_id}
          </p>
        )}

      </FormFieldsGroup>
      <DialogFooter className={cn({ hidden: readOnly })}>
        <Button type="submit" pending={pending}>
          Salvar
        </Button>
      </DialogFooter>
    </>
  )
}
