import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import DeleteWagon from "./DeleteWagon";

export default function ShowWagons() {

    const [Wagons, SetWagons] = useState([]);
    useEffect(() => {
        const wagonRef = collection(db, "wagons");
        const q = query(wagonRef, orderBy("createdAt", "desc")); // Maybe change this to order by track?? Or position??
        onSnapshot(q, (snapshot) => {
            const wagons = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            SetWagons(wagons);
            console.log(wagons);
        });
    }, []);

    return (
        <div className="wagons">
            {Wagons.length === 0 ? (
                <p>No wagons found</p>
            ) : (
                Wagons.map(
                    ({ id, wagonId, shortId, litra, color, destination, damage, comment, track, position }) => (
                        <div className="wagon" key={id}>
                            <p>{wagonId}</p>
                            <p>{shortId}</p>
                            <p>{litra}</p>
                            <p>{color}</p>
                            <p>{destination}</p>
                            <p>{damage}</p>
                            <p>{comment}</p>
                            <p>{track}</p>
                            <p>{position}</p>
                            <DeleteWagon id={id}/>
                        </div>
                    )
                )
            )}
        </div>
    );
}