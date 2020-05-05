const puppeteer = require("puppeteer");
const avoidDetection = require("./avoid-detection");

const __launchPuppeteer = async (url) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await avoidDetection(page);

  await page.goto(url);
  return page;
};

const scrapeIndeed = async (url, pageNum) => {
  let newUrl = `${url}&start=${50 * pageNum}`;
  const page = await __launchPuppeteer(newUrl);

  const jobs = await page.evaluate(() => {
    const jobLinks = Array.from(
      document.getElementsByClassName("jobtitle")
    ).map((title, index) => {
      return {
        title: title.innerHTML.slice(1),
        company: document.getElementsByClassName("company")[index].innerText,
        location: document.getElementsByClassName("location")[index].innerText,
        link: title.toString(),
        posted: document.getElementsByClassName("date")[index].innerText,
      };
    });

    return jobLinks;
  });

  return jobs;
};

const scrapeIndeedJobDescription = async (url) => {
  const page = await __launchPuppeteer(url);

  const description = await page.evaluate(() => {
    return document.getElementById("jobDescriptionText").innerHTML;
  });
  return description;
};

module.exports = { scrapeIndeed, scrapeIndeedJobDescription };
