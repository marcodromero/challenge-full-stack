import React from 'react';

function ModalValidation({request}){
    return(
        <div className="modal fade" id="staticBackdropModalValidation" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Confirme que desea eliminar la operación</h5>
                         <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        
                        <table className='table table-sm table-bordered border-dark'>
                            <thead className="table-secondary">
                                <tr>
                                    <th>Tipo</th>
                                    <th>Concepto</th>
                                    <th>Monto</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className= "table-dark ">
                                    <td id="deleteType"></td>
                                    <td id="deleteConcept"></td>
                                    <td id="deleteAmount"></td>
                                    <td id="deleteDate"></td>
                                </tr>
                            </tbody>
                        </table>
                        <input type= "hidden" id="modalValidationId_Operation" />
                        
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" onClick={request} className="btn btn-primary" data-bs-dismiss="modal">Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalValidation;