import React from 'react'
import NavBar from '../features/navbar/NavBar'
import UserOrdersComponent from '../features/user/components/UserOrders'

function UserOrder() {
  return (
        <>
        <NavBar>
            <h1 className='mx-auto text-4xl font-semibold'>My Orders</h1>
         <UserOrdersComponent/>
        </NavBar>
        </>
  )
}

export default UserOrder

