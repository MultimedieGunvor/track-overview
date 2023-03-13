import React, { useState } from "react";
import Modal from "./Modal";
import { dragStart, dragEnter, drop } from "./DragDrop";


export default function MakeWagons ({wagons, track}) {
    // console.log(wagons, track)

    let filteredTrack = wagons.filter((wagon) => wagon.track === track);
    // console.log(filteredTrack);

    let output = Array(20).fill(undefined);
    filteredTrack.forEach((element) => {
        output[element.position-1] = element;
        //console.log(element)
    });
    // console.log(output);

    const [Hover, setHover] = useState(null); 

    return (
        <div className="track">
            <p className="track-name">{track.toUpperCase()}</p>
            {output.map((wagon, i) => wagon === undefined ? (
                <div className="wagons empty" key={`${track}+${i}`} track={track}></div>
            ) : (
                <div className="wagons"
                key={wagon.id}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(false)}
                onDragStart={(e) => 
                    {setHover(false)
                    dragStart(e, i)}} // --- dragStart(e, i, track), maybe?
                onDragEnter={(e) => dragEnter(e, i, track)} // --- dragStart(e, i, track), maybe?
                onDragEnd={drop} // --- {drop(wagons)}
                draggable>
                    <p className={`${wagon.color} ${wagon.color}-${wagon.damage}`}
                    >{wagon.shortId}</p>
                    {Hover === i ? (<Modal props={wagon}/>) : ("")} 
                </div>
            ))}
        </div>
    )
};
