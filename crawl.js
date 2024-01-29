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
	console.log(urls);
	return urls;
}

module.exports = {
	normalizeURL,
	getURLsFromHTML,
};
