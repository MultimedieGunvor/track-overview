import React, { useState } from "react";
import Modal from "./Modal";

export default function MakeWagons ({wagons, track}) {
    console.log(wagons, track)

    let filteredTrack = wagons.filter((wagon) => wagon.track === track);
    console.log(filteredTrack);

    let output = Array(20).fill(undefined);
    filteredTrack.forEach((element) => {
        output[element.position-1] = element;
        //console.log(element)
    });
    console.log(output);

    const [Hover, setHover] = useState(null);

    return (
        <div className="track">
            <p className="track-name">{track.toUpperCase()}</p>
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
