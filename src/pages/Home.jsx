import React from 'react'
import NavBar from '../features/navbar/NavBar'
import ProductList from '../features/product-list/components/ProductList'
import Footer from '../features/common/Footer'


function Home() {
  return (
    <div>
        <NavBar>
            <ProductList></ProductList>
        </NavBar>
        <Footer/>
    </div>
  )
}

export default Home