import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import DeleteWagon from "./DeleteWagon";
import WagonModal from "../components/WagonModal";
import Table from 'react-bootstrap/Table';

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
        <Table striped responsive>
            <thead>
                <tr>
                    <th>Position</th>
                    <th>01</th>
                    <th>02</th>
                    <th>03</th>
                    <th>04</th>
                    <th>05</th>
                    <th>06</th>
                    <th>07</th>
                    <th>08</th>
                    <th>09</th>
                    <th>10</th>
                    <th>11</th>
                    <th>12</th>
                    <th>13</th>
                    <th>14</th>
                    <th>15</th>
                    <th>16</th>
                    <th>17</th>
                    <th>18</th>
                    <th>19</th>
                    <th>20</th>
                </tr>
            </thead>
            <tbody className="wagons">
                {Wagons.length === 0 ? (
                    <p>No wagons found</p>
                ) : (
                    Wagons.map(
                        ({ id, wagonId, shortId, litra, color, destination, damage, comment, track, position }) => (
                            <tr className="wagon" key={id} onMouseEnter={openModal} onMouseLeave={closeModal}>
                                <p className={color}>{shortId}</p>
                                <DeleteWagon id={id}/>
                                <WagonModal onClose={closeModal} show={show} >
                                    <td>Track<br/>{track}<br/>date&time</td>
                                    <td>{destination}<br/>{shortId}<br/>{comment}</td>
                                    <td>{wagonId}</td>
                                    <td>{shortId}</td>
                                    <td>{comment}</td>
                                    <td>{litra}</td>
                                    <td>{color}</td>
                                    <td>{damage}</td>
                                    <td>{position}</td>
                                </WagonModal>
                            </tr>
                        )
                    )
                )}
            </tbody>
        </Table>
    );
}