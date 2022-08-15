import React from 'react';

function ModalValidation({request}){
    return(
        <div className="modal fade" id="staticBackdropModalValidation" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Eliminar operación existente</h5>
                         <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Confirme que desea eliminar la operación:</p>
                        <table>
                            <thead>
                                <th>Tipo</th>
                                <th>Concepto</th>
                                <th>Monto</th>
                                <th>Fecha</th>
                            </thead>
                            <tbody>
                                <td id="deleteType"></td>
                                <td id="deleteConcept"></td>
                                <td id="deleteAmount"></td>
                                <td id="deleteDate"></td>
                            </tbody>
                        </table>
                        <input type= "hidden" id="modalValidationId_Operation" />
                        <button type="button" onClick={request}>Confirmar</button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-primary">Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalValidation;