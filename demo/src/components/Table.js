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
                         <td><button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdropModalForm"
                          onClick = {()=>{
                            document.getElementById("modalAmount").value = item.amount;
                            document.getElementById("modalConcept").value = item.concept;
                            document.getElementById("modalDate").value = item.date;
                            document.getElementById("modalId_operation").value = item.id_operation;
                            }}>
                                Modificar
                            </button>
                            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdropModalValidation"
                          onClick = {()=>{
                                document.getElementById("modalValidationId_Operation").value = item.id_operation;
                               
                                document.getElementById("deleteType").textContent= `"${item.type}"`;
                                document.getElementById("deleteConcept").textContent= `"${item.concept}"`;
                                document.getElementById("deleteAmount").textContent= `"${item.amount}"`;
                                document.getElementById("deleteDate").textContent= `"${item.date}"`;
                            }}>
                                Eliminar
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