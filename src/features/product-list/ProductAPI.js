
export function fetchProductbyId(id){    
    return new Promise(async (resolve) => {
        const response = await fetch(`http://localhost:8086/products/`+id)
        const data = await response.json()
        resolve({data})
    })
}

export function updateProduct(update){
    return new Promise(async(resolve) => {
        //console.log('Product in API ',update);
        const response = await fetch('http://localhost:8086/products/'+update.id ,{
            method: 'PATCH' ,
            body: JSON.stringify(update) ,
            headers: {'content-type': 'application/json'} ,
        })
        const data = await response.json() ;
        resolve({data}) ;
    })
}

export function createProduct(product){
    return new Promise(async (resolve) => {
        const response = await fetch(`http://localhost:8086/products/`,{
            method: 'POST' ,
            body: JSON.stringify(product) ,
            headers: {'content-type' : 'application/json'} ,
        })
        const data = await response.json()
        resolve({data})
    })
}

export function fetchProductsByFilters(filter,sort ,pagination,admin){
    // filter= {"category":["smartphone","laptops"]}
    // sort = {_sort:"price",_order="desc"}
    //pagination = {_page:1,_limit=10} _page=1&_limit=10    
    let queryString = '';
    console.log('Filter in async func' , filter);
    for(let key in filter){
        const categoryValues = filter[key] ;
        if(categoryValues.length){
            const lastCategoryValue = categoryValues[categoryValues.length-1]
            queryString += `${key}=${lastCategoryValue}&`
        }
    }
    //console.log('Sort in async func ' , sort);
    for(let key in sort){
        queryString += `${key}=${sort[key]}&`
    }
    for(let key in pagination){
        queryString += `${key}=${pagination[key]}&`
    }

    if(admin){
        queryString += `admin=true`;
    }
    return new Promise(async (resolve) => {
        const temp = 'http://localhost:8086/products?'+queryString ; 
        console.log('API filter call URL ',temp);
        const response = await fetch('http://localhost:8086/products?'+queryString)
        const data = await response.json()
        const totalItems = await response.headers.get('X-Total-Count')
        console.log('Total items' , totalItems);
        resolve({data:{products:data , totalItems:+totalItems}})
    })
}

export function fetchAllCategories(){
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:8086/categories')
        const data = await response.json()
        resolve({data})
    })
}
export function fetchBrands(){
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:8086/brands')
        const data = await response.json()
        resolve({data})
    })
}
