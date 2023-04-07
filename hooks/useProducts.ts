
import useSWR, { SWRConfiguration } from 'swr'
import { ProductType } from '../types/products'

// const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json())


export const useProducts = (url: string, config: SWRConfiguration = {}) => {
  // const { data, error, isLoading } = useSWR<ProductType[]>(`/api${url}`, fetcher, config)
  const { data, error, isLoading } = useSWR<ProductType[]>(`/api${url}`, config)
  return {
    products: data || [],
    isLoading,
    error
  }
}