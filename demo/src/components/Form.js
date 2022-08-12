import React from 'react'

function Form({request, typeIsEnabled, title, concept , date, amount}){
    return(
        <div>
            <h1>{title}</h1>
            <form method='POST'>
                    <label for ="concept">Concepto</label>
                    <input type ="text" id="concept" value = {concept}/>
                    <label for ="amount">Monto</label>
                    <input type ="number" step="0.01" id="amount" value = {amount}/>
                    <label for ="date">Fecha</label>
                    <input type ="date" id="date" value={date}/>
                    <label for ="type">Tipo</label>
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
                    
                    <button onClick={request}> Cargar operación </button>
            </form>
        </div>
    );
}

export default Form;