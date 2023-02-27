import React, { useState, useRef } from "react";
import { doc, writeBatch } from "firebase/firestore";
import { db } from "../firebaseConfig";
import DeleteWagon from "./DeleteWagon";

const MakeWagons = ({ wagons, track }) => {
  const [ Track, setTrack] = useState([]);
  
  let filteredTrack = wagons.filter((wagon) => wagon.track === track);
  console.log(filteredTrack);


  // --- Right now it creates four arrays - one per wagon. How to fix it?
  // let output = Array(20);
  // let fullTrack = filteredTrack.map((element) => {
  //   const elementPos = element.position;
  //   const elementId = element.id;
  //   console.log(elementId, elementPos);

  //   for (let position = 0; position < 19; position++) {
  //     if (element.position === position) {
  //       output[position] = element;
  //       console.log("It's a match");
  //     } else {
  //       console.log("No such position");
  //     }
  //   }
  //   return output;
    
  // });
  let output = Array(20);
  let fullTrack = filteredTrack.map((element) => {
    const elementPos = element.position;
    const elementId = element.id;
    console.log(elementId, elementPos);

    for (let position = 0; position < 19; position++) {
      if (element.position === position) {
        output[position] = element;
        console.log("It's a match");
      } else {
        console.log("No such position");
      }
    }
    return output;
    
  });

console.log(fullTrack[0]);

  const dragItem = useRef();
  const dragOverItem = useRef();
  // const dragTrack = useRef();
  // const dragOverTrack = useRef();

  // --- Handling info-modal for wagons ---
    
  const [hoveredInfo, setHoveredInfo] = useState(-1);

  const showInfoHandler = (i) => {
      setHoveredInfo(i);
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

  // --- Insert dragged item and rearrange the list of items.  ---  
  const batch = writeBatch( db );
  const drop = async (e) => {
    if (window.confirm(`Shunt wagon ${dragItem.current} to ${dragOverItem.current}`)) {

        const copyWagons = [...fullTrack];
        const dragItemContent = copyWagons[dragItem.current];
        copyWagons.splice(dragItem.current, 1);
        copyWagons.splice(dragOverItem.current, 0, dragItemContent); // --- To delete the next item in the array, change 0 to 1. We need to do this when shunting wagons to empty slots. We also need to make sure you can ONLY shunt to empty slots. Use a confirm dialog.
        dragItem.current = null;
        dragOverItem.current = null;
        // dragTrack.current = null;
        // dragOverTrack = null;
        copyWagons.forEach((element, index) => {
            element.position = index + 1;                
        });
        setTrack(copyWagons); // --- Maybe this isn't necessary here?
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
    <div className="track">
      <p>{track}</p>
      {fullTrack[0].length !== 0 ? (
        fullTrack[0].map( 
          ({ id, wagonId, shortId, litra, color, destination, damage, comment, track, position }, i) => ( // --- Insert condition. If !id, then div className="empty", else render like normal. Or maybe it is easier to render if id exists else div classname empty. Maybe undefined?
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
          )
        )
      ) : (
        <p>No wagons in this track</p>
      )}
    </div>
  )
};

export default MakeWagons;
