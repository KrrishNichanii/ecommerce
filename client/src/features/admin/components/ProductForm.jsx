import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearSelectedProduct, createProductAsync, fetchProductByIdAsync, selectBrands, selectCategories, selectProductById, updateProductAsync } from '../../product-list/ProductSlice'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../../common/Modal';
import { useAlert } from 'react-alert';

export default function ProductForm() {

    const brands = useSelector(selectBrands) ;
    const categories = useSelector(selectCategories) ;
    const { register , reset, setValue , handleSubmit ,formState: {errors}} = useForm(); 
    const dispatch = useDispatch() ;
    const params  = useParams() ; 
    const [openModal , setOpenModal] = useState(null) ;
    const navigate = useNavigate() ; 
    const alert = useAlert();
    useEffect(()=>{
      
      if(params.id){
        
        dispatch(fetchProductByIdAsync(params.id))
        console.log('Product ID in product form', params.id);
      }
      else{
        dispatch(clearSelectedProduct()) ;
      }
      reset() ;
    },[params.id ,dispatch])
    
    const selectedProduct = useSelector(selectProductById) ;
    
    const [category,setCategory] = useState("") ;
    const [filters , setFilters] = useState([]) ; 

    useEffect(() => {
      // console.log('F');
       const fetchCatFilters = async (category) =>{
         const filters =  await fetch(`http://localhost:8086/filters/cat-name/${category}`,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },  
          })
          // console.log('new filters ',(await filters.json()));
          setFilters((await filters.json())?.data)
       }
      //  console.log('C ',category);
       if(category){
        fetchCatFilters(category) ; 
       }
    },[category]);

    useEffect(() =>{
      if(selectedProduct  && params.id){
        console.log('Selected product in Product form ',selectedProduct);
        setValue('title',selectedProduct.title)
        setValue('description',selectedProduct.description)
        setValue('price',selectedProduct.price)
        setValue('rating',selectedProduct.rating)
        setValue('discountPercentage',selectedProduct.discountPercentage)
        setValue('thumbnail',selectedProduct.thumbnail)
        setValue('stock',selectedProduct.stock) //prone
        setValue('filter',selectedProduct?.filter)
        if(selectedProduct.images)
          {setValue('image1',selectedProduct.images[0])
            setValue('image2',selectedProduct.images[1])
            setValue('image3',selectedProduct.images[2])}
            setValue('brand',selectedProduct.brand)
            setValue('category',selectedProduct.category)
          }
        },[selectedProduct , params.id , setValue])
        
    const handleDelete = () => {
        const product = {...selectedProduct} ;
        product.deleted = true ; 
        console.log('Product in delete ',product);
        dispatch(updateProductAsync(product))
    }
    return (
      <>
    <form noValidate onSubmit={handleSubmit((data) => {
        const product = {...data} ;
        product.images = [product.image1 , product.image2 ,product.image3 ,product.thumbnail] ;
        delete product['image1'];
        delete product['image2'];
        delete product['image3'];
        product.price = +product.price;
        product.discountPercentage = +product.discountPercentage;
        product.stock = +product.stock;
        console.log('Product being added ',product);
        if(params.id){
            product.id = params.id ;
            dispatch(updateProductAsync(product)) ;
            alert.success('Product Updated Successfully');
            reset();
        }
        else{
            dispatch(createProductAsync(product)) ;
            alert.success('Product Created Successfully');
            reset();
        }
        navigate(-1) ; 
    })}>
      <div className="space-y-12 bg-white p-10 rounded-md">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Add Product Details</h2>
         

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {selectedProduct && selectedProduct.deleted && <h2 className='sm:col-span-6 text-red-500'>This product is deleted</h2>}
            <div className="sm:col-span-6">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
               Product Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                
                  <input
                    type="text"
                    {...register('title',{required:'title is required'})}
                    id="title"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  {...register('description',{required:'description is required'})}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
            <p className='mt-3 text-sm leading-6 text-gray-600'>Write a few sentences about product </p>
          </div>

          <div className="col-span-full">
              <label
                htmlFor="brand"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Brand
              </label>
              <div className="mt-2">
                <select
                  {...register('brand', {
                    required: 'brand is required',
                  })}
                >
                  <option value=""> Choose Brand </option>
                  {brands.map((brand) => (
                    <option value={brand.value}>{brand.label}</option>
                  ))}
                </select>
              </div>
            </div>

          <div className="col-span-full">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>
              <div className="mt-2">
                <select
                  {...register('category', {
                    required: 'category is required',
                    onChange:(event) => setCategory(event.target.value) 
                  })}
                >
                  <option value=""> Choose Category </option>
                  {categories.map((category) => (
                    <option value={category.value}>{category.label}</option>
                  ))}
                </select>
              </div>
            </div>


          { filters.length != 0 && <div className="col-span-full">
              <label
                htmlFor="filter"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Filters
              </label>
              <div className="mt-2">
                <select
                  {...register('filter', {
                    required: 'filter is required',
                  })}
                >
                  <option value=""> Choose Filter </option>
                  {filters?.map((filter) => (
                    <option value={filter.value}>{filter.label}</option>
                  ))}
                </select>
              </div>
            </div>}



            <div className="sm:col-span-2">
              <label htmlFor="rating" className="block text-sm font-medium leading-6 text-gray-900">
               Rating
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                
                  <input
                    type="number"
                    {...register('rating',{required:'Rating is required', min:1 ,max:5})}
                    id="rating"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

          <div className="sm:col-span-2">
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
               Price
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                
                  <input
                    type="number"
                    {...register('price',{required:'price is required', min:1 ,max:10000})}
                    id="price"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

          <div className="sm:col-span-2">
              <label htmlFor="discountPercentage" className="block text-sm font-medium leading-6 text-gray-900">
               Discount
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                
                  <input
                    type="number"
                    {...register('discountPercentage',{required:'discountPercentage is required', min:0 ,max:100})}
                    id="discountPercentage"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

          <div className="sm:col-span-2">
              <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
               Stock
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                
                  <input
                    type="number"
                    {...register('stock',{required:'stock is required', min:0})}
                    id="stock"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
               Thumbnail
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                
                  <input
                    type="text"
                    {...register('thumbnail',{required:'thumbnail is required'})}
                    id="thumbnail"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
               Image 1
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                
                  <input
                    type="text"
                    {...register('image1',{required:'image1 is required'})}
                    id="image1"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
               Image 2
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                
                  <input
                    type="text"
                    {...register('image2',{required:'image2 is required'})}
                    id="image2"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
               Image 3
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                
                  <input
                    type="text"
                    {...register('image3',{required:'image3 is required'})}
                    id="image3"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>


        </div>

        

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base my-4 font-semibold leading-7 text-gray-900">Extra</h2>
       

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="comments" className="font-medium text-gray-900">
                      Comments
                    </label>
                    <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="candidates" className="font-medium text-gray-900">
                      Candidates
                    </label>
                    <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="offers" className="font-medium text-gray-900">
                      Offers
                    </label>
                    <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                  </div>
                </div>
              </div>
            </fieldset>
       
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button onClick={() => navigate(-1)} type="button" className="rounded-md text-sm font-semibold leading-6 text-gray-900 border px-3 py-2 hover:border-slate-600">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
        {selectedProduct && <button
          onClick={(e) =>{e.preventDefault() ;setOpenModal(true)}}
          className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
         Delete
        </button>}
      </div>
      </div>
    </form>

    {selectedProduct &&  <Modal
        title={`Delete ${selectedProduct.title}`}
        message="Are you sure you want to delete this product?" 
        dangerOption="Delete" 
        cancelOption="Cancel"
        cancelAction={() => setOpenModal(null)}
        dangerAction = {handleDelete}
        showModal = {openModal}
    />}
    </>
  )
}


