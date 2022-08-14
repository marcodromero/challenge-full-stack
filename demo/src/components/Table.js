import React from 'react'

function Table({title, data, isOperationsTable}){
 

    return(
        <div>
            <h1>{title}</h1>
            <table>
                <thead>
                    <tr>
                        {isOperationsTable ? (<><th>Tipo</th><th>Concepto</th></>) : ('') }
                        
                        <th>Monto</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
            {
                data.map(item => (
                    <tr key = {item}>
                        {isOperationsTable ? (<>
                         <td>{item.type}</td> 
                         <td>{item.concept}</td>
                         </>) : ('') }
                         <td>{item.amount}</td>
                         <td>{item.date}</td>
                         <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                Modificar
                            </button>
                        </td>
                    </tr>))
            }
                </tbody>
            </table>
        </div>

    );
}

export default Table;