const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
const scrapers = require("./routes/scrapers");
const auth = require("./routes/auth");
const passport = require("./auth/passport");

app.use(passport.initialize());

app.use("/auth", auth);
app.use("/jobs", scrapers);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
