import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteItemFromCartAsync, selectCartStatus, selectItems, updateCartAsync } from "./cartSlice";
import { discountedPrice } from "../../app/constants";
import { Grid } from "react-loader-spinner";
import Modal from "../common/Modal";



function Cart() {
  const items = useSelector(selectItems) ;
  console.log('Items in cart ',items);
  const totalAmount = items.reduce((amt ,item) => (discountedPrice(item.product)* item.quantity) +amt ,0) ;
  const totalItems = items.reduce((total ,item) => item.quantity + total , 0) ;
  const dispatch = useDispatch() ;
  const status = useSelector(selectCartStatus);
  const [openModal , setOpenModal] = useState(null)

  const handleQuantity = (e ,item) => {
    console.log('quantity ->',e.target.value);
     dispatch(updateCartAsync({id : item.id ,quantity: +e.target.value})) ;
  }

  const handleRemove = (e , id) => {
    dispatch(deleteItemFromCartAsync(id)) ;
  }

  console.log('Items in Cart page',items);
  return (
    <>
    {!items.length  && <Navigate to='/' replace={true}></Navigate>}
     
    <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6 ">
        <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
          Cart
        </h1>
        <div className="flow-root">
        {status === 'loading' ?  <Grid
                visible={true}
                height="80"
                width="80"
                color="rgb(79,70,229)"
                ariaLabel="grid-loading"
                radius="12.5"
                wrapperStyle={{}}
                wrapperClass="grid-wrapper"
                /> : null}
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {items.map((product) => (
              <li key={product.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={product.product.thumbnail}
                    alt={product.product.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href={product.product.href}>{product.product.title}</a>
                      </h3>
                      <p className="ml-4">${discountedPrice(product.product)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.product.brand}
                    </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="text-gray-500">
                      <label
                        htmlFor="quantity"
                        className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                      >
                        Qty
                      </label>
                      <select onChange={(e) => handleQuantity(e ,product)} value={product.quantity}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                      </select>
                    </div>

                    <div className="flex">
                      <Modal 
                          title={`Delete ${product.product.title}`}
                          message="Are you sure you want to delete this cart item" 
                          dangerOption="Delete" 
                          cancelOption="Cancel"
                          cancelAction={() => setOpenModal(-1)}
                          dangerAction = {(e) => handleRemove(e , product.id)}
                          showModal = {openModal === product.id}
                      />
                      <button
                      onClick={(e) => setOpenModal(product.id)}
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between my-2 text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>${totalAmount}</p>
        </div>
        <div className="flex justify-between my-2 text-base font-medium text-gray-900">
          <p>Total Items in Cart</p>
          <p>{totalItems} items</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <Link
            to="/checkout"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or{" "}
            <Link to="/">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => setOpen(false)}
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

export default Cart;
