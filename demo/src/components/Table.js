import React from 'react'

function Table({title, data, isOperationsTable}){
 

    return(
        <div>
            <h1>{title}</h1>
            <table border ='1'>
                <tr>
                    {isOperationsTable ? (<><th>Tipo</th> <th>Concepto</th></>) : ('') }
                
                    <th>Monto</th>
                    <th>Fecha</th>
                </tr>
            {
                data.map(item => (
                    <tr key = {item.id_operation}>
                        {isOperationsTable ? (<>
                         <td>{item.type}</td> 
                         <td>{item.concept}</td>
                         </>) : ('') }
                         <td>{item.amount}</td>
                         <td>{item.date}</td>
                    </tr>
                ))
            }
            </table>
        </div>

    );
}

export default Table;