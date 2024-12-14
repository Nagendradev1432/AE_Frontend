import React from 'react'
import { ColorRing } from 'react-loader-spinner'

export default function Loader({h,w}) {
  return (
    <div className=' flex justify-center  text-center'>
    <ColorRing
    visible={true}
    height={h}
    width={w}
    ariaLabel="color-ring-loading"
    wrapperStyle={{}}
    wrapperClass="color-ring-wrapper"
    colors={['#eee', '#eee', '#eee', '#eee', '#eee']}
    />
    </div>
  )
}
