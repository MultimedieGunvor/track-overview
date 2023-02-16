import React, { useState, useRef, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";

// --- Gunvor is trying out a drag 'n drop solution here ---

export default function OtherStation () {
    const dragItem = useRef();
    const dragOverItem = useRef();
    const [list, setList] = useState(['Item 1','Item 2','Item 3','Item 4','Item 5','Item 6']); /* --- Items to be dragged --- */

    const [Wagons, SetWagons] = useState([]);
    useEffect(() => {
        const wagonRef = collection(db, "wagons");
        const q = query(wagonRef, orderBy("position", "asc")); // Maybe change this to order by track?? Or position??
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
 
  /* --- Insert dragged item and rearrange the list of items. Here we would probably need to add a function to reassign the item's track/position in the database. Also, maybe run the function of drop upon fulfillment of a condition (condition= the user has to click "Yes" on a popup/toast that asks "Shunt wagon {wagon} to track {track}, position {position}?") --- */  
    const drop = (e) => {
        if (window.confirm(`Shunt wagon ${dragItem.current} to ${dragOverItem.current}`)) {
            const copyListItems = [...list];
            const dragItemContent = copyListItems[dragItem.current];
            copyListItems.splice(dragItem.current, 1);
            copyListItems.splice(dragOverItem.current, 0, dragItemContent);
            dragItem.current = null;
            dragOverItem.current = null;
            setList(copyListItems);
        }
    };

    return (
        
        <>
            
            {
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
            ))}
        </>
    );
};