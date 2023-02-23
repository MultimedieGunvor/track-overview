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

const MakeWagons = ({wagons, track}) => { 
  

  let filteredTrack = wagons.filter((wagon) => wagon.track === track);
  console.log(filteredTrack);

  filteredTrack.forEach(element => {
    const elementPos = element.position;
    const elementId = element.id;
    console.log(elementId, elementPos);

    // for (let position = 0; position < 19; position++) {
    //   if (elementPos !== allPositions.some({position})) {
    //     console.log("No such position");
    //   } else {
    //     console.log("It's a match");
    //   }
    // }
    
    
  });  

  const allPositions = [
    { id: 1, position: 1}, { id: 2, position: 2}, { id: 3, position: 3}, { id: 4, position: 4}, { id: 5, position: 5}, { id: 6, position: 6}, { id: 7, position: 7}, { id: 8, position: 8}, { id: 9, position: 9}, { id: 10, position: 10},
    { id: 11, position: 11}, { id: 12, position: 12}, { id: 13, position: 13}, { id: 14, position: 14}, { id: 15, position: 15}, { id: 16, position: 16}, { id: 17, position: 17}, { id: 18, position: 18}, { id: 19, position: 19}, { id: 20, position: 20},
  ];
  
};

export default MakeWagons;