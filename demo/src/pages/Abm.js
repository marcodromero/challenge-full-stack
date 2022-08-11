import React from 'react';

function Abm(){
    const [operations, setOperations] = React.useState([{}]);

    const getOperations = ()=>{
        const api = new XMLHttpRequest();
        api.open('GET', 'http://localhost:8080/operations', true);
        api.send();

        api.onreadystatechange = () => {
            if(api.status == 200 && api.readyState == 4){
                setOperations(JSON.parse(api.responseText));
             }

        }
    }

    React.useEffect(()=>{
        getOperations();
    }, []);

    return(
        <div className="Abm">
            <h1>Formulario de ingreso de operacion</h1>
            <form>
                <label for ="concept">Concepto</label>
                <input type ="text" id="concept"/>
                <label for ="amount">Monto</label>
                <input type ="number" step="0.01" id="amount"/>
                <label for ="date">Fecha</label>
                <input type ="date" id="date"/>
                <label for ="type">Tipo</label>
                <select name="type" id="type">
                    <option value="ingreso">Ingreso</option>
                    <option value="egreso">Egreso</option>
                </select>
                <input type="submit" value="Cargar operación"/>
            </form>

            <h1>Operaciones registradas</h1>
            {
                operations.map(item => (
                    <p key = {item.id_operation}> {item.type} {item.concept} {item.amount} {item.date}</p>
                ))
            }
        </div>
    );
}

export default Abm;