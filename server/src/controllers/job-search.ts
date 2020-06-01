import { scrapeIndeed, scrapeIndeedJobDescription } from "../util/scrapers";
import redisClient from "../util/caching/redis-client";
import { Request, Response } from "express";

export const getJobsFromIndeed = async (req: Request, res: Response) => {
  const { role, experience, location, pages, posted, page } = req.query as any;
  if (!role) {
    res.sendStatus(400);
  } else {
    try {
      redisClient.get(
        `Title=${role.toLowerCase()}&Posted=${posted}&Experience=${experience}&Location=${location.toLowerCase()}&Pages=${pages}`,
        async (err, data) => {
          if (data) {
            res.send(JSON.parse(data.toString()));
          } else {
            const jobs = await scrapeIndeed(
              `https://www.indeed.com/jobs?q=${role}&fromage=${
                posted ? posted : 3
              }&explvl=${experience ? experience : ""}&limit=50&l=${
                location ? location : ""
              }`,
              page ? page : 0
            );
            redisClient.set(
              `Title=${role.toLowerCase()}&Posted=${posted}&Experience=${experience}&Location=${location.toLowerCase()}&Pages=${pages}`,
              JSON.stringify(jobs),
              "EX",
              60,
              (err) => {
                if (err) {
                  res.status(500).send(err);
                }
                res.send(jobs);
              }
            );
          }
        }
      );
    } catch (err) {
      res.status(500);
      res.send(err);
    }
  }
};

export const getJobDescriptionFromIndeed = async (
  req: Request,
  res: Response
) => {
  const { url } = req.query as any;
  try {
    const description = await scrapeIndeedJobDescription(url.toString());
    res.send(description);
  } catch (err) {
    res.send(err);
  }
};
