// chrome.chromeAction.onClicked.addListener(function(tab) {

//     chrome.tabs.executeScript({
//         code: 'var d = new Date(); d.setDate(d.getDate()+1); document.activeElement.value = d.toLocaleDateString("fr"); '
//     });

// });
// var CryptoJS = require("crypto-js");

function listenForClicks() {

    function resetEncryption(tabs) {
        console.log("reset");
        let myKey = document.getElementById("key");
        if (myKey.value === null) {
            console.log("pas de clé");
        } else {
            chrome.tabs.sendMessage(tabs[0].id, {
                command: "reset",
                key: myKey.value
            });
        }
    }

    // injection du scrypte de décryptage
    function decrypte(tabs) {
        console.log("decrypte");
        let myKey = document.getElementById("key");
        if (myKey.value === null) {
            console.log("pas de clé");
        } else {
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    command: "decrypte"
                }, function(encryptedStr) {
                    if (typeof encryptedStr == "undefined") { console.log("Error : bad response") } else {
                        console.log(myKey.value);
                        console.log(encryptedStr);
                        var decryptedBytes = CryptoJS.AES.decrypt(encryptedStr, myKey.value);
                        var decryptedStr = decryptedBytes.toString(CryptoJS.enc.Utf8)
                        console.log(decryptedStr);
                        chrome.tabs.sendMessage(tabs[0].id, {
                            command: "replace",
                            str: decryptedStr
                        });
                    }
                });
            });
        }
    }

    function reportError(error) {
        onsole.error(`Error : ${error}`);
    }

    document.getElementById("decrypteBtn").addEventListener("click", decrypte);
    document.getElementById("resetBtn").addEventListener("click", resetEncryption);

    // if (e.target.classList.contains("decrypte")) {
    //     console.log("decrypte");
    //     chrome.tabs.query({ active: true, currentWindow: true })
    //         .then(decrypte)
    //         .catch(reportError);
    // } else if (e.target.classList.contains("reset")) {
    //     chrome.tabs.query({ active: true, currentWindow: true })
    //         .then(reset)
    //         .catch(reportError);
    // }
}

listenForClicks();