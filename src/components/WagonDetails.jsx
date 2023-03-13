import { useLocation } from "react-router-dom";

export default function WagonDetails() {
    const location = useLocation();
    const {state} = location;

    console.log(state.wagonId);
}