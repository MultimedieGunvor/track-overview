
import AddWagons from "../components/AddWagons";
import ShowWagons from "../components/ShowWagons";
import SelectStation from "../components/SelectStation";


export default function Station() {
    return (
        <>
        <SelectStation />
        {sessionStorage.value === 'Alnabru' ? (
            <ShowWagons />
        ) : (
            <ShowWagons />
        )}

        <AddWagons />
        {/* <ShowWagons /> */}
        </>
    )
}