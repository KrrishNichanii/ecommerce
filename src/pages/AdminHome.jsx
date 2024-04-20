import React from 'react'
import NavBar from '../features/navbar/NavBar'
import AdminProductList from '../features/admin/components/AdminProductList'


function AdminHome() {
  return (
    <div>
        <NavBar>
            <AdminProductList></AdminProductList>
        </NavBar>
    </div>
  )
}

export default AdminHome