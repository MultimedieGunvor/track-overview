import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useState } from "react";

export default function GetWagons() {

    const [Wagons, SetWagons] = useState([]);

    async function getAllWagons() {

        const querySnapshot = await getDocs(collection(db, "wagons"));

        querySnapshot.forEach((doc) => {
            const Wagons = [doc.id, doc.data()]; 
            SetWagons(Wagons);
            console.log(Wagons);
        });
    }

    return (
        <>
            
            <button onClick={getAllWagons}>Show wagons</button>
            {Wagons.length === 0 ? (
                <p>No wagons in database</p>
            ) : (
                Wagons.map((item) => (
                    <div className="single-wagon" key={Wagons.indexOf(0)}>
                        <p>{item.key}</p>
                        <p>{item.first}</p>
                        <p>{item.middle}</p>
                        <p>{item.last}</p>
                        <p>{item.born}</p>
                    </div>
                ))
            )} 
        </>
    )
}