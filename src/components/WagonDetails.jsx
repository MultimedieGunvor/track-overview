import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function WagonDetails() {
    const location = useLocation();
    const {state} = location;
    const wagonClass = state.id.slice(4, 8);

    const [place, setPlace] = useState(); 
    window.addEventListener('storage', () => {
        const currentPlace = sessionStorage.getItem('station');
        console.log('Place is: ' + currentPlace);
        currentPlace === undefined ? (
            setPlace('Alnabru')
        ) : (
            setPlace(currentPlace)
        );
        // setPlace(currentPlace);
        window.removeEventListener('storage');
    })
    // --- Write a function to determine the wagon's alias based on its litra
    console.log(state.id);

    return (
        <div id="start">
            <h2>Wagon details</h2>
            <div className="wgn-info-box">
                <div className="detail-item">
                    <h3>Wagon no</h3>
                    <p>{state.id}</p>
                </div>
                <div className="detail-item">
                    <h3>Wagon litra</h3>
                    <p>{state.litra}</p>
                </div>
                <div className="detail-item">
                    <h3>Construction type 1</h3>
                    <p>Lorem ipsum</p>
                </div>
                <div className="detail-item">
                    <h3>Current status</h3>
                    <p>Arrived</p>
                </div>
                <div className="detail-item">
                    <h3>Wagon holder</h3>
                    <p>2424</p>
                </div>
                <div className="detail-item">
                    <h3>Wagon alias</h3>
                    <p>{state.litra}</p>
                </div>
                <div className="detail-item">
                    <h3>Construction type 2</h3>
                    <p>Lorem ipsum</p>
                </div>
                <div className="detail-item">
                    <h3>Current place</h3>
                    <p>{place} {state.track}</p>
                </div>
                <div className="detail-item">
                    <h3>Wagon owner</h3>
                    <p>2424</p>
                </div>
                <div className="detail-item">
                    <h3>Tara (T)</h3>
                    <p>35.0</p>
                </div>
                <div className="detail-item">
                    <h3>Max load (T)</h3>
                    <p>100.0</p>
                </div>
                <div className="detail-item">
                    <h3>Length (m)</h3>
                    <p>34.2</p>
                </div>
                <div className="detail-item">
                    <h3>Axles</h3>
                    <p>6</p>
                </div>
                <div className="detail-item">
                    <h3>Speed</h3>
                    <p>120</p>
                </div>
                <div className="detail-item">
                    <h3>Current destination</h3>
                    <p>{state.destination}</p>
                </div>
                <div className="detail-item">
                    <h3>Load (T)</h3>
                    <p>24.0</p>
                </div>
                <div className="detail-item">
                    <h3>Interop</h3>
                    <p>31</p>
                </div>
                <div className="detail-item">
                    <h3>Interoperability</h3>
                    <p>Freight</p>
                </div>
                <div className="detail-item">
                    <h3>Crit</h3>
                    <p>74</p>
                </div>
                <div className="detail-item">
                    <h3>Rail country</h3>
                    <p>Lorem ipsum</p>
                </div>
                <div className="detail-item">
                    <h3>Wagon class</h3>
                    <p>{wagonClass}</p>
                </div>
                <div className="detail-item">
                    <h3>Class litra</h3>
                    <p>{state.litra}</p>
                </div>
                <div className="detail-item">
                    <h3>Seq no</h3>
                    <p>33</p>
                </div>
                <div className="detail-item">
                    <h3>Ctl</h3>
                    <p>2</p>
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