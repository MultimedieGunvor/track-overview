import React, { useState, useRef, useEffect } from "react";
import { collection, onSnapshot, orderBy, query, doc, writeBatch } from "firebase/firestore";
import { db } from "../firebaseConfig";
import DeleteWagon from "./DeleteWagon";

// --- Gunvor is trying out a drag 'n drop solution here ---

export default function OtherStation () {
    const dragItem = useRef();
    const dragOverItem = useRef();

    const [Wagons, SetWagons] = useState([]);
    useEffect(() => {
        const wagonRef = collection(db, "wagons");
        const q = query(wagonRef, orderBy("position", "asc"));
        onSnapshot(q, (snapshot) => {
            const wagons = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            SetWagons(wagons);
            console.log(wagons);
        }); 
    }, []);


    // --- Handling info-modal for wagons ---
    
    const [hoveredInfo, setHoveredInfo] = useState(-1);

    const showInfoHandler = (i) => {
        setHoveredInfo(i);
    }
    const hideInfoHandler = () => {
        setHoveredInfo(-1);
    }
 
    /* --- Locate the items to be dragged --- */
    const dragStart = (e, position) => {
        dragItem.current = position;
        console.log(e.target.innerHTML);
    };
 
    /* --- Which element is the dragged element floating on? --- */ 
    const dragEnter = (e, position) => {
        dragOverItem.current = position;
        console.log(e.target.innerHTML);
    };



    // function handleShunt(wagons) {        
        
    // }
 
  /* --- Insert dragged item and rearrange the list of items. Here we would probably need to add a function to reassign the item's track/position in the database. Remember the useEffect. --- */  
    const drop = (e) => {
        if (window.confirm(`Shunt wagon ${dragItem.current} to ${dragOverItem.current}`)) {


            const copyWagons = [...Wagons];
            const dragItemContent = copyWagons[dragItem.current];
            copyWagons.splice(dragItem.current, 1);
            copyWagons.splice(dragOverItem.current, 0, dragItemContent);
            dragItem.current = null;
            dragOverItem.current = null;
            SetWagons(copyWagons); // updateDoc (see AddWagon. All the wagons' positions need to be updated!)
            // handleShunt(copyWagons);
            // console.log("Shunt completed", copyWagons[0].id);
            copyWagons.forEach(element => console.log(element.position)); // Update the database (maybe via batch?)
        }
    };

    

    return (
        
        <>            
            <div className="other-wagons">
            {Wagons.length === 0 ? (
                    <p>No wagons found</p>
                ) : (
                    Wagons.map(
                        ({ id, wagonId, shortId, litra, color, destination, damage, comment, track, position }, i) => (
                            <div className="wagon" 
                            key={id} 
                            onMouseEnter={() => showInfoHandler(i)} 
                            onMouseLeave={hideInfoHandler}
                            onDragStart={(e) => dragStart(e, i)} 
                            onDragEnter={(e) => dragEnter(e, i)} 
                            onDragEnd={drop}
                            draggable> 
                                <p className={color}>{shortId}</p>
                                <div className="wagon-info" style={{display: hoveredInfo === i ? 'block' : 'none'}} >
                                    <p>{track}</p>
                                    <p>{position}</p>
                                    <p>{destination}</p>
                                    <p>{wagonId}</p>
                                    <p>{comment}</p>
                                    <p>{litra}</p>
                                    <p>{damage}</p>
                                    <DeleteWagon id={id}/>
                                </div>
                            </div>
                        )
                    )
                )}

            </div>
        </>
    );
};