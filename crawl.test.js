const { test, expect } = require("@jest/globals");
const { normalizeURL, getURLsFromHTML } = require("./crawl.js");

// test("normalizeURL strip protocol", () => {
// 	const input = "https://blog.boot.dev/path";
// 	const actual = normalizeURL(input);
// 	const expected = "blog.boot.dev/path";
// 	expect(actual).toEqual(expected);
// });

// test("normalizeURL strip slash", () => {
// 	const input = "https://blog.boot.dev/path/";
// 	const actual = normalizeURL(input);
// 	const expected = "blog.boot.dev/path";
// 	expect(actual).toEqual(expected);
// });

// test("normalizeURL capitals", () => {
// 	const input = "https://BLOG.boot.dev/path";
// 	const actual = normalizeURL(input);
// 	const expected = "blog.boot.dev/path";
// 	expect(actual).toEqual(expected);
// });

// test("normalizeURL http", () => {
// 	const input = "http://BLOG.boot.dev/path";
// 	const actual = normalizeURL(input);
// 	const expected = "blog.boot.dev/path";
// 	expect(actual).toEqual(expected);
// });

test("getURLsFromHTML <a>", () => {
	const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/">Boot.dev Blog</a>
        </body>
    </html>
    `;
	const inputBaseURL = "htpps://blog.boot.dev";
	const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
	const expected = ["https://blog.boot.dev"];
	expect(actual).toEqual(expected);
});
