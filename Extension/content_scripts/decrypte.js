console.log("injection qui fonctionne");

function injectEDcrypte() {
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    function decrypte() {
        let encryptedMessages = document.getElementById("encrypted");
        if (encryptedMessages) {
            const encryptedStr = encryptedMessages.textContent;
            return encryptedStr.toString();
        }
    }

    function reset(key) {
        let encryptedMessages = document.getElementsByClassName("encrypted");
        encryptedMessages.forEach(element => {
            const encryptedStr = element.textContent;
        });
    }

    function replace(str) {
        let encryptedMessages = document.getElementById("encrypted");
        encryptedMessages.textContent = str;
    }

    console.log("fin de l'injection");
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        switch (message.command) {
            case "decrypte":
                console.log("msg reçu decrypte");
                sendResponse(decrypte());
                break;
            case "reset":
                console.log("msg reçu encrypte");
                console.log(message.key);
                reset(message.key);
                break;
            case "replace":
                replace(message.str);
                break;
        }
    });
}
injectEDcrypte()