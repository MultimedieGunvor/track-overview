import * as React from "react";
import DeleteWagon from "./DeleteWagon";

const Modal = ({props}) => {
    return (
        <div className="wagon-info" style={{fontSize: '12px'}}>
            <p>Track: {props.track.toUpperCase()}</p>
            <p>Position: {props.position}</p>
            <p>Destination: {props.destination}</p>
            <p>ID: {props.wagonId}</p>
            <p>Comments: {props.comment}</p>
            <p>Litra: {props.litra}</p>
            <p>Damage: {props.damage}</p>
            <DeleteWagon id={props.id}/>
        </div>
    );
};

export default Modal;