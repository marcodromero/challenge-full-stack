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
                    <tr key = {'key' +  item.id_operation}>
                        {isOperationsTable ? (<>
                         <td>{item.type}</td> 
                         <td>{item.concept}</td>
                         </>) : ('') }
                         <td>{item.amount}</td>
                         <td>{item.formattedDate}</td>
                         {isOperationsTable ? (<>
                         <td><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                          onClick = {()=>{
                            document.getElementById("modalAmount").value = item.amount;
                            document.getElementById("modalConcept").value = item.concept;
                            document.getElementById("modalDate").value = item.date;
                            document.getElementById("modalId_operation").value = item.id_operation;
                            }}>
                                Modificar
                            </button>
                        </td></>) : ('')}
                    </tr>))
            }
                </tbody>
            </table>
        </div>

    );
}

export default Table;