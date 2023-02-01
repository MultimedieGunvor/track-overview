import { collection, addDoc } from "firebase/firestore";

export default async function AddAda () {

    try {
        const docRef = await addDoc(collection(db, "wagons"), {
            first: "Ada",
            last: "Lovelace",
            born: 1815
        });
        console.log("Documentwritten with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document", e);
    }
}