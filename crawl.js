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

async function crawlPage(rootURL) {
	try {
		const response = await fetch(rootURL);

		if (response.status >= 400) {
			console.log(`error in fetch with status code: ${response.status} on page ${rootURL}`);
			return;
		}

		const contentType = response.headers.get("content-type");
		if (!contentType.includes("text/html")) {
			console.log(`non html response: ${contentType} on page ${rootURL}`);
			return;
		}

		console.log(await response.text());
	} catch (err) {
		console.log(`error in fetch: ${err.message}, on page: ${rootURL}`);
	}
}

module.exports = {
	normalizeURL,
	getURLsFromHTML,
	crawlPage,
};
