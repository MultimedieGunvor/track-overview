export default function doTrack(data) {
    let curTrackData = data.filter((wagon) => wagon.track == track);
    let maxPos = curTrackData.length;
  
    let htmlDiv;
    htmlDiv += <div class="row">;
    for (let position = 0; i < maxPos; i++) {
      let curWagons = curTrackData.filter((wagon) => wagon.pos == position);
      htmlDiv += <div class="cell">{curWagons.map(wagon => <div>{wagon.id}</div>)}</div>;
    }
    htmlDiv += </div>
  
  }