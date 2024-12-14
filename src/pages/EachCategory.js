import React from 'react'
import { useParams } from 'react-router-dom'
import ProductsAll from '../components/products/ProductsAll'

export default function EachCategory() {
        const {id} = useParams()
        
        return (
    <div>
    <ProductsAll search={"category"} value={id} />
    </div>
  )
}
