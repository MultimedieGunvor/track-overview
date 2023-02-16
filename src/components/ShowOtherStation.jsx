import React, { useState, useRef, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import DeleteWagon from "./DeleteWagon";

// --- Gunvor is trying out a drag 'n drop solution here ---

export default function OtherStation () {
    const dragItem = useRef();
    const dragOverItem = useRef();
    // const [list, setList] = useState(['Item 1','Item 2','Item 3','Item 4','Item 5','Item 6']); /* --- Items to be dragged --- */

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

    async function handleShunt(wagons) {
        const collection = await db
        .collection("wagons")
        .get()
        collection.forEach(doc => {
            doc.ref.update({position: wagons.position})
        });
        console.log("Wagon positions changed");
    };
 
  /* --- Insert dragged item and rearrange the list of items. Here we would probably need to add a function to reassign the item's track/position in the database. Remember the useEffect. --- */  
    const drop = (e) => {
        if (window.confirm(`Shunt wagon ${dragItem.current} to ${dragOverItem.current}`)) {
            // const copyListItems = [...list];
            // const dragItemContent = copyListItems[dragItem.current];            
            // copyListItems.splice(dragItem.current, 1);
            // copyListItems.splice(dragOverItem.current, 0, dragItemContent);
            // setList(copyListItems);

            const copyWagons = [...Wagons];
            const dragItemContent = copyWagons[dragItem.current];
            copyWagons.splice(dragItem.current, 1);
            copyWagons.splice(dragOverItem.current, 0, dragItemContent);
            dragItem.current = null;
            dragOverItem.current = null;
            SetWagons(copyWagons); // updateDoc (see AddWagon. All the wagons' positions need to be updated!)
            handleShunt(copyWagons);
            console.log("Shunt completed")
            // const wagonRef = collection(db, "wagons");
            // updateDoc(wagonRef, {copyWagons});
        }
    };

    

    // const handleShunt = async () => {
    //     const shuntRef = doc(db, "wagons", id);
    //     await updateDoc(shuntRef, {position: "02" });
    //     console.log("Wagon shunted successfully")

    // };

    return (
        
        <>            
            {/* {
            list&&
            list.map((item, index) => (
            <div style={{backgroundColor:'lightblue', margin:'20px 25%', textAlign:'center', fontSize:'40px'}}
                onDragStart={(e) => dragStart(e, index)}
                onDragEnter={(e) => dragEnter(e, index)}
                onDragEnd={drop}
                key={index}
                draggable>
                {item}
            </div>
            ))} */}

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
                            onDragStart={(e) => dragStart(e, i)} // Maybe change it to onDragStart={(e) => dragStart(e, id)}?? Because the key is id?
                            onDragEnter={(e) => dragEnter(e, i)} // Maybe change it to onDragEnter={(e) => dragEnter(e, id)}??
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