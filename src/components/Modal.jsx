import * as React from "react";
import DeleteWagon from "./DeleteWagon";

const Modal = ({props}) => {
    return (
        <div className="wagon-info" style={{fontSize: '12px'}}>
            <p>{props.track}</p>
            <p>{props.position}</p>
            <p>{props.destination}</p>
            <p>{props.wagonId}</p>
            <p>{props.comment}</p>
            <p>{props.litra}</p>
            <p>{props.damage}</p>
            <DeleteWagon id={props.id}/>
        </div>
    );
};

export default Modal;