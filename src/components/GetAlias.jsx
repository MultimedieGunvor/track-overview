export default function GetAlias ({color}) {
    const alias = color === "Blue" || color === "Lblue" ? "semi" : color === "Green" || color === "Lgreen" ? "flat" : "";
    console.log(alias);
    return alias;
};