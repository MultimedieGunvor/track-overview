
import AddWagons from "../components/AddWagons";
import ShowWagons from "../components/ShowWagons";
import SelectStation from "../components/SelectStation";
import OtherStation from "../components/OtherStation";
import { useState } from "react";


export default function Station() {

    const [station, setStation] = useState('Alnabru'); 

    // --- Listen for changes to the session storage, to update station choice when a new one is selected. ---
    window.addEventListener('storage', () => {
        const currentStation = sessionStorage.getItem('station');
        console.log(currentStation);
        setStation(currentStation);
    })
        
    return (
            <>
            <SelectStation />
            <AddWagons />
            {station === 'Alnabru' ? (
                <ShowWagons />
            ) : (
                <OtherStation />
            )}
            </> 

    )
}