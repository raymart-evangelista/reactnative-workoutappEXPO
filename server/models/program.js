const mongoose = require("mongoose");
const weekDetailSchema = require("./weekDetail");

const programSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  numWeeks: {
    type: Number,
  },
  weeks: [weekDetailSchema],
});

programSchema.set("timestamps", true);

module.exports = mongoose.model("Program", programSchema);
