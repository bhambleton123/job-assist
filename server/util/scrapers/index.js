const puppeteer = require("puppeteer");
const avoidDetection = require("./avoid-detection");

const __launchPuppeteer = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await avoidDetection(page);

  return { browser, page };
};

const scrapeIndeed = async (url, pageNum) => {
  let newUrl = `${url}&start=${50 * pageNum}`;
  const puppeteer = await __launchPuppeteer();
  await puppeteer.page.goto(newUrl);

  const jobs = await puppeteer.page.evaluate(() => {
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

    return jobLinks.filter((job) => job.link.split("/")[3] !== "pagead");
  });
  puppeteer.browser.close();

  return jobs;
};

const scrapeIndeedJobDescription = async (url) => {
  const puppeteer = await __launchPuppeteer();
  url = url.replace("/rc/clk", "/viewjob");
  await puppeteer.page.goto(url);

  const description = await puppeteer.page.evaluate(() => {
    if (!document.getElementById("jobDescriptionText")) {
      return "Click link below to learn more...";
    } else {
      return document.getElementById("jobDescriptionText").innerHTML;
    }
  });
  puppeteer.browser.close();
  return description;
};

module.exports = { scrapeIndeed, scrapeIndeedJobDescription };
