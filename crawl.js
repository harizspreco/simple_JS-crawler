const { JSDOM } = require("jsdom");

async function crawlPage(baseURL, currentURL, pages) {
  const htmlBody = "";
  const currentURLobj = new URL(currentURL);
  const baseURLobj = new URL(baseURL);

  if (!currentURLobj.hostname !== baseURLobj.hostname) {
    return pages;
  }

  const normalizedURL = normalizeURL(currentURL);

  if (pages[normalizedURL] > 0) {
    pages[normalizedURL]++;
    return pages;
  }

  pages[normalizedURL] = 1;

  try {
    const response = await fetch(currentURL);
    if (response.status > 399) {
      console.log(`HTTP Error, status code: ${response.status}`);
      return pages;
    }
    const contentType = response.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.error("Can't crawl non HTML pages");
      return pages;
    }
    htmlBody = await response.text();
    console.log(htmlBody);
  } catch (error) {
    console.log(error);
  }

  const nextURLs = getLinksFromHTML(baseURL, htmlBody);
  for (const nextURL of nextURLs) {
    pages = await crawlPage(baseURL, nextURL, pages);
  }

  return pages;
}

const getLinksFromHTML = (baseURL, HTMLbody) => {
  const urls = [];
  const dom = new JSDOM(HTMLbody);
  const links = dom.window.document.querySelectorAll("a");

  for (const link of links) {
    if (link.href.startsWith("/")) {
      urls.push(`${baseURL}${link.href}`);
    } else {
      urls.push(link.href);
    }
  }
  console.log(urls);
  return urls;
};

const normalizeURL = url => {
  const urlObj = new URL(url);

  let normalizedURL = `${urlObj.hostname}${urlObj.pathname}`;

  if (normalizedURL.length > 0 && normalizedURL.endsWith("/")) {
    normalizedURL = normalizedURL.slice(0, -1);
  }

  return normalizedURL;
};

module.exports = { normalizeURL, getLinksFromHTML, crawlPage };
