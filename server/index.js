require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
const jobSearch = require("./routes/job-search");
const auth = require("./routes/auth");
const passport = require("./auth/passport");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const redisClient = require("./util/caching/redis-client");
const redisStore = require("connect-redis")(session);
const EventEmitter = require("events");

const ee = new EventEmitter();
ee.setMaxListeners(30);

redisClient.on("error", (err) => {
  console.log(`Redis error: ${err}`);
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
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", auth);
app.use("/api/jobs", jobSearch);

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
