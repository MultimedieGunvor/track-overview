import WagonDetails from "../components/WagonDetails";
import { useState } from "react";

const ShowWagon = () => {

    const [Place, setPlace] = useState(); 
    window.addEventListener('storage', () => {
        const currentPlace = sessionStorage.getItem('station');
        console.log('Place is: ' + currentPlace);
        currentPlace === undefined ? (
            setPlace('Alnabru')
        ) : (
            setPlace(currentPlace)
        );
        window.removeEventListener('storage');
    })

    return (
        <>
            <h2>Show wagon</h2>
            {/* Noget med if !state, så vis addwagon?? */}
            <WagonDetails place={Place}/> 
        </>
    )
};
  
export default ShowWagon;