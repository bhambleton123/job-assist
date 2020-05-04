const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
const scrapers = require("./routes/scrapers");

app.use("/jobs", scrapers);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
