import { useEffect, useState } from "react";


export default function SelectStation () {
    const [value, setValue] = useState('Alnabru');

    const key = 'station';

    const handleChange = (e) => {
        setValue(e.target.value); 
        sessionStorage.setItem(key, e.target.value);
        console.log(sessionStorage);
        window.dispatchEvent(new Event("storage")); 
    };


    // useEffect(() => { // --- Er den her overhovedet nødvendig? Bliver den brugt?
    //     const timer = setTimeout(() => {
    //         sessionStorage.setItem(key, 'Alnabru');
    //         console.log(sessionStorage);
    //     }, 3);
    //     return () => clearTimeout(timer);
    // }, []);

    return (
        <div className="select">
            <legend>{value}</legend>
            <select value={value} onChange={handleChange}>
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
                <option value="Manage">Manage stations</option>
            </select>
        </div>
    );
};