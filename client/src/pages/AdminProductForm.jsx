import React from 'react'
import NavBar from '../features/navbar/NavBar'
import AdminProductFormComponent from '../features/admin/components/ProductForm'

function AdminProductForm() {
  return (
    <>
    <NavBar>
    <AdminProductFormComponent/>
    </NavBar>
    </>
  )
}

export default AdminProductForm