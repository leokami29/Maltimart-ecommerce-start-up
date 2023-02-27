import React from 'react'
import ProductsCards from './ProductsCards'

const ProductsList = ({ data }) => {
    return (
        <>

            {
                data?.map((item, index) => (
                    <ProductsCards item={item} key={index} />
                ))
            }
        </>
    )
}

export default ProductsList