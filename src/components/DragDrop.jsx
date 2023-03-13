import { useRef } from "react";
// import { doc, writeBatch } from "firebase/firestore";
// import { db } from "../firebaseConfig";

export const DragItem = () => {
    const dragItem = useRef();
    console.log(dragItem.current)
    return dragItem;
}

export const DragOverItem = () => {
    const dragOverItem = useRef();
    return dragOverItem;
}

export const DragOverTrack = () => {
    const dragOverTrack = useRef();
    return dragOverTrack;
}

// const dragItem = useRef(); // --- Should these be exported??
// const dragOverItem = useRef();
// const dragOverTrack = useRef();
// --- Should we add dragTrack and dragOverTrack?? Or is that not necessary if we pass track as a prop, too??

// --- Locate the items to be dragged --- 
export const dragStart = ({e, position}) => { // (e, position, track) ??
    DragItem.current = position;
    //dragTrack.current = track;
    // console.log(e.target.innerHTML);
};

// --- Which element is the dragged element floating on? --- 
export const dragEnter = ({e, position, track}) => { //(e, position, track) ??
    DragOverItem.current = position;
    DragOverTrack.current = track; 
    console.log(e.target.innerHTML);
};





// --- Insert dragged item and rearrange the list of items.  ---  
export const drop = async ({e}) => { // --- ({e, wagons})
    if (DragOverItem.current === undefined) {
        console.log("Congrats! You found an empty slot!");
        if (window.confirm(`Shunt wagon ${DragItem.current} to track: ${DragOverTrack.current} position: ${DragOverItem.current}`)) { 
            console.log("So far, so good");
            // const copyWagons = [...wagons];
            // const dragItemContent = copyWagons[dragItem.current];
            // dragItemContent.track = dragOverTrack.current;
            // copyWagons.splice(dragItem.current, 1); 
            // copyWagons.splice(dragOverItem.current, 1, dragItemContent);
            DragItem.current = null;
            DragOverItem.current = null;
            // dragTrack.current = null;
            DragOverTrack.current = null;
            // copyWagons.forEach((element, index) => {
            //     element.position = index + 1;                
            // });
            // // console.log(copyWagons);

            // // --- Update database with the changed wagon positions ---
            // const batch = writeBatch( db );
            // copyWagons.forEach((element) => {
            //     const elementID = element.id;
            //     const elementPosition = element.position;
            //     const elementTrack = element.track;
            //     const idRef = doc(db, 'wagons', elementID); 
            //     batch.update(idRef, {"position": elementPosition});
            //     batch.update(idRef, {"track": elementTrack});
            // });
            // await batch.commit(); 
        }
    } else {
        alert("Cannot shunt to occupied position");
    }
};
