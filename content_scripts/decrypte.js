// import CryptoJS from "crypto-js";

console.log("injection qui fonctionne");
/**
 * On vérifie et on initialise une variable globale
 * permettant de s'assurer que le script ne fera rien
 * s'il est injecté plusieurs fois sur la page.
 */
function injectEDcrypte() {
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    /**
     * Selon une URL fournie, on retire les éventuelles bêtes
     * déjà ajoutées et on crée un élément img
     * qui pointe vers l'image indiquée par l'URL et on insère
     * le nœud dans le document.
     */
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
            // element.textContent = CryptoJS.AES.encrypt(encryptedStr, key);
        });
    }

    function replace(str) {
        let encryptedMessages = document.getElementById("encrypted");
        encryptedMessages.textContent = str;
    }

    /**
     * On écoute les messages du script d'arrière-plan pour
     * déclencher "insertBeast()" ou "removeExistingBeasts()".
     */
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