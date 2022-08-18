import React from 'react';

function ModalForm({request, title, idModal, isFormSend}){  
    
    return(
        <div className="modal fade" id={idModal} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">{title}</h5>
                         <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <form className='d-flex flex-column'>
                        {isFormSend ? 
                            <>
                            <label htmlFor = "concept">Concepto</label>
                            <input type ="text" id="concept" required/>
                            <label htmlFor ="amount">Monto</label>
                            <input type ="number" step="0.01" id="amount" required/>
                            <label htmlFor ="date">Fecha</label>
                            <input type ="date" id="date" required/>                      
                            <label htmlFor ="type">Tipo</label>
                            <select name="type" id="type" defaultValue="DEFAULT" required>
                                <option  value ="DEFAULT" disabled></option>
                                <option value="ingreso">Ingreso</option>
                                <option value="egreso">Egreso</option>
                            </select>        
                            </> :
                            <>
                                <label htmlFor = "updateConcept">Concepto</label>
                                <input type ="text" id="updateConcept" required/>
                                <label htmlFor ="updateAmount">Monto</label>
                                <input type ="number" step="0.01" id="updateAmount" required/>
                                <label htmlFor ="updateDate">Fecha</label>
                                <input type ="date" id="updateDate" required/>                       
                                <input id="updateOperation" type="hidden"/>
                            </>
                        }          
            </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-primary" onClick={request} >Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalForm;