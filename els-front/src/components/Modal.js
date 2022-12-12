import React from "react";
import { AiOutlineClose, AiOutlineExclamationCircle } from "react-icons/ai";
import ReactModal from "react-modal";
import Button from "./Button";

ReactModal.setAppElement('#modal');

const Modal = (props) => {
    return (
        <ReactModal 
           isOpen={props.isDeleting}
           contentLabel="onRequestClose Example"
           onRequestClose={props.closeModal}
           className="modal-design"
           overlayClassName=""
        >
            <div className="relative w-full h-full max-w-md md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <Button onClick={props.closeModal} usage="close_modal">
                        <AiOutlineClose className="w-5 h-5"/>
                        <span className="sr-only">Close</span>
                    </Button>
                    <div className="p-6 text-center">
                        <AiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"/>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{props.questionText || "Are you sure you want to delete this ?"}</h3>
                        <Button onClick={props.proceedProcess} usage="modal_confirm">
                            {props.confirmText || "Yes, I'm sure"}
                        </Button>
                        <Button
                            onClick={props.closeModal}
                            usage="cancel_modal"
                        >{props.cancelText || `No, cancel`}</Button>
                    </div>
                </div>
            </div>
        </ReactModal>
    )
}

export default Modal;