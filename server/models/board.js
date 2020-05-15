const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boardSchema = new Schema({
  title: String,
  lists: [{ type: Schema.Types.ObjectId, ref: "List" }],
  userId: String,
});

const Board = mongoose.model("Board", boardSchema);

module.exports = { boardSchema, Board };
