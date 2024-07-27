import React , {useState , useEffect} from 'react'
import { Carousel } from "flowbite-react";
import { useSelector } from 'react-redux';
import { selectAllProducts } from '../product-list/ProductSlice';
import { Link } from 'react-router-dom';
import { selectLoggedInUser } from '../auth/authSlice';
import { selectUserInfo } from '../user/userSlice';

export function CarouselComponent() {
    const [userRecommended,setUserRecommended] = useState([]) ; 
    const user = useSelector(selectUserInfo) ; 
    console.log("user  in carousel ",user);
    useEffect(() => {

      const fetchRecommended = async (id) => {
        const response = await fetch(`http://localhost:8086/users/recommended/${id}`) ; 
        const res = await response.json() ; 
        // console.log('Recom ',res.data);
        setUserRecommended(res.data)
      }
      fetchRecommended(user.id);
    },[])
    
    let recommended = [] ; 
    const  items = useSelector(selectAllProducts) ; 
    console.log('Items in carousel ' ,items);
    for(let filter of userRecommended){
        if(!recommended.includes(filter)){
            recommended.push(filter) ; 
            if(recommended.length === 2) break ; 
        }
    }
    console.log('Recommended array ',recommended);

    let products = [] ; 
    function shuffleArray(array) {
        const shuffledArray = array.slice();
        // Loop over the array from the end to the beginning
        for (let i = array.length - 1; i > 0; i--) {
          // Generate a random index between 0 and i (inclusive)
          const j = Math.floor(Math.random() * (i + 1));
          
          // Swap the elements at indices i and j
          let temp = shuffledArray[i] ;
          shuffledArray[i] = shuffledArray[j] ; 
          shuffledArray[j] = temp ; 
        }
        
        // Return the shuffled array
        return shuffledArray;
      }
    let shuffledItems = shuffleArray(items) ; 
    let i = 0 ;
    while(recommended.length > 0 && i < items.length && products.length < 2){
        if(shuffledItems[i].filter === recommended[0]) products.push(shuffledItems[i]) ; 
        i++ ; 
    }
    i = 0 ;
    while(recommended.length > 1 && i < items.length && products.length < 4){
        if(shuffledItems[i].filter === recommended[1]) products.push(shuffledItems[i]) ; 
        i++ ; 
    }

    console.log('Final Products in carousel',products);
    return (
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel className='h-[100%] m-0'>
           {
            products.map((product) => (
                <div className="h-[10rem]">
                <Link to={`/product-detail/${product.id}`} className="w-[70%] h-[50%]">
                    <img src= {product.thumbnail}  alt="..." />
                </Link>
                </div>
            ))
           }
        </Carousel>
      </div>
    );
  }

export default CarouselComponent