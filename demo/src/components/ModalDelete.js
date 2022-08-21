import React from 'react';

function ModalDelete({request, idModal, idAlert}){
    React.useEffect(()=>{
        //Clicking anywhere on the modal will hide the notification if it was visible.
        const alertHide = ()=>{
            document.getElementById(idModal).onclick = ()=>{
                let alert = document.getElementById(idAlert);
                alert.className = "alert alert-danger d-none";
        }};

        alertHide();
    },[]);
    return(
        <div className="modal fade " id={idModal} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Confirme que desea eliminar la operación</h5>
                         <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="buttonCloseModalDelete"></button>
                    </div>
                    <div className="modal-body">
                        <div className="card" >
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item" id="deleteAmount"></li>
                                <li className="list-group-item" id="deleteDate"></li>
                                <li className="list-group-item" id="deleteConcept"></li>
                            </ul>   
                            <input type= "hidden" id="modalValidationId_Operation" />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="buttonCloseModalDelete2">Volver</button>
                        <button type="submit" onClick={request} className="btn btn-primary" id="buttonDelete" >Confirmar</button>
                    </div>
                    <div className="alert alert-success d-none " role="alert" id={idAlert}></div>
                </div>
            </div>
        </div>
    );
}

export default ModalDelete;