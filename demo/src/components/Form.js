import React from 'react'

function Form({request, isModal}){
    return(
        <div>
            
            <form className='d-flex flex-column'>                   
                    {isModal ? 
                            (
                            <>
                                <label htmlFor ="modalConcept">Concepto</label>
                                <input type ="text" id="modalConcept" required/>
                                <label htmlFor ="modalAmount">Monto</label>
                                <input type ="number" step="0.01" id="modalAmount" required/>
                                <label htmlFor ="modalDate">Fecha</label>
                                <input type ="date" id="modalDate" required />
                                <input type = "hidden" id="modalId_operation" />
                            </>
                            )
                            :
                            (
                            <>
                                <label htmlFor ="concept">Concepto</label>
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
                            </>
                            )
                        
                    }
                    
                    <button type='submit' onClick={request} className="btn btn-primary" data-bs-dismiss="modal">Enviar</button>
            </form>
        </div>
    );
}

export default Form;