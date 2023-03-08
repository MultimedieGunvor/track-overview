import React, { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
// import DeleteWagon from "./DeleteWagon";
import MakeWagons from "./MakeWagons";
import Modal from "./Modal"; 

// --- Gunvor is trying out a drag 'n drop solution here ---

export default function OtherStation () {
    // const dragItem = useRef();
    // const dragOverItem = useRef();
    // // const dragTrack = useRef();
    // // const dragOverTrack = useRef();

    // const [hoverRef, isHovered] = useHover();
    const [Hover, setHover] = useState(null);

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
    
    // const [hoveredInfo, setHoveredInfo] = useState(-1);

    // const showInfoHandler = (i) => {
    //     setHoveredInfo(i);
    //     // console.log(i);
    // }
    // const hideInfoHandler = () => {
    //     setHoveredInfo(-1);
    // }
 

    // // --- Locate the items to be dragged --- 
    // const dragStart = (e, position) => { // (e, position, track)
    //     dragItem.current = position;
    //     //dragTrack.current = track;
    //     hideInfoHandler();
    //     // console.log(e.target.innerHTML);
    // };
 
    // // --- Which element is the dragged element floating on? --- 
    // const dragEnter = (e, position) => { //(e, position, track)
    //     dragOverItem.current = position;
    //     //dragOverTrack.current = track; 
    //     // console.log(e.target.innerHTML);
    // };
 
    // // --- Insert dragged item and rearrange the list of items.  ---  
    // const batch = writeBatch( db );
    // const drop = async (e) => {
    //     if (window.confirm(`Shunt wagon ${dragItem.current} to ${dragOverItem.current}`)) {

    //         const copyWagons = [...Wagons];
    //         const dragItemContent = copyWagons[dragItem.current];
    //         copyWagons.splice(dragItem.current, 1);
    //         copyWagons.splice(dragOverItem.current, 0, dragItemContent);
    //         dragItem.current = null;
    //         dragOverItem.current = null;
    //         // dragTrack.current = null;
    //         // dragOverTrack = null;
    //         copyWagons.forEach((element, index) => {
    //             element.position = index + 1;                
    //         });
    //         SetWagons(copyWagons);
    //         // console.log(copyWagons);

    //         // --- Update database with the changed wagon positions ---
    //         copyWagons.forEach((element) => {
    //             const elementID = element.id;
    //             const elementPosition = element.position;
    //             //const elementTrack = element.track;
    //             const idRef = doc(db, 'wagons', elementID); // --- Finds the document in the 'wagons'-collection, whose id corresponds to the copyWagons id, which we saved in a state. 
    //             batch.update(idRef, {"position": elementPosition}); // --- Updates the position value, so that it corresponds to the value we saved to state.
    //             //batch.update(idRef, {"track": elementTrack});
    //         });
    //         await batch.commit(); // --- Commits all the changes saved in the batch. Batching changes saves calls to the server, and you can batch up to 500 changes.
    //     }
    // };

    

    return (
                    
        <div className="other-wagons">
            {/* <MakeWagons wagons={Wagons} track="r43"/> */}
            <div className="track">
                <p>C14</p>
                {Wagons.length !== 0 ? (
                    Wagons.map( 
                        (wagon, i) => wagon.track === 'c14' ? (
                            <div className="wagons" 
                            key={wagon.id} 
                            onMouseEnter ={() => 
                                {setHover(i);
                                console.log(Hover)}}
                            onMouseLeave ={() => setHover(false)}
                            // ref={hoverRef}
                            // onMouseEnter={() => ShowInfoHandler(i)} 
                            // onMouseLeave={HideInfoHandler}
                            // onDragStart={(e) => DragStart(e, i)} // --- dragStart(e, i, track), maybe?
                            // onDragEnter={(e) => DragEnter(e, i)} // --- dragStart(e, i, track), maybe?
                            // onDragEnd={DragDrop(Wagons)}
                            draggable> 
                                <p className={`${wagon.color} ${wagon.color}-${wagon.damage}`}>{wagon.shortId}</p>
                                {Hover === i ? (<Modal props={wagon}/>) : ("") }
                                
                            </div>
                        ) : (
                            // console.log("Other track")
                            ""

                        )                       
                    )
                ) : (
                    <p>No wagons in this track</p>
                )}
            </div>
        </div>
    );
};