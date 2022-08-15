import React from 'react'

function Form({request, isModal, title}){
    return(
        <div>
            <h1>{title}</h1>
            <form>                   
                    {isModal ? 
                            (
                            <>
                                <label htmlFor ="modalConcept">Concepto</label>
                                <input type ="text" id="modalConcept" />
                                <label htmlFor ="modalAmount">Monto</label>
                                <input type ="number" step="0.01" id="modalAmount" />
                                <label htmlFor ="modalDate">Fecha</label>
                                <input type ="date" id="modalDate" />
                                <input type = "hidden" id="modalId_operation" />
                            </>
                            )
                            :
                            (
                            <>
                                <label htmlFor ="concept">Concepto</label>
                                <input type ="text" id="concept" />
                                <label htmlFor ="amount">Monto</label>
                                <input type ="number" step="0.01" id="amount" />
                                <label htmlFor ="date">Fecha</label>
                                <input type ="date" id="date" />
                                <label htmlFor ="type">Tipo</label>
                                <select name="type" id="type">
                                    <option value="ingreso">Ingreso</option>
                                    <option value="egreso">Egreso</option>
                                </select>
                            </>
                            )
                        
                    }
                    
                    <button type= 'button' onClick={request}> Enviar </button>
            </form>
        </div>
    );
}

export default Form;