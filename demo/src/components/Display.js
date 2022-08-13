import React from 'react';

function Display({value, title}){
return(
    <>
        <h1>{title}</h1>
        <p>{value[0].amount}</p>
    </>
)
}

export default Display;