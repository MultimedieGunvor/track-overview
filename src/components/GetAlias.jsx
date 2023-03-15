export default function GetAlias ({color}) {
    const alias = color === "blue" || color === "lblue" ? "semi" : color === "green" || color === "lgreen" ? "flat" : "";

    return alias;
};