import React, { useState } from "react";
import Modal from "./Modal";

export default function MakeWagons ({wagons, track}) {
    console.log(wagons, track)

    let filteredTrack = wagons.filter((wagon) => wagon.track === track);
    console.log(filteredTrack);

    let output = Array(20).fill(undefined); // --- let output = Array(20).fill(undefined); ?? Maybe??
    filteredTrack.forEach((element) => {
        output[element.position-1] = element;
        //console.log(element)
    });
    console.log(output);

    const [Hover, setHover] = useState(null);

    // const getTrackContent = (output) => {
    //     let content =[];
        
    //     for (let i=0; i<output.length; i++) {
    //         if (!(i in output)) {
    //         content.push(
    //             <div className="wagons empty"></div>
    //         );
    //         } else {
    //         content.push(
    //             <div className="wagons" 
    //             key={output.i.id}
    //             draggable>
    //                 <p className={`${output.i.color} ${output.i.color}-${output.i.damage}`}>{output.i.shortId}</p>
    //             </div>
    //         );}
    //     }
    //     return content;
    // };

    return (
        <div className="track">
            <p>{track.toUpperCase()}</p>
            {output.map((wagon, i) => wagon === undefined ? (
                <div className="wagons empty" key={`${track}+${i}`}></div>
            ) : (
                <div className="wagons"
                key={wagon.id}
                onMouseEnter={() => 
                    {setHover(i)
                    console.log(Hover)}}
                onMouseLeave={() => setHover(false)}
                draggable>
                    <p className={`${wagon.color} ${wagon.color}-${wagon.damage}`}>{wagon.shortId}</p>
                    {Hover === i ? (<Modal props={wagon}/>) : ("")}
                </div>
            ))}
        </div>
    )
};
