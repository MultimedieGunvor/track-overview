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
        hideInfoHandler();
        console.log(e.target.innerHTML);
    };
 
    /* --- Which element is the dragged element floating on? --- */ 
    const dragEnter = (e, position) => {
        dragOverItem.current = position;
        console.log(e.target.innerHTML);
    };

    const batch = writeBatch( db );


 
  /* --- Insert dragged item and rearrange the list of items.  --- */  
    const drop = async (e) => {
        if (window.confirm(`Shunt wagon ${dragItem.current} to ${dragOverItem.current}`)) {


            const copyWagons = [...Wagons];
            const dragItemContent = copyWagons[dragItem.current];
            copyWagons.splice(dragItem.current, 1);
            copyWagons.splice(dragOverItem.current, 0, dragItemContent);
            dragItem.current = null;
            dragOverItem.current = null;
            copyWagons.forEach((element, index) => {
                element.position = index + 1;                
            });
            SetWagons(copyWagons);
            // console.log(copyWagons);

            // --- Update database with the changed wagon positions ---
            copyWagons.forEach((element) => {
                const elementID = element.id;
                const elementPosition = element.position;
                const idRef = doc(db, 'wagons', elementID); // --- Find the document in the 'wagons'-collection, whose id corresponds to the copyWagons id, which we saved in a state.
                // console.log(elementID, elementPosition);
                batch.update(idRef, {"position": elementPosition}); // --- Update the position value, so that it corresponds to the value we saved to state.
            });
            await batch.commit(); // --- Commit all the changes saved in the batch. Batching changes saves calls to the server, and you can batch up to 500 changes.
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