import React from 'react'
import SataicBackGround from '../UI/SataicBackGround'
import ProductByCat from '../components/products/ProductByCat'

export default function Bottoms() {
  return (
    <div>
    <SataicBackGround />

    
    <ProductByCat value={["6753627d793b503015d75ab2","6753623bf615e7cfa18e90f6"]} search={"category"} />
    </div>
  )
}
