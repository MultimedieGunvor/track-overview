import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import React, { useState } from "react";

export default function AddWagons () {
    const [formData, setFormData] = useState({
        wagonId: "",
        shortId: "",
        litra: "",
        color: "",
        destination: "",
        damage: "",
        comment: "",
        track: "",
        position: "", // --- Maybe if we remove the quotation marks, it won't change the numbers to a string??
        createdAt: Timestamp.now().toDate(),
    });
    
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        console.log(formData);
    };


    const handlePublish = () => {
        if (!formData.wagonId || !formData.litra || !formData.color || !formData.track || !formData.position) {
            alert("Please assign id, litra, color, track and position to wagon");
            return;
        }

        // Generate short id from wagon id
        const firstShort = formData.wagonId.slice(-5, -1);
        const lastShort = formData.wagonId.slice(-1);


        const wagonRef = collection(db, "wagons");
        addDoc(wagonRef, {
            wagonId: formData.wagonId, 
            shortId: firstShort + "-" + lastShort,
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
            // Clear form after submitting
            setFormData({
                wagonId: "",
                shortId: "",
                litra: "",
                color: "",
                destination: "",
                damage: "",
                comment: "",
                track: "",
                position: "", // --- Maybe remove the qoutation marks??
                createdAt: Timestamp.now().toDate(),
            });

        })
        .catch((err) => {
            console.error("Error. Wagon not added.", err);
        })
    };

    return (
        <>

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

                <div className="litra-input">
                    <legend>Litra</legend>
                    <select
                    name="litra"
                    className="litra-select"
                    value={formData.litra}
                    onChange={(e) => handleChange(e)}
                    >
                        <option placeholder="Placeholder"></option>
                        <option value="Sdggmrss">Sdggmrss</option>
                        <option value="Sggmrs">Sggmrs</option>
                        <option value="Rs">Rs</option>
                        <option value="Sdggmrs-L">Sdggmrs-L</option>
                        <option value="Laaprs">Laaprs</option>
                        <option value="Sdggmrs-T">Sdggmrs-T</option>
                        <option value="Sdggmrs-T">Sdggmrs</option>
                    </select>
                </div>

                <div className="color-input">
                    <legend>Color</legend>
                    <select
                    name="color"
                    className="color-select"
                    value={formData.color}
                    onChange={(e) => handleChange(e)}
                    >
                        <option placeholder="Placeholder"></option>
                        <option value="Lblue">Light blue</option>
                        <option value="Blue">Blue</option>
                        <option value="Lgreen">Light green</option>
                        <option value="Green">Green</option>
                        <option value="Lolive">Light olive</option>
                        <option value="Olive">Olive</option>
                    </select>
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
                        <option placeholder="Placeholder"></option>
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
                    <legend>Track</legend>
                    <select
                    name="track"
                    className="track-select"
                    value={formData.track}
                    onChange={(e) => handleChange(e)}
                    >
                        <option placeholder="Placeholder"></option>
                        <option value="c31">C31</option>
                        <option value="c16">C16</option>
                        <option value="c14">C14</option>
                        <option value="c13">C13</option>
                        <option value="c8">C8</option>
                        <option value="c7">C7</option>
                        <option value="r47">R47</option>
                        <option value="r46">R46</option>
                        <option value="r45">R45</option>
                        <option value="r44">R44</option>
                        <option value="r43">R43</option>
                        <option value="r42">R42</option>
                        <option value="r41">R41</option>
                        <option value="r38">R38</option>
                        <option value="r37">R37</option>
                        <option value="r36">R36</option>
                        <option value="r18">R18</option>
                        <option value="r17">R17</option>
                        <option value="r16">R16</option>
                        <option value="r15">R15</option>
                        <option value="r14">R14</option>
                        <option value="r13">R13</option>
                        <option value="r12">R12</option>
                        <option value="r11">R11</option>
                        <option value="r54">R54</option>
                        <option value="industrispor">Industrispor</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="position-input">
                    <legend>Position</legend>
                    <select
                    name="position"
                    className="position-select"
                    value={formData.position}
                    onChange={(e) => handleChange(e)}
                    >
                        <option placeholder="Placeholder"></option>
                        <option value="01">1</option>
                        <option value="02">2</option>
                        <option value="03">3</option>
                        <option value="04">4</option>
                        <option value="05">5</option>
                        <option value="06">6</option>
                        <option value="07">7</option>
                        <option value="08">8</option>
                        <option value="09">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                    </select>
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