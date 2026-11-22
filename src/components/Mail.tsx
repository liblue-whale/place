import React from "react";
import Obfuscate from "react-obfuscate";
export default function Mail() {
    return (
        <div>
        <Obfuscate email="ishiyamaakio1229@gmail.com" />
        <br />
        <Obfuscate href="https://www.instagram.com/akinoyohaturubeotosi/?__pwa=1#" onClick={()=>{console.log("a")}} />
        </div>
    )
}