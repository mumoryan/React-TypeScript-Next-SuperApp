import React from 'react'

interface Props{
  params:  {slug: string[]},
  searchParams: {sortOrder: string}
}

const ProductPage = ({params: {slug}, searchParams: {sortOrder}}: Props) => {
  return (
    <div>
      Product page {slug||[].join('/')} {sortOrder}
    </div>
  )
}

export default ProductPage
