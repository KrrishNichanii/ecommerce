export function fetchLoggedInUserOrders(userId){
    return new Promise(async (resolve) =>{
        const response = await fetch('http://localhost:8086/orders/user/'+userId)
        const data =await response.json() ;
        resolve({data}) ;   
    })
}

export function fetchLoggedInUser(id){
    return new Promise(async (resolve) =>{
        const response = await fetch('http://localhost:8086/users/own/'+id);
        const data =await response.json() ;
        console.log('Own response' , data);
        resolve({data}) ;   
    })
}
export function updateUser(update){
    return new Promise(async (resolve) =>{
        const response = await fetch('http://localhost:8086/users/' + update.id,{
            method:'PATCH',
            body: JSON.stringify(update),
            headers:{'content-type':'application/json'}
        });
        const data = await response.json() ;
        resolve({data});
    })
}