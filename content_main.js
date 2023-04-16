import { getEnableStatus } from "./StorageOperations.js";

const upResumeButtonQuery = '#HH-React-Root > div > div.HH-MainContent.HH-Supernova-MainContent > div.main-content > div > div:nth-child(2) > div > div > div:nth-child(3) > div > div > div > div:nth-child(2) > div:nth-child(1) > div > div.bloko-gap.bloko-gap_top > div > button';

const milliSeconds = 2000;
const mo = new MutationObserver(onMutation);

//If document changes and adds upResumeButton then fire the script
function onMutation() {
    if (document.querySelector(upResumeButtonQuery)) {
        mo.disconnect();
        upResume();
        setInterval(upResume, milliSeconds);
        observe();
    }
}
//Observe document
function observe() {
    mo.observe(document, {
        subtree: true,
        childList: true,
    });
}


export function main() {
    getEnableStatus().then((isEnabled) => {
        if (isEnabled === true) {
            observe();
        }
    });
}

function upResume() {
    document.querySelector(upResumeButtonQuery).click();
    console.log("Fired");
}

