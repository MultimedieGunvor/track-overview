import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import DeleteWagon from "./DeleteWagon";
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


    // --- Handling info-modal for wagons ---
    
    const [hoveredInfo, setHoveredInfo] = useState(-1);

    const showInfoHandler = (i) => {
        setHoveredInfo(i);
    }
    const hideInfoHandler = () => {
        setHoveredInfo(-1);
    }
 

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
                        ({ id, wagonId, shortId, litra, color, destination, damage, comment, track, position }, i) => (
                            <tr className="wagon" key={id} onMouseEnter={() => showInfoHandler(i)} onMouseLeave={hideInfoHandler}>
                                <p className={color}>{shortId}</p>
                                {/* <DeleteWagon id={id}/> */}
                                <div className="wagon-info" style={{display: hoveredInfo === i ? 'block' : 'none'}} >
                                    <td>Track<br/>{track}<br/>date&time</td>
                                    <td>{destination}<br/>{shortId}<br/>{comment}</td>
                                    <td>{wagonId}</td>
                                    <td>{shortId}</td>
                                    <td>{comment}</td>
                                    <td>{litra}</td>
                                    <td>{color}</td>
                                    <td>{damage}</td>
                                    <td>{position}</td>
                                    <DeleteWagon id={id}/>
                                </div>

                            </tr>
                        )
                    )
                )}
            </tbody>
        </Table>
    );
}