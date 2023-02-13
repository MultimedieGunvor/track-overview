import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import DeleteWagon from "./DeleteWagon";
import WagonModal from "../components/WagonModal";

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


    // Modals to open on hover. They are not done
    const [show, setShow] = useState(false);

    const openModal = () => {
        setShow(true);
    };

    const closeModal = () => {
        setShow(false);
    };
 

    return (
        <div className="wagons">
            {Wagons.length === 0 ? (
                <p>No wagons found</p>
            ) : (
                Wagons.map(
                    ({ id, wagonId, shortId, litra, color, destination, damage, comment, track, position }) => (
                        <div className="wagon" key={id} onMouseEnter={openModal} onMouseLeave={closeModal} id={id}>
                            <p className={color}>{shortId}</p>
                            <DeleteWagon id={id}/>
                            <WagonModal show={show} id={id}>
                                <p>{wagonId}</p>
                                <p>{litra}</p>
                                <p>{destination}</p>
                                <p>{damage}</p>
                                <p>{comment}</p>
                                <p>{track}</p>
                                <p>{position}</p>                                
                            </WagonModal>
                        </div>
                    )
                )
            )}
            
        </div>
    );
}