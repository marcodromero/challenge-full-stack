import React from 'react';
import Table from '../components/Table.js';
import ModalForm from '../components/ModalForm.js';
import ModalValidation from '../components/ModalValidation.js';
import Navbar from '../components/Navbar.js';
import Display from '../components/Display.js';

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
            if(api.status == 201 && api.readyState == 4){
                getOperations();
             }
             console.log(api.responseText);
        }
        

      
    }

    const updateOperation = () => {
        const concept = document.getElementById('updateConcept').value;
        const amount = document.getElementById('updateAmount').value;
        const date = document.getElementById('updateDate').value;
        const id_operation = document.getElementById('updateOperation').value;
        
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
            if(api.status == 204 && api.readyState == 4){
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
            if(api.status == 204 && api.readyState == 4){
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
                <Navbar />
          
                <Display
                title = 'Nueva operación'
                value = {[0]}
                idButtonTarget = '#staticBackdropModalFormSend'
                isOperations = {true}
                />

                <Table
                    title = 'Operaciones registradas'
                    data = {operations}
                    isOperationsTable = {true}
                    idButtonTarget = '#staticBackdropModalFormUpdate'
                />

                <ModalForm
                    request = {sendOperation}
                    title = 'Registrar operación'
                    idModal = 'staticBackdropModalFormSend'
                    isFormSend = {true}
                />

                <ModalForm
                    request = {updateOperation}
                    title = 'Modificar operación'
                    idModal = 'staticBackdropModalFormUpdate'
                    isFormSend = {false}
                />

                <ModalValidation
                    request = {deleteOperation}
                />

                
            
        </div>
    );
}

export default Abm;