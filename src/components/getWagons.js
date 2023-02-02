import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useState } from "react";

export default function GetWagons() {

    const [Wagons, SetWagons] = useState([]);
    // const [state, setState] = useState(Wagons); <--- Prøv dette efter frokost

    async function getAllWagons() {

        const querySnapshot = await getDocs(collection(db, "wagons"));
        querySnapshot.forEach((doc) => {
            const Wagons = [doc.id, doc.data()]; 
            SetWagons(Wagons);
            // console.log(doc.id, " => ", doc.data());
            console.log(Wagons);
            // setState(Wagons); <--------- Prøv dette efter frokost
        });
    }

    return (
        <>
            
            <button onClick={getAllWagons}>Show wagons</button>
            {/* {Wagons.length === 0 ? (
                <p>No wagons in database</p>
            ) : (
                state.map((item) => (
                    <div className="single-wagon" key={item.id}>
                        <p>{item.data.first}</p>
                        <p>{item.data.middle}</p>
                        <p>{item.data.last}</p>
                        <p>{item.data.born}</p>
                    </div>
                ))
            )}<------ Prøv dette efter frokost */}

        </>
    )
}