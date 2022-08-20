import React from 'react';
import Table from '../components/Table.js';
import ModalForm from '../components/ModalForm.js';
import ModalValidation from '../components/ModalValidation.js';
import Navbar from '../components/Navbar.js';
import Display from '../components/Display.js';


function Abm(){
    const [operations, setOperations] = React.useState([]);

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
        let type = document.getElementById('type').value;
        let concept = document.getElementById('concept').value;
        let amount = document.getElementById('amount').value;
        let date = document.getElementById('date').value;
        const alert = document.getElementById("alertSend");
        
        
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
                alert.innerText = api.responseText;  
                alert.className = "alert alert-success d-block";
                document.getElementById('type').value = undefined;
                document.getElementById('concept').value = '';
                document.getElementById('amount').value = undefined;
                document.getElementById('date').value = undefined;
                
             }
             if(api.status == 400 && api.readyState == 4){
                alert.innerText = api.responseText;               
                alert.className = "alert alert-danger d-block";
             }
             
        }
        

      
    }

    const updateOperation = () => {
        const concept = document.getElementById('updateConcept').value;
        const amount = document.getElementById('updateAmount').value;
        const date = document.getElementById('updateDate').value;
        const id_operation = document.getElementById('updateOperation').value;
        const alert = document.getElementById("alertUpdate");
        
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
                alert.innerText = "Se han hechos los cambios con exito.";  
                alert.className = "alert alert-success d-block";
                const buttonUpdate = document.getElementById("buttonUpdate");
                buttonUpdate.className = "btn btn-primary d-none";
                const buttonCloseModalUpdate = document.getElementById("buttonCloseModalUpdate");
                buttonCloseModalUpdate.addEventListener("click", ()=>{buttonUpdate.className = "btn btn-primary d-block";});
                const buttonCloseModalUpdate2 = document.getElementById("buttonCloseModalUpdate2");
                buttonCloseModalUpdate2.addEventListener("click", ()=>{buttonUpdate.className = "btn btn-primary d-block";});
             }
             if(api.status == 400 && api.readyState == 4){
                alert.innerText = api.responseText;               
                alert.className = "alert alert-danger d-block";
             }
        }

        return false;
      }

      const deleteOperation = () => {
        const id_operation = document.getElementById('modalValidationId_Operation').value;
        const alert = document.getElementById("alertDelete");
        
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
                alert.innerText= "Se ha eliminado el registro con exito.";
                alert.className = "alert alert-success d-block";
                const buttonDelete = document.getElementById("buttonDelete");
                buttonDelete.className = "btn btn-primary d-none";
                const buttonCloseModalDelete = document.getElementById("buttonCloseModalDelete");
                buttonCloseModalDelete.addEventListener("click", ()=>{buttonDelete.className = "btn btn-primary d-block";});
                const buttonCloseModalDelete2 = document.getElementById("buttonCloseModalDelete2");
                buttonCloseModalDelete2.addEventListener("click", ()=>{buttonDelete.className = "btn btn-primary d-block";});
             }
             if(api.status == 400 && api.readyState == 4){
                alert.innerText = api.responseText;               
                alert.className = "alert alert-danger d-block";
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
                data = {[0]}
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
                    idForm = 'formSend'
                    idAlert = 'alertSend'
                    
                />

                <ModalForm
                    request = {updateOperation}
                    title = 'Modificar operación'
                    idModal = 'staticBackdropModalFormUpdate'
                    isFormSend = {false}
                    idForm= 'formUpdate'
                    idAlert = 'alertUpdate'
                    
                />

                <ModalValidation
                    request = {deleteOperation}
                    idModal = 'staticBackdropModalValidation'
                    idAlert = 'alertDelete'
                    
                />

                
            
        </div>
    );
}

export default Abm;