// import { useDispatch, useSelector } from 'react-redux';
// import {
// //   clearSelectedProduct,
//   createProductAsync,
//   fetchProductByIdAsync,
//   selectBrands,
//   selectCategories,
//   selectProductById,
// //   updateProductAsync,
// } from '../../product-list/ProductSlice';
// import { useForm } from 'react-hook-form';
// import { useParams } from 'react-router-dom';
// import { useEffect } from 'react';

// function ProductForm() {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     reset,
//     formState: { errors },
//   } = useForm();
//   const brands = useSelector(selectBrands);
//   const categories = useSelector(selectCategories);
//   const dispatch = useDispatch();
//   const params = useParams();
//   const selectedProduct = useSelector(selectProductById);

//   useEffect(() => {
//     if (params.id) {
//       dispatch(fetchProductByIdAsync(params.id));
//     } else {
//       //dispatch(clearSelectedProduct());
//     }
//   }, [params.id, dispatch]);

//   useEffect(() => {
//     if (selectedProduct && params.id) {
//       setValue('title', selectedProduct.title);
//       setValue('description', selectedProduct.description);
//       setValue('price', selectedProduct.price);
//       setValue('discountPercentage', selectedProduct.discountPercentage);
//       setValue('thumbnail', selectedProduct.thumbnail);
//       setValue('stock', selectedProduct.stock);
//     //   setValue('image1', selectedProduct.images[0]);
//     //   setValue('image2', selectedProduct.images[1]);
//     //   setValue('image3', selectedProduct.images[2]);
//       setValue('brand', selectedProduct.brand);
//       setValue('category', selectedProduct.category);
//     }
//   }, [selectedProduct, params.id, setValue]);


