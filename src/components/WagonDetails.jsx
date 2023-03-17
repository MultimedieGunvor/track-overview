import { useLocation } from "react-router-dom";
// import { useState } from "react";
import GetAlias from "./GetAlias";

export default function WagonDetails({place}) {
    const location = useLocation();
    // console.log("location: " + location);
    const {state} = location;
    // console.log("state: " + state);
    
        
    const track = state === null ? "" : state.track;
    const alias = state === null ? "" : GetAlias(state);
    const position = state === null ? "" : state.position;
    const destination = state === null ? "" : state.destination;
    const id = state === null ? "" : state.id;
    const comments = state === null ? "" : state.comments;
    const litra = state === null ? "" : state.litra;
    const damage = state === null ? "" : state.damage;
    const constType = state === null ? "" : "Lorem ipsum";
    const wgnHolder = state === null ? "" : "2424";
    const curStat = state === null ? "" : "Arrived";
    const tara = state === null ? "" : "35.0";
    const maxLoad = state === null ? "" : "100.0";
    const length = state === null ? "" : "34.2";
    const axles = state === null ? "" : "6";
    const speed = state === null ? "" : "120";
    const load = state === null ? "" : "24.0";
    const interOp = state === null ? "" : "31";
    const iOperabitlity = state === null ? "" : "Freight";
    const crit = state === null ? "" : "74";
    const seqNo = state === null ? "" : "33";
    const ctl = state === null ? "" : "2";
    console.log(track, position, destination, id, comments, litra, damage, alias);

    const wagonClass = state === null ? "" : state.id.slice(4, 8);

    // --- Write a function to determine the wagon's alias based on its litra

    return (
        <div>
            <h2>Wagon details</h2>
            <div className="wgn-info-box">
                <div className="detail-item">
                    <h3>Wagon no</h3>
                    <p>{id}</p>
                </div>
                <div className="detail-item">
                    <h3>Wagon litra</h3>
                    <p>{litra}</p>
                </div>
                <div className="detail-item">
                    <h3>Construction type 1</h3>
                    <p>{constType}</p>
                </div>
                <div className="detail-item">
                    <h3>Current status</h3>
                    <p>{curStat}</p>
                </div>
                <div className="detail-item">
                    <h3>Wagon holder</h3>
                    <p>{wgnHolder}</p>
                </div>
                <div className="detail-item">
                    <h3>Wagon alias</h3>
                    <p>{alias}</p>
                </div>
                <div className="detail-item">
                    <h3>Construction type 2</h3>
                    <p>{constType}</p>
                </div>
                <div className="detail-item">
                    <h3>Current place</h3>
                    <p>{place} {track}</p>
                </div>
                <div className="detail-item">
                    <h3>Wagon owner</h3>
                    <p>{wgnHolder}</p>
                </div>
                <div className="detail-item">
                    <h3>Tara (T)</h3>
                    <p>{tara}</p>
                </div>
                <div className="detail-item">
                    <h3>Max load (T)</h3>
                    <p>{maxLoad}</p>
                </div>
                <div className="detail-item">
                    <h3>Length (m)</h3>
                    <p>{length}</p>
                </div>
                <div className="detail-item">
                    <h3>Axles</h3>
                    <p>{axles}</p>
                </div>
                <div className="detail-item">
                    <h3>Speed</h3>
                    <p>{speed}</p>
                </div>
                <div className="detail-item">
                    <h3>Current destination</h3>
                    <p>{destination}</p>
                </div>
                <div className="detail-item">
                    <h3>Load (T)</h3>
                    <p>{load}</p>
                </div>
                <div className="detail-item">
                    <h3>Interop</h3>
                    <p>{interOp}</p>
                </div>
                <div className="detail-item">
                    <h3>Interoperability</h3>
                    <p>{iOperabitlity}</p>
                </div>
                <div className="detail-item">
                    <h3>Crit</h3>
                    <p>{crit}</p>
                </div>
                <div className="detail-item">
                    <h3>Rail country</h3>
                    <p>{constType}</p>
                </div>
                <div className="detail-item">
                    <h3>Wagon class</h3>
                    <p>{wagonClass}</p>
                </div>
                <div className="detail-item">
                    <h3>Class litra</h3>
                    <p>{litra}</p>
                </div>
                <div className="detail-item">
                    <h3>Seq no</h3>
                    <p>{seqNo}</p>
                </div>
                <div className="detail-item">
                    <h3>Ctl</h3>
                    <p>{ctl}</p>
                </div>
            </div>
            <div className="wgn-data">
                <div className="filters">
                    <button>Metrics</button>
                    <button>Brake data</button>
                    <button>Loading data</button>
                    <button>Maintenance</button>
                    <button>Damages</button>
                    <button>Technical</button>
                </div>
                <div className="wgn-data-box">
                    {/* Maybe do this as a React fragment */}
                </div>
            </div>
        </div>
    )
}