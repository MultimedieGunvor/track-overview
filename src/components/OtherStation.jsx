import React, { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import MakeWagons from "./MakeWagons";

// --- Gunvor is trying out a drag 'n drop solution here ---

export default function OtherStation () {
    // const dragItem = useRef();
    // const dragOverItem = useRef();
    // // const dragTrack = useRef();
    // // const dragOverTrack = useRef();


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

    // // --- Locate the items to be dragged --- 
    // const dragStart = (e, position) => { // (e, position, track)
    //     dragItem.current = position;
    //     //dragTrack.current = track;
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
            <div className="position-row">
                <p>Position</p>
                <p>01</p>
                <p>02</p>
                <p>03</p>
                <p>04</p>
                <p>05</p>
                <p>06</p>
                <p>07</p>
                <p>08</p>
                <p>09</p>
                <p>10</p>
                <p>11</p>
                <p>12</p>
                <p>13</p>
                <p>14</p>
                <p>15</p>
                <p>16</p>
                <p>17</p>
                <p>18</p>
                <p>19</p>
                <p>20</p>
            </div>
            <div className="track-column">Track</div>
            <MakeWagons wagons={Wagons} track="c14" />
            <MakeWagons wagons={Wagons} track="r43" />
            <MakeWagons wagons={Wagons} track="c31" />
        </div>
    );
};