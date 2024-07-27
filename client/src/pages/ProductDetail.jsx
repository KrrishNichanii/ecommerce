import React from 'react'
import NavBar from '../features/navbar/NavBar'
import ProductDetailComponent from '../features/product-list/components/ProductDetail'
import Footer from '../features/common/Footer'
function ProductDetail() {
  return (
    <>
    <NavBar>
    <ProductDetailComponent/>
    </NavBar>
    <Footer/>
    </>
  )
}

export default ProductDetail