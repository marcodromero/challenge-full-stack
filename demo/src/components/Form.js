import React from 'react'

function Form({request, typeIsEnabled, title, concept , date, amount}){
    return(
        <div>
            <h1>{title}</h1>
            <form>
                    <label htmlFor ="concept">Concepto</label>
                    <input type ="text" id="concept" defaultValue = {concept}/>
                    <label htmlFor ="amount">Monto</label>
                    <input type ="number" step="0.01" id="amount" defaultValue = {amount}/>
                    <label htmlFor ="date">Fecha</label>
                    <input type ="date" id="date" defaultValue={date}/>
                    <label htmlFor ="type">Tipo</label>
                    {typeIsEnabled ? 
                            (<select name="type" id="type">
                                <option value="ingreso">Ingreso</option>
                                <option value="egreso">Egreso</option>
                            </select>)
                            :
                            (
                                ''
                            )
                        
                    }
                    
                    <button type= 'button' onClick={request}> Cargar operación </button>
            </form>
        </div>
    );
}

export default Form;