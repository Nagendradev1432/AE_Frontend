import React from 'react'
import SataicBackGround from '../UI/SataicBackGround'
import ProductByCat from '../components/products/ProductByCat'

export default function Top() {
  return (
    <div>
    <SataicBackGround />

    
    <ProductByCat value={["67536287793b503015d75ab7","67536231f615e7cfa18e90f2"]} search={"category"} />
    </div>
  )
}
