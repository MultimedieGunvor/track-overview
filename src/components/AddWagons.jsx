import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import React, { useState } from "react";

export default function AddWagons () {
    const [formData, setFormData] = useState({
        wagonId: "",
        shortId: "", // Generate from last five digits of wagonId. Use indexOf??
        litra: "",
        color: "",
        destination: "",
        damage: "",
        comment: "",
        track: "",
        position:"",
        createdAt: Timestamp.now().toDate(),
    });
    
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        console.log(formData);
    };

    const handlePublish = () => {
        if (!formData.wagonId || !formData.shortId || !formData.litra || !formData.color || !formData.track || !formData.position) {
            alert("Please assign id, short id, litra, color, track and position to wagon");
            return;
        }

        const wagonRef = collection(db, "wagons");
        addDoc(wagonRef, {
            wagonId: formData.wagonId,
            shortId: formData.shortId, // Generate from last five digits of wagonId. Use indexOf??
            litra: formData.litra,
            color: formData.color,
            destination: formData.destination,
            damage: formData.damage,
            comment: formData.comment,
            track: formData.track,
            position: formData.position,
            createdAt: Timestamp.now().toDate(),
        })
        .then(() => {
            console.log("Wagon added successfully");
        })
        .catch((err) => {
            console.error("Error. Wagon not added.", err);
        })
    };

    return (
        <>
            {/* <button onClick={AddWagons}>Add wagons</button> */}

            <div className="wagon-form">
                <h2>Add a wagon</h2>
                <div className="id-input">
                    <input
                    type="text"
                    name="wagonId"
                    className="inputfield"
                    value={formData.wagonId}
                    placeholder="Wagon ID"
                    onChange={(e) => handleChange(e)}
                    />
                </div>

                <div className="short-id-input">
                    <input
                    type="text"
                    name="shortId"
                    className="inputfield"
                    value={formData.shortId}
                    placeholder="Short ID"
                    onChange={(e) => handleChange(e)}
                    />
                </div>

                <div className="litra-input">
                    <input
                    type="text"
                    name="litra"
                    className="inputfield"
                    value={formData.litra}
                    placeholder="Litra"
                    onChange={(e) => handleChange(e)}
                    />
                </div>

                <div className="color-input"> {/*Written as a hex code, which can then be inserted into an svg file.*/}
                    <input
                    type="text"
                    name="color"
                    className="inputfield"
                    value={formData.color}
                    placeholder="Color hex code"
                    onChange={(e) => handleChange(e)}
                    />
                </div>

                <div className="destination-input">
                    <legend>Destination</legend>
                    <select
                    name="destination"
                    className="destination-select"
                    value={formData.destination}
                    placeholder="Select destination"
                    onChange={(e) => handleChange(e)}
                    >
                        <option value="Alnabru">Alnabru</option>
                        <option value="Trondheim">Trondheim</option>
                        <option value="Bergen">Bergen</option>
                        <option value="Orstad">Orstad</option>
                        <option value="Heimdal">Heimdal</option>
                        <option value="Sundland">Sundland</option>
                        <option value="Grorud">Grorud</option>
                        <option value="Narvik">Narvik</option>
                        <option value="Kirunavaara">Kirunavaara</option>
                        <option value="Loenga">Loenga</option>
                        <option value="Mjøndalen">Mjøndalen</option>
                        <option value="Hønefoss">Hønefoss</option>
                        <option value="Lillestrøm">Lillestrøm</option>
                        <option value="Hamar">Hamar</option>
                        <option value="Hokksund">Hokksund</option>
                        <option value="Hen">Hen</option>
                        <option value="Älmhult">Älmhult</option>
                        <option value="Hallsberg">Hallsberg</option>
                        <option value="Nordagutu">Nordagutu</option>
                        <option value="Støren">Støren</option>
                        <option value="Daler">Daler</option>
                    </select>
                </div>

                <div className="damage-input">
                    <legend>Damage</legend>
                    <select
                    name="damage"
                    className="damage-select"
                    value={formData.damage}
                    placeholder="Damage"
                    onChange={(e) => handleChange(e)}
                    >
                        <option value="none">None</option>
                        <option value="mild">Mild</option>
                        <option value="medium">Medium</option>
                        <option value="critical">Critical</option>
                    </select>
                </div>

                <div className="comment-input">
                    <input
                    type="text"
                    name="comment"
                    className="inputfield"
                    value={formData.comment}
                    placeholder="Comments"
                    onChange={(e) => handleChange(e)}
                    />
                </div>

                <div className="track-input">
                    <input
                    type="text"
                    name="track"
                    className="inputfield"
                    value={formData.track}
                    placeholder="Track"
                    onChange={(e) => handleChange(e)}
                    />
                </div>

                <div className="position-input">
                    <input
                    type="number"
                    name="position"
                    className="inputfield"
                    value={formData.position}
                    placeholder="Position"
                    onChange={(e) => handleChange(e)}
                    />
                </div>

                <button 
                className="btn submit" 
                onClick={() => {
                    handlePublish();
                }}
                >Submit</button>
            </div>
        </>
    );
};