import React from 'react';
import Form from '../components/Form.js';
import Table from '../components/Table.js';
import ModalForm from '../components/ModalForm.js';
import ModalValidation from '../components/ModalValidation.js';

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
        const type = document.getElementById('type').value;
        const concept = document.getElementById('concept').value;
        const amount = document.getElementById('amount').value;
        const date = document.getElementById('date').value;
        
        const api = new XMLHttpRequest();
        api.open('POST', 'http://localhost:8080/operations', true);
        api.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        api.send(JSON.stringify(
            {
                "type" : `${type}`,
                "concept": `${concept}`,
                "amount" : `${amount}`,
                "date" : `${date}`
            }
        ));

        api.onreadystatechange = () => {
            if(api.status == 200 && api.readyState == 4){
                getOperations();
             }

        }

        return false;
    }

    const updateOperation = () => {
        const concept = document.getElementById('modalConcept').value;
        const amount = document.getElementById('modalAmount').value;
        const date = document.getElementById('modalDate').value;
        const id_operation = document.getElementById('modalId_operation').value;
        
        const api = new XMLHttpRequest();
        api.open('PATCH', 'http://localhost:8080/operations', true);
        api.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        api.send(JSON.stringify(
            {
                "id_operation": `${id_operation}`,
                "concept": `${concept}`,
                "amount" : `${amount}`,
                "date" : `${date}`
            }
        ));

        api.onreadystatechange = () => {
            if(api.status == 200 && api.readyState == 4){
                getOperations();
             }

        }

        return false;
      }

      const deleteOperation = () => {
        const id_operation = document.getElementById('modalValidationId_Operation').value;
        
        const api = new XMLHttpRequest();
        api.open('DELETE', 'http://localhost:8080/operations', true);
        api.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        api.send(JSON.stringify(
            {
                "id_operation": `${id_operation}`
            }
        ));

        api.onreadystatechange = () => {
            if(api.status == 200 && api.readyState == 4){
                getOperations();
             }

        }

        return false;
      }


    React.useEffect(()=>{
       getOperations();
    }, []);

    return(
        <div className="Abm">
        
          
                <Form
                    title = 'Formulario de ingreso de operación'
                    request = {sendOperation}
                    isModal = {false}
                    
                />

                <Table
                    title = 'Operaciones registradas'
                    data = {operations}
                    isOperationsTable = {true}
                />

                <ModalForm
                    data = {updateOperation}
                />
                <ModalValidation
                    request = {deleteOperation}
                />

                
            
        </div>
    );
}

export default Abm;