//   const handleDelete = () =>{
//     const product = {...selectedProduct};
//     product.deleted = true;
//     //dispatch(updateProductAsync(product));
//   }

//   return (
//     <form
//       noValidate
//       onSubmit={handleSubmit((data) => {
//         console.log(data);
//         const product = { ...data };
//         product.images = [
//           product.image1,
//           product.image2,
//           product.image3,
//           product.thumbnail,
//         ];
//         product.rating = 0;
//         delete product['image1'];
//         delete product['image2'];
//         delete product['image3'];
//         product.price = +product.price;
//         product.stock = +product.stock;
//         product.discountPercentage = +product.discountPercentage;
//         console.log(product);

//         if (params.id) {
//           product.id = params.id;
//           product.rating = selectedProduct.rating || 0;
//           //dispatch(updateProductAsync(product));
//           reset();
//         } else {
//           dispatch(createProductAsync(product));
//           reset();
//           //TODO:  on product successfully added clear fields and show a message
//         }
//       })}
//     >
//       <div className="space-y-12 bg-white p-12">
//         <div className="border-b border-gray-900/10 pb-12">
//           <h2 className="text-base font-semibold leading-7 text-gray-900">
//             Add Product
//           </h2>

//           <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//             <div className="sm:col-span-6">
//               <label
//                 htmlFor="title"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//               >
//                 Product Name
//               </label>
//               <div className="mt-2">
//                 <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
//                   <input
//                     type="text"
//                     {...register('title', {
//                       required: 'name is required',
//                     })}
//                     id="title"
//                     className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="col-span-full">
//               <label
//                 htmlFor="description"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//               >
//                 Description
//               </label>
//               <div className="mt-2">
//                 <textarea
//                   id="description"
//                   {...register('description', {
//                     required: 'description is required',
//                   })}
//                   rows={3}
//                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                   defaultValue={''}
//                 />
//               </div>
//               <p className="mt-3 text-sm leading-6 text-gray-600">
//                 Write a few sentences about product.
//               </p>
//             </div>

