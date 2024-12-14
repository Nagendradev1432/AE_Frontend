import React from 'react'

export default function ErrorComponet({message,deco}) {
  return (
    <p className={deco?`${deco}`:`text-red-500 w-2/3 rounded-md px-2 py-1`}>
    {message}
    </p>
  )
}
