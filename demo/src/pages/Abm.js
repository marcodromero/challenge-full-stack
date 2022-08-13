import React from 'react';
import Form from '../components/Form.js';
import Table from '../components/Table.js';

function Abm(){
    const [operations, setOperations] = React.useState([{}]);
    const [balance, setBalance] = React.useState([{}]);

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

    const updateOperation = () => {
        alert("Funciona");
     }

     const deleteOperation = () => {
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

            <Table
                title = 'Operaciones registradas'
                data = {operations}
                isOperationsTable = {true}
            />

            
        </div>
    );
}

export default Abm;