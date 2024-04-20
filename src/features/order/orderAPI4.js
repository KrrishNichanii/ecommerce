export function createOrder(order){
    return new Promise(async (resolve , reject) => {
         console.log('order in new API',order);
         const response = await fetch('http://localhost:8086/testing',{
            method : 'POST' , 
            body : JSON.stringify(order) ,
            headers: {'content-type' : 'application/json'}
         }) ; 
         
         const data = await response.json() ; 
         
         resolve({data}) ; 
    }) 
}

export function updateOrder(order){
    
}
export function fetchAllOrders(order){

}
