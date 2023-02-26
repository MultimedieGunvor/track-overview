// export default function doTrack(data) {

//   let curTrackData = data.filter((wagon) => wagon.track == track);
//   let maxPos = curTrackData.length;

//   let htmlDiv;
//   htmlDiv += <div className="row">;
//   for (let position = 0; i < maxPos; i++) {
//     let curWagons = curTrackData.filter((wagon) => wagon.pos == position);
//     htmlDiv += <div className="cell">{curWagons.map(wagon => <div>{wagon.id}</div>)}</div>;
//   }
//   htmlDiv += </div>

// }

const MakeWagons = ({ wagons, track }) => {
  let filteredTrack = wagons.filter((wagon) => wagon.track === track);
  console.log(filteredTrack);

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

  console.log(fullTrack);
  return fullTrack;
};

export default MakeWagons;
