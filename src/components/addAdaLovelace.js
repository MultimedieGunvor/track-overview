import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function AddAda () {

    async function addWagon() {
        try {
            const docRef = await addDoc(collection(db, "wagons"), {
                first: "Alan",
                middle: "Mathison",
                last: "Turing",
                born: 1912
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document", e);
        }
    }

    return (
        <button onClick={addWagon}>Add Wagon</button>
    );
};