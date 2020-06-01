import puppeteer from "puppeteer";
import avoidDetection from "./avoid-detection";

const __launchPuppeteer = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await avoidDetection(page);

  return { browser, page };
};

export const scrapeIndeed = async (url: string, pageNum: number) => {
  let newUrl = `${url}&start=${50 * pageNum}`;
  const puppeteer = await __launchPuppeteer();
  await puppeteer.page.goto(newUrl);

  const jobs = await puppeteer.page.evaluate(() => {
    const jobLinks = Array.from(
      document.getElementsByClassName("jobtitle")
    ).map((title, index) => {
      return {
        title: title.innerHTML.slice(1),
        company: (document as any).getElementsByClassName("company")[index]
          .innerText,
        location: (document as any).getElementsByClassName("location")[index]
          .innerText,
        link: title.toString(),
        posted: (document as any).getElementsByClassName("date")[index]
          .innerText,
      };
    });

    return jobLinks.filter((job) => job.link.split("/")[3] !== "pagead");
  });
  puppeteer.browser.close();

  return jobs;
};

export const scrapeIndeedJobDescription = async (url: string) => {
  const puppeteer = await __launchPuppeteer();
  url = url.replace("/rc/clk", "/viewjob");
  await puppeteer.page.goto(url);

  const description = await puppeteer.page.evaluate(() => {
    if (!document.getElementById("jobDescriptionText")) {
      return "Click link below to learn more...";
    } else {
      return (document as any).getElementById("jobDescriptionText").innerHTML;
    }
  });
  puppeteer.browser.close();
  return description;
};
