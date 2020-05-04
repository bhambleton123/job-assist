require("dotenv").config();
const express = require("express");
const app = express();
const port = 3001;
const scrapers = require("./routes/scrapers");
const auth = require("./routes/auth");
const passport = require("./auth/passport");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const redis = require("redis");
const session = require("express-session");
const redisClient = redis.createClient();
const redisStore = require("connect-redis")(session);

redisClient.on("error", (err) => {
  console.log(`Redis error: ${err}`);
});

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
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", auth);
app.use("/jobs", scrapers);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
