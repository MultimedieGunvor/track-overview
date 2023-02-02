import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function getWagons() {

    async function getAllWagons() {

        const querySnapshot = await getDocs(collection(db, "wagons"));
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data()}`);
            console.log(doc.id, " => ", doc.data());
        });
    }

    return (
        <button onClick={getAllWagons}>Show wagons</button>
    )
}