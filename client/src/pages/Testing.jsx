import React, { useEffect } from 'react'

function Testing() {
    useEffect(() => {
        const temp = async () => {
            const response = await  fetch('http://localhost:8086/testing') ; 
             console.log('Response after testing ' , response);
        }

        temp() ; 
    },[])
  return (
    <div>Testing</div>
  )
}

export default Testing