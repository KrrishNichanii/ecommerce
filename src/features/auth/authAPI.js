export function createUser(userData){
    return new Promise(async (resolve) =>{
        //console.log('API',userData);
        const response = await fetch('http://localhost:8086/auth/signup',{
            method:'POST',
            body: JSON.stringify(userData),
            headers:{'content-type':'application/json'}
        });
        const data = await response.json() ;
        console.log('API response after signup ',data);
        resolve({data});
    })
}

export function testing(){
    return new Promise(async (resolve ,reject ) => {
        
    })
}
export function signOut(userId){
    return new Promise(async (resolve) =>{
       const response = await fetch('http://localhost:8086/auth/logout')
        resolve({data : 'success'});
    })
}
export function checkUser(loginInfo){
    return new Promise(async (resolve ,reject) =>{
        try {
            //console.log('API',loginInfo);
            const response = await fetch('http://localhost:8086/auth/login',{
                method: 'POST',
                body: JSON.stringify(loginInfo) ,
                headers: {'content-type' : 'application/json'},

            });
            console.log('Response',response);
            if(response.ok){
                const data = await response.json();
                console.log('Data from response ',data);
                document.cookie = `token=${data.token}; max-age=${60 * 60}; path=/`; 
                resolve({ data }) ; 
            }
            else{
                const err = await response.json() ;
                //console.log('Err from response ',err);
                reject({ err }) ; 
            }
            
        } catch (error) {
            reject({error}) ;
        }
        
    //     const email = loginInfo.email ;
    //     const password = loginInfo.password ;
    //     const data = await response.json() ;
    //     console.log('Data in checkUser',data);
    //     if(data.length){
    //         if(password === data[0].password)
    //           resolve({data:data[0]}) ; 
    //         else reject({message: 'wrong credentials'})
    //     }
    //     else{
    //           reject({message:'user not found'}) ;
    //     }
    // }).catch(err => console.log('login error',err)
    })

}

export function checkAuth() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('http://localhost:8080/auth/check');
        if (response.ok) {
          const data = await response.json();
          resolve({ data });
        } else {
          const error = await response.text();
          reject(error);
        }
      } catch (error) {
        reject( error );
      }
  
      // TODO: on server it will only return some info of user (not password)
    });
  }