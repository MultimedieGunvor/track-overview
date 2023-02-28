import React, { useState, useRef, useEffect } from "react";
import { collection, onSnapshot, orderBy, query, doc, writeBatch } from "firebase/firestore";
import { db } from "../firebaseConfig";
import DeleteWagon from "./DeleteWagon";
import MakeWagons from "./Wagons";

// --- Gunvor is trying out a drag 'n drop solution here ---

export default function OtherStation () {
    const dragItem = useRef();
    const dragOverItem = useRef();
    // const dragTrack = useRef();
    // const dragOverTrack = useRef();

    const [Wagons, SetWagons] = useState([]);
    useEffect(() => {
        const wagonRef = collection(db, "wagons");
        const q = query(wagonRef, orderBy("position", "asc")); // --- Maybe do a query to find the highest position value, and then use that number to set the amount of columns in the grid. Maybe like: const mp = query(wagonRef, orderBy("position", "desc")); SetMaxPosition(mp[0]); console.log(MaxPosition); and then use MaxPosition for inline styling of grid container, so that it changes with the amount of occupied positions.
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
        // console.log(i);
    }
    const hideInfoHandler = () => {
        setHoveredInfo(-1);
    }
 
    // --- Locate the items to be dragged --- 
    const dragStart = (e, position) => { // (e, position, track)
        dragItem.current = position;
        //dragTrack.current = track;
        hideInfoHandler();
        // console.log(e.target.innerHTML);
    };
 
    // --- Which element is the dragged element floating on? --- 
    const dragEnter = (e, position) => { //(e, position, track)
        dragOverItem.current = position;
        //dragOverTrack.current = track; 
        // console.log(e.target.innerHTML);
    };

    const batch = writeBatch( db );


 
  // --- Insert dragged item and rearrange the list of items.  ---  
    const drop = async (e) => {
        if (window.confirm(`Shunt wagon ${dragItem.current} to ${dragOverItem.current}`)) {

            const copyWagons = [...Wagons];
            const dragItemContent = copyWagons[dragItem.current];
            copyWagons.splice(dragItem.current, 1);
            copyWagons.splice(dragOverItem.current, 0, dragItemContent);
            dragItem.current = null;
            dragOverItem.current = null;
            // dragTrack.current = null;
            // dragOverTrack = null;
            copyWagons.forEach((element, index) => {
                element.position = index + 1;                
            });
            SetWagons(copyWagons);
            // console.log(copyWagons);

            // --- Update database with the changed wagon positions ---
            copyWagons.forEach((element) => {
                const elementID = element.id;
                const elementPosition = element.position;
                //const elementTrack = element.track;
                const idRef = doc(db, 'wagons', elementID); // --- Finds the document in the 'wagons'-collection, whose id corresponds to the copyWagons id, which we saved in a state. 
                batch.update(idRef, {"position": elementPosition}); // --- Updates the position value, so that it corresponds to the value we saved to state.
                //batch.update(idRef, {"track": elementTrack});
            });
            await batch.commit(); // --- Commits all the changes saved in the batch. Batching changes saves calls to the server, and you can batch up to 500 changes.
        }
    };

    

    return (
        
        <>            
            <div className="other-wagons">
                <MakeWagons wagons={Wagons} track="r43"/>
                
                <div className="track">
                    <p>C14</p>
                    {Wagons.length !== 0 ? (
                        Wagons.map( 
                            ({ id, wagonId, shortId, litra, color, destination, damage, comment, track, position }, i) => (
                                <div>
                                    {track === 'c14' ? (
                                    <div className="wagons" 
                                    key={id} 
                                    onMouseEnter={() => showInfoHandler(i)} 
                                    onMouseLeave={hideInfoHandler}
                                    onDragStart={(e) => dragStart(e, i)} // --- dragStart(e, i, track), maybe?
                                    onDragEnter={(e) => dragEnter(e, i)} // --- dragStart(e, i, track), maybe?
                                    onDragEnd={drop}
                                    draggable> 
                                        <p className={`${color} ${color}-${damage}`}>{shortId}</p>
                                        <div className="wagon-info" style={{display: hoveredInfo === i ? 'block' : 'none', fontSize: '12px'}} >
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
                                        <div className="wagon-info" style={{display: hoveredInfo === i ? 'block' : 'none', fontSize: '12px'}} >
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