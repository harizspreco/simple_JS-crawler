const { crawlPage } = require("./crawl");

async function main() {
  if (process.argv.length < 3) {
    return;
  } else if (process.argv.length > 3) {
    console.error("Too many arguments");
    return;
  }

  const baseURL = process.argv[2];

  const pages = await crawlPage(baseURL, baseURL, {});
}

main();
