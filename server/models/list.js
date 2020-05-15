const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jobSchema = require("./job").jobSchema;

const listSchema = new Schema({
  title: String,
  jobs: [{ type: Schema.Types.ObjectId, ref: "Job" }],
  userId: String,
});

const List = mongoose.model("List", listSchema);

module.exports = { listSchema, List };
