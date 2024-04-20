export function createOrder(order){
    return new Promise(async (resolve)=>{
      console.log('Order in API ',order);
      const response = await fetch('http://localhost:8086/orders',{
        method:'POST' ,
        body: JSON.stringify(order) ,
        headers:{ 'content-type':'application/json'} ,
      }) ;
      const data = await response.json() ;
      console.log('Data received from order backend ',data);
      resolve({data}) ; 
    })
}

export function updateOrder(order){
    return new Promise(async (resolve)=>{
      const response = await fetch('http://localhost:8086/orders/'+order.id,{
        method:'PATCH' ,
        body: JSON.stringify(order) ,
        headers:{ 'content-type':'application/json'} ,
      }) ;
      const data = await response.json() ;
      resolve({data}) ; 
    })
}

export function fetchAllOrders({sort ,pagination}){
    let queryString = '' ;
    console.log('Sort in Order API ',sort);
    for(let key in pagination){
      queryString += `${key}=${pagination[key]}&`;
    }
     //TODO :  add sorting when connecting with backend
    // for(let key in sort){
    //   queryString += `${key}=${sort[key]}&`;
    // }
    const temp = 'http://localhost:8086/orders?'+queryString ;
    console.log('Order API call ',temp);
    return new Promise(async (resolve) => {
      const response = await fetch('http://localhost:8086/orders?'+queryString);
      const data = await response.json() ;
      const totalOrders = await response.headers.get('X-Total-Count') ;
      resolve({ data:{orders: data , totalOrders: +totalOrders} }) ;
    })
}