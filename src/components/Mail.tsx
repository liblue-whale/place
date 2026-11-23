import React from "react";
import Obfuscate from "react-obfuscate";
export default function Mail() {
    return (
        <div>
            <Obfuscate email="liblue.whale.stroll@gmail.com" />
            <br />
            <Obfuscate href="not yet" onClick={() => { console.log("a") }} />
        </div>
    )
}