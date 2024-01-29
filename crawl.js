const { JSDOM } = require("jsdom");

function normalizeURL(url) {
	const urlObj = new URL(url);
	let fullPath = `${urlObj.hostname}${urlObj.pathname}`;
	if (fullPath.length > 0 && fullPath.slice(-1) === "/") {
		fullPath = fullPath.slice(0, -1);
	}
	return fullPath;
}

function getURLsFromHTML(htmlbody, baseURL) {
	const urls = [];
	const dom = new JSDOM(htmlbody);
	const linkElements = dom.window.document.querySelectorAll("a");
	for (const linkElement of linkElements) {
		if (linkElement.href.slice(0, 1) === "/") {
			try {
				const urlObj = new URL(`${baseURL}${linkElement.href}`);
				urls.push(urlObj.href);
			} catch (err) {
				console.log(`error with relative url: ${err.message}`);
			}
		} else {
			try {
				const urlObj = new URL(linkElement.href);
				urls.push(urlObj.href);
			} catch (err) {
				console.log(`error with relative url: ${err.message}`);
			}
		}
	}
	return urls;
}

module.exports = {
	normalizeURL,
	getURLsFromHTML,
};
