import React from 'react';

function Display({data, title, isOperations, idButtonTarget}){
    
return(
    <div className="card text-center mb-1">
        <div className="card-body">
            <h3 className="card-title">{title}</h3>
            <h2 className="card-text">{data[0].amount}</h2>
        </div>
        <div className="card-footer text-muted">
            {isOperations ? (<button className="btn btn-primary" data-bs-toggle="modal" data-bs-target={idButtonTarget}>Abrir formulario</button>) : data[0].formattedDate}
        </div>
    </div>
        
   
)
}

export default Display;