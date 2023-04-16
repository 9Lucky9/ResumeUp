import { getEnableStatus } from "./StorageOperations.js";

const upResumeButtonQuery = '#HH-React-Root > div > div.HH-MainContent.HH-Supernova-MainContent > div.main-content > div > div:nth-child(2) > div > div > div:nth-child(3) > div > div > div > div:nth-child(2) > div:nth-child(1) > div > div.bloko-gap.bloko-gap_top > div > button';
const targetUrl = "https://hh.ru/resume/";

//4 hours in milliSeconds
const milliSeconds = 14400000;
const mo = new MutationObserver(onMutation);
//Create interval number by setInterval()
var intervalId;

//Script stopped within runtime
var stoppedInRuntime = false;

export function main() {
    getEnableStatus().then((isEnabled) => {
        if (isEnabled === true) {
            observe();
        }
    });
}

//If document changes and adds upResumeButton then fire the script
function onMutation() {
    if (document.querySelector(upResumeButtonQuery)) {
        mo.disconnect();
        upResume();
        intervalId = setInterval(upResume, milliSeconds);
        observe();
    }
}

//Stop the script if popup.js sends a message.
chrome.runtime.onMessage.addListener(
    function (message) {
        if (message.stopRuntime === true) {
            clearInterval(intervalId);
            stoppedInRuntime = true;
        }
    }
);

//Observe document only on page *resume/*
function observe() {
    if (document.URL.includes(targetUrl)) {
        mo.observe(document, {
            subtree: true,
            childList: true,
        });
    }
}

//Up resume by clicking the up button
function upResume() {
    if (!stoppedInRuntime) {
        document.querySelector(upResumeButtonQuery).click();
        console.log("Fired");
    }
}

