import * as React from "react";

const Modal = (props) => {
    if (!props.show) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">{props.children}</div>
        </div>
    );
};

export default Modal;