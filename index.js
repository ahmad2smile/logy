async function changeColor() {
	await chrome.tabs.query({ active: true, currentWindow: true }, (r) => {
		chrome.tabs.executeScript(r[0].id, { file: "scripts/linky.js" }, function () {
			if (chrome.runtime.lastError) {
				console.error("Script linky injection failed: " + chrome.runtime.lastError.message);
			}
		});
	});
}

changeColor();