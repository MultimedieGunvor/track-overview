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
        // console.log(e.target.innerHTML);
    };
 
    /* --- Which element is the dragged element floating on? --- */ 
    const dragEnter = (e, position) => {
        dragOverItem.current = position;
        // console.log(e.target.innerHTML);
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
                const idRef = doc(db, 'wagons', elementID); // --- Finds the document in the 'wagons'-collection, whose id corresponds to the copyWagons id, which we saved in a state. We should probably create a elementTrack const to update the track, if we move a wagon from one track to another.
                // console.log(elementID, elementPosition);
                batch.update(idRef, {"position": elementPosition}); // --- Updates the position value, so that it corresponds to the value we saved to state.
            });
            await batch.commit(); // --- Commits all the changes saved in the batch. Batching changes saves calls to the server, and you can batch up to 500 changes.
        }
    };

    

    return (
        
        <>            
            <div className="other-wagons">
                
                <div className="track">
                    <p><br/>C14</p>
                    {Wagons.length !== 0 ? (
                        Wagons.map(
                            ({ id, wagonId, shortId, litra, color, destination, damage, comment, track, position }, i) => (
                                <div>
                                    {track === 'c14' ? (
                                    <div className="wagons" 
                                    key={id} 
                                    onMouseEnter={() => showInfoHandler(i)} 
                                    onMouseLeave={hideInfoHandler}
                                    onDragStart={(e) => dragStart(e, i)} 
                                    onDragEnter={(e) => dragEnter(e, i)} 
                                    onDragEnd={drop}
                                    draggable> 
                                        <p>{position}</p>
                                        <p className={`${color} ${color}-${damage}`}>{shortId}</p>
                                        <div className="wagon-info" style={{display: hoveredInfo === i ? 'block' : 'none'}} >
                                            <p style={{fontSize: '12px'}}>{track}</p>
                                            <p style={{fontSize: '12px'}}>{position}</p>
                                            <p style={{fontSize: '12px'}}>{destination}</p>
                                            <p style={{fontSize: '12px'}}>{wagonId}</p>
                                            <p style={{fontSize: '12px'}}>{comment}</p>
                                            <p style={{fontSize: '12px'}}>{litra}</p>
                                            <p style={{fontSize: '12px'}}>{damage}</p>
                                            <DeleteWagon id={id}/>
                                        </div>
                                    </div>
                                    ) : (
                                        <p></p>
                                    )}
                                </div>
                                
                                
                            )
                        )
                    ) : (
                        <p>No wagons in this track</p>
                    )}
                </div>
                <div className="track">
                    <p>R43</p>
                    {Wagons.length !== 0 ? (
                        Wagons.map(
                            ({ id, wagonId, shortId, litra, color, destination, damage, comment, track, position }, i) => (
                                <div>
                                    {track === 'r43' ? (
                                    <div className="wagons" 
                                    key={id} 
                                    onMouseEnter={() => showInfoHandler(i)} 
                                    onMouseLeave={hideInfoHandler}
                                    onDragStart={(e) => dragStart(e, i)} 
                                    onDragEnter={(e) => dragEnter(e, i)} 
                                    onDragEnd={drop}
                                    draggable> 
                                        <p className={`${color} ${color}-${damage}`}>{shortId}</p>
                                        <div className="wagon-info" style={{display: hoveredInfo === i ? 'block' : 'none'}} >
                                            <p style={{fontSize: '12px'}}>{track}</p>
                                            <p style={{fontSize: '12px'}}>{position}</p>
                                            <p style={{fontSize: '12px'}}>{destination}</p>
                                            <p style={{fontSize: '12px'}}>{wagonId}</p>
                                            <p style={{fontSize: '12px'}}>{comment}</p>
                                            <p style={{fontSize: '12px'}}>{litra}</p>
                                            <p style={{fontSize: '12px'}}>{damage}</p>
                                            <DeleteWagon id={id}/>
                                        </div>
                                    </div>
                                    ) : (
                                        <p></p>
                                    )}
                                </div>
                                
                            )
                        )
                    ) : (
                        <p>No wagons in this track</p>
                    )}
                </div>

            </div>
        </>
    );
};