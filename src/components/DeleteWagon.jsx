import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { db } from "../firebaseConfig";

export default function DeleteWagon({id}) {
    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, "wagons", id));
            console.log("Wagon deleted successfully");
        } catch (err) {
            console.log("Error deleting wagon", err);
        }
    };

    return (
        <>
            <button className="delete-btn" onClick={handleDelete}>Delete</button>
        
        </>
    );
}