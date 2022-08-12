import React from 'react';
import Form from '../components/Form.js';

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

    const sendOperation = () => {
       alert("Funciona");
    }

    React.useEffect(()=>{
        getOperations();
    }, []);

    return(
        <div className="Abm">
       
            <Form
                title = 'Formulario de ingreso de operación'
                request = {sendOperation}
                typeIsEnabled = {true}
                concept = ''
                amount = {0}
                date = ''
            />

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