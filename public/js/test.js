"use strict";
import { CocoService } from "./CocoService"
function test() {
    let buttonListen = document.getElementById("buttonToListen");
    buttonListen.addEventListener('click', function (e) {
        let img = document.getElementById("file").value;
        CocoService(img).then(
            console.log("YOUPI")
        )
    });
}

test();