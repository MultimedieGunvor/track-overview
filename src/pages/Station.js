
import AddWagons from "../components/AddWagons";
import ShowWagons from "../components/ShowWagons";
import SelectStation from "../components/SelectStation";
import OtherStation from "../components/ShowOtherStation";
import { useState } from "react";


export default function Station() {

    const [station, setStation] = useState();

    // --- Listen for changes to the sesssion storage, to update station choice when a new one is selected. ---
    window.addEventListener('storage', () => {
        const currentStation = sessionStorage.getItem('station');
        console.log(currentStation);
        setStation(currentStation);
    })
        
    return (
            <>
            <SelectStation />
            <AddWagons />
            {station === 'Alnabru' || !station ? (
                <ShowWagons />
            ) : (
                <OtherStation />
            )}
            </> 

    )
}