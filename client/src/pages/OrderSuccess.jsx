import React ,{useEffect ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams ,Link } from 'react-router-dom'
import { resetCartAsync, selectItems } from '../features/cart/cartSlice';
import { selectLoggedInUser } from '../features/auth/authSlice';
import { resetOrder } from '../features/order/orderSlice';
import CarouselComponent from '../features/Carousel/Carousel';

function OrderSuccess() {
    const {id} = useParams()
    const dispatch = useDispatch() ;
    const user = useSelector(selectLoggedInUser) ; 
    const [recommendedProducts , setRecommendedProducts] = useState([]) ; 
    const cartItems = useSelector(selectItems) ; 
    console.log("Cart items -> " , cartItems);
    useEffect(() =>{
        //reset cart
        console.log('User in order success' , user);
        if(cartItems.length !== 0){
          dispatch(resetCartAsync(user.id)) ; 
          //reset order
          dispatch(resetOrder()) ; 
        }
    },[dispatch  , cartItems])
    
  return (
    <>
        {!id && <Navigate to='/' replace={true}></Navigate>}
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
            <p className="text-base font-semibold text-indigo-600">Order Successfully Placed</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Order Number #{id}</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">You can check your order in My Account</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                to='/'
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                Go back home
                </Link>
            </div>
            </div>
        </main>
        <div className="flex flex-col justify-center gap-4 py-5" >
        <h1 className='mx-auto text-5xl font-semibold'>Recommended for you </h1>
        <div className="w-[30rem] mx-auto h-[30rem]">
        <CarouselComponent/>
        </div>
        </div>
    </>
  )
}

export default OrderSuccess