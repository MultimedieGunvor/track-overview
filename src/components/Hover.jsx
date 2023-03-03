import { useState, useRef, useEffect } from "react";

// export function ShowInfoHandler(i) {
//     const [hoveredInfo, setHoveredInfo] = useState(-1);
//     setHoveredInfo(i);
//     console.log(hoveredInfo);
//     return hoveredInfo;
// };

// export function HideInfoHandler() {
//     setHoveredInfo(-1);
//     console.log(hoveredInfo);
//     return hoveredInfo;
// };

export function useHover() {
    const [value, setValue] = useState(false);
    const ref = useRef(null);
    
    const handleMouseOver = () => setValue(true);
    const handleMouseOut = () => setValue(false);

    useEffect(
        () => {
            const node = ref.current;
            if(node) {
                node.addEventListener("mouseover", handleMouseOver);
                node.addEventListener("mouseout", handleMouseOut);
                return () => {
                    node.removeEventListener("mouseover", handleMouseOver);
                    node.removeEventListener("mouseout", handleMouseOut);
                };
            }
        },
        [ref.current]
    );

    return [ref, value];
}