//             <div className="col-span-full">
//               <label
//                 htmlFor="brand"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//               >
//                 Brand
//               </label>
//               <div className="mt-2">
//                 <select
//                   {...register('brand', {
//                     required: 'brand is required',
//                   })}
//                 >
//                   <option value="">--choose brand--</option>
//                   {brands.map((brand) => (
//                     <option value={brand.value}>{brand.label}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className="col-span-full">
//               <label
//                 htmlFor="category"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//               >
//                 Category
//               </label>
//               <div className="mt-2">
//                 <select
//                   {...register('category', {
//                     required: 'category is required',
//                   })}
//                 >
//                   <option value="">--choose category--</option>
//                   {categories.map((category) => (
//                     <option value={category.value}>{category.label}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className="sm:col-span-2">
//               <label
//                 htmlFor="price"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//               >
//                 Price
//               </label>
//               <div className="mt-2">
//                 <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
//                   <input
//                     type="number"
//                     {...register('price', {
//                       required: 'price is required',
//                       min: 1,
//                       max: 10000,
//                     })}
//                     id="price"
//                     className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="sm:col-span-2">
//               <label
//                 htmlFor="discountPercentage"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//               >
//                 Discount Percentage
//               </label>
//               <div className="mt-2">
//                 <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
//                   <input
//                     type="number"
//                     {...register('discountPercentage', {
//                       required: 'discountPercentage is required',
//                       min: 0,
//                       max: 100,
//                     })}
//                     id="discountPercentage"
//                     className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="sm:col-span-2">
//               <label
//                 htmlFor="stock"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//               >
//                 Stock
//               </label>
//               <div className="mt-2">
//                 <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
//                   <input
//                     type="number"
//                     {...register('stock', {
//                       required: 'stock is required',
//                       min: 0,
//                     })}
//                     id="stock"
//                     className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="sm:col-span-6">
//               <label
//                 htmlFor="thumbnail"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//               >
//                 Thumbnail
//               </label>
//               <div className="mt-2">
//                 <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
//                   <input
//                     type="text"
//                     {...register('thumbnail', {
//                       required: 'thumbnail is required',
//                     })}
//                     id="thumbnail"
//                     className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="sm:col-span-6">
//               <label
//                 htmlFor="image1"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//               >
//                 Image 1
//               </label>
//               <div className="mt-2">
//                 <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
//                   <input
//                     type="text"
//                     {...register('image1', {
//                       required: 'image1 is required',
//                     })}
//                     id="image1"
//                     className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="sm:col-span-6">
//               <label
//                 htmlFor="image2"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//               >
//                 Image 2
//               </label>
//               <div className="mt-2">
//                 <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
//                   <input
//                     type="text"
//                     {...register('image2', {
//                       required: 'image is required',
//                     })}
//                     id="image2"
//                     className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="sm:col-span-6">
//               <label
//                 htmlFor="image2"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//               >
//                 Image 3
//               </label>
//               <div className="mt-2">
//                 <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
//                   <input
//                     type="text"
//                     {...register('image3', {
//                       required: 'image is required',
//                     })}
//                     id="image3"
//                     className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="border-b border-gray-900/10 pb-12">
//           <h2 className="text-base font-semibold leading-7 text-gray-900">
//             Extra{' '}
//           </h2>

//           <div className="mt-10 space-y-10">
//             <fieldset>
//               <legend className="text-sm font-semibold leading-6 text-gray-900">
//                 By Email
//               </legend>
//               <div className="mt-6 space-y-6">
//                 <div className="relative flex gap-x-3">
//                   <div className="flex h-6 items-center">
//                     <input
//                       id="comments"
//                       name="comments"
//                       type="checkbox"
//                       className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
//                     />
//                   </div>
//                   <div className="text-sm leading-6">
//                     <label
//                       htmlFor="comments"
//                       className="font-medium text-gray-900"
//                     >
//                       Comments
//                     </label>
//                     <p className="text-gray-500">
//                       Get notified when someones posts a comment on a posting.
//                     </p>
//                   </div>
//                 </div>
//                 <div className="relative flex gap-x-3">
//                   <div className="flex h-6 items-center">
//                     <input
//                       id="candidates"
//                       name="candidates"
//                       type="checkbox"
//                       className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
//                     />
//                   </div>
//                   <div className="text-sm leading-6">
//                     <label
//                       htmlFor="candidates"
//                       className="font-medium text-gray-900"
//                     >
//                       Candidates
//                     </label>
//                     <p className="text-gray-500">
//                       Get notified when a candidate applies for a job.
//                     </p>
//                   </div>
//                 </div>
//                 <div className="relative flex gap-x-3">
//                   <div className="flex h-6 items-center">
//                     <input
//                       id="offers"
//                       name="offers"
//                       type="checkbox"
//                       className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
//                     />
//                   </div>
//                   <div className="text-sm leading-6">
//                     <label
//                       htmlFor="offers"
//                       className="font-medium text-gray-900"
//                     >
//                       Offers
//                     </label>
//                     <p className="text-gray-500">
//                       Get notified when a candidate accepts or rejects an offer.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </fieldset>
//           </div>
//         </div>
//       </div>

//       <div className="mt-6 flex items-center justify-end gap-x-6">
//         <button
//           type="button"
//           className="text-sm font-semibold leading-6 text-gray-900"
//         >
//           Cancel
//         </button>

//        {selectedProduct && <button
//           onClick={handleDelete}
//           className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//         >
//           Delete
//         </button>}

//         <button
//           type="submit"
//           className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//         >
//           Save
//         </button>
//       </div>
//     </form>
//   );
// }

// export default ProductForm;