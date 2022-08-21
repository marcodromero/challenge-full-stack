import React from 'react'

function Card({title, data, isOperationsTable, idButtonTarget}){
    return(
        <div>
            <h3 className = "text-center mt-4">{title}</h3>
            {data.map(item => (
                <div className="card ">
                    <div className="card-body d-lg-flex justify-content-lg-between" >
                        <h5 id="columnAmount" className= {item.amount < 0 ? "card-title text-danger" : " card-title text-dark"}>${item.amount}</h5>
                        <p className="card-text d-block" id="columnConcept">{item.concept}</p>
                        <p className="card-text fst-italic text-secondary">{item.formattedDate}</p>
                        
                        {isOperationsTable ? (
                        <div>
                            <button type="button" className="btn btn-warning btn-sm me-2" data-bs-toggle="modal" data-bs-target={idButtonTarget}
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
                                
                                let node;
                                let li;
                                
                                node = document.createElement("p");
                                node.innerHTML = `Concepto: ${item.concept}`;
                                li = document.getElementById("deleteConcept");
                                li.innerHTML = "";
                                li.appendChild(node);

                                node = document.createElement("p");
                                node.innerHTML = `Monto: $${item.amount}`;
                                li = document.getElementById("deleteAmount");
                                li.innerHTML = "";
                                li.appendChild(node);

                                node = document.createElement("p");
                                node.innerHTML = `Fecha: ${item.date}`;
                                li=document.getElementById("deleteDate");
                                li.innerHTML = "";
                                li.appendChild(node);

                            }}>
                                Eliminar
                            </button>
                        </div>) : ('')}
                    </div>
                </div>
             ))
            }
        </div>

    );
}

export default Card;