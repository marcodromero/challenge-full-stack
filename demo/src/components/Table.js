import React from 'react'

function Table({title, data, isOperationsTable, idButtonTarget}){
 

    return(
        <div>
            <h3>{title}</h3>
            <div className="table-responsive">
                <table className="table table-hover table-sm ">
                    <thead className="table-secondary">
                        <tr >
                            {isOperationsTable ? (<><th>Tipo</th><th>Concepto</th></>) : ('') }
                            
                            <th>Monto</th>
                            <th>Fecha</th>

                            {isOperationsTable ? (<><th>Opciones</th></>) : ('') }
                        </tr>
                    </thead>
                    <tbody>
                {
                    data.map(item => (
                        <tr key = {'key' +  item.id_operation} className= {item.amount < 0 ? "table-warning" : "table-info"}>
                            {isOperationsTable ? (<>
                            <td className="text-capitalize">{item.type}</td> 
                            <td className="text-capitalize">{item.concept}</td>
                            </>) : ('') }
                            <td>{item.amount}</td>
                            <td>{item.formattedDate}</td>
                            {isOperationsTable ? (<>
                            <td><button type="button" className="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target={idButtonTarget}
                            onClick = {()=>{
                                document.getElementById("updateAmount").value = item.amount;
                                document.getElementById("updateConcept").value = item.concept;
                                document.getElementById("updateDate").value = item.date;
                                document.getElementById("updateOperation").value = item.id_operation;
                                }}>
                                    Modificar
                                </button>
                                <button type="button" className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdropModalValidation"
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
        </div>

    );
}

export default Table;