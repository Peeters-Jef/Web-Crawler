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

async function crawlPage(baseURL, currentURL, pages) {

    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL);

    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages;
    }

    const normalizedCurrentURL = normalizeURL(currentURL);
    if (pages[normalizedCurrentURL] > 0) {
        pages[normalizedCurrentURL]++;
        return pages;
    }

    pages[normalizedCurrentURL] = 1;
    console.log(`actively crawling: ${currentURL}`);

	try {
		const response = await fetch(currentURL);

		if (response.status >= 400) {
			console.log(`error in fetch with status code: ${response.status} on page ${currentURL}`);
            return pages;
		}

		const contentType = response.headers.get("content-type");
		if (!contentType.includes("text/html")) {
			console.log(`non html response: ${contentType} on page ${currentURL}`);
			return pages;
		}

		const htmlBody = await response.text();

        const nextURLs = getURLsFromHTML(htmlBody, baseURL);

        for (const nextURL of nextURLs) {
            pages = await crawlPage(baseURL, nextURL, pages);
        }
	} catch (err) {
		console.log(`error in fetch: ${err.message}, on page: ${currentURL}`);
	}
    return pages;
}

module.exports = {
	normalizeURL,
	getURLsFromHTML,
	crawlPage
};
