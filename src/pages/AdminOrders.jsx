import React, { useEffect, useState } from 'react'
import NavBar from '../features/navbar/NavBar'
import AdminOrdersComponent from '../features/admin/components/AdminOrders'
import { ITEMS_PER_PAGE } from '../app/constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrdersAsync, selectOrders, selectTotalOrders , } from '../features/order/orderSlice';


function AdminOrders() {

  return (
    <div>
        <NavBar>
            <AdminOrdersComponent/>
        </NavBar>
    </div>
  )
}

export default AdminOrders