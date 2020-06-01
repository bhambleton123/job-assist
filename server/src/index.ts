import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
const app = express();
const port = process.env.PORT || 3001;
import cors from "cors";
import passport from "./auth/passport";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import redisClient from "./util/caching/redis-client";
import connectRedis from "connect-redis";
const redisStore = connectRedis(session);
import mongoose from "mongoose";

redisClient.on("error", (err) => {
  console.log(`Redis error: ${err}`);
});

mongoose.connect(
  (process.env.DEV_DATABASE_URL as string) ||
    (process.env.PROD_DATABASE_URL as string),
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected to mongodb");
});

app.use(express.static(path.join(__dirname, "../client/build")));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    store: new redisStore({
      host: "localhost",
      port: 6379,
      client: redisClient,
      ttl: 604800,
    }),
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

import jobSearch from "./routes/job-search";
import auth from "./routes/auth";
import lists from "./routes/lists";
import boards from "./routes/boards";
import jobs from "./routes/jobs";
import user from "./routes/user";

app.use("/api/auth", auth);
app.use("/api/job-search", jobSearch);
app.use("/api/lists", lists);
app.use("/api/jobs", jobs);
app.use("/api/boards", boards);
app.use("/api/user", user);

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
