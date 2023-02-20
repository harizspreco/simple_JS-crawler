const { normalizeURL, getLinksFromHTML } = require("./crawl");

// getLinksFromHTML tests

test("getLinksFromHTML absolute URL", () => {
  const exampleHTML = `
    <html>
        <body>
            <a href="http://example.com/">Link</a>
        </body>
    </html>
    `;
  const exampleURL = "http://example.com";

  expect(getLinksFromHTML(exampleURL, exampleHTML)).toEqual([
    "http://example.com/"
  ]);
});

test("getLinksFromHTML relative URL", () => {
  const exampleHTML = `
    <html>
        <body>
            <a href="/path/">Link</a>
        </body>
    </html>
    `;
  const exampleURL = "http://example2.com";

  expect(getLinksFromHTML(exampleURL, exampleHTML)).toEqual([
    "http://example2.com/path/"
  ]);
});
// normalizeURL tests
test("normalizeURL remove slash", () => {
  expect(normalizeURL("https://google.com/")).toBe("google.com");
});

test("normalizeURL remove HTTPS", () => {
  expect(normalizeURL("http://google.com")).toBe("google.com");
});

test("normalizeURL to lower case", () => {
  expect(normalizeURL("http://gOOgle.com")).toBe("google.com");
});

test("normalizeURL to lower case", () => {
  expect(normalizeURL("http://gOOgle.com")).toBe("google.com");
});
