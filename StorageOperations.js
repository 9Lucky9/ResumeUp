/**
 * Retrieves status of app On/Off
 */
export async function getEnableStatus() {
    const result = await chrome.storage.local.get("Enabled");
    return Promise.resolve(result.Enabled);
}

/**
 * Set status of app On/Off
 * @param {boolean} status - status true/false
 */
export async function setEnableStatus(status) {
    await chrome.storage.local.set({ "Enabled": status });
}

