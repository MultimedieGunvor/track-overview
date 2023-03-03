export default function MakeWagons ({wagons, track}) {
    console.log(wagons, track)

    let filteredTrack = wagons.filter((wagon) => wagon.track === track);
    console.log(filteredTrack);

    let output = Array(20);
    filteredTrack.forEach((element) => {
        output[element.position-1] = element;
        //console.log(element)
    });
    console.log(output);

    const getTrackContent = (output) => {
        let content =[];
        
        for (let i=0; i<output.length; i++) {
            if (!(i in output)) {
            content.push(
                <div className="wagons empty"></div>
            );
            } else {
            content.push(
                <div className="wagons" 
                key={output.i.id}
                draggable>
                    <p className={`${output.i.color} ${output.i.color}-${output.i.damage}`}>{output.i.shortId}</p>
                </div>
            );}
        }
        return content;
    };
    console.log(getTrackContent);

    return (
        <div className="track">
            <p>{track.toUpperCase()}</p>
            <div>{getTrackContent}</div>
        </div>
    )
};
