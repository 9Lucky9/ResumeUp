import { setEnableStatus, getEnableStatus } from "./StorageOperations.js";

//Input, type: checkbox
const enableSwitch = document.getElementById("toggleButton");

async function init() {
    const savedValue = await getEnableStatus();
    enableSwitch.checked = savedValue;
    enableSwitch.addEventListener("change", setEnableStatusListener);
}
function setEnableStatusListener(event) {
    setEnableStatus(event.target.checked)
    if (event.target.checked === false) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { stopRuntime: true });
        });
    }
}

//Create new tab if tag was <a> clicked.
document.addEventListener('DOMContentLoaded', function () {
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            ln.onclick = function () {
                chrome.tabs.create({ active: true, url: location });
            };
        })();
    }
});

init();




