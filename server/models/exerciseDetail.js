const mongoose = require("mongoose");

const exerciseDetailSchema = new mongoose.Schema({
  name: String,
  warmupSets: {
    min: Number,
    max: Number,
  },
  workingSets: {
    min: Number,
    max: Number,
  },
  reps: {
    min: Number,
    max: Number,
    notes: String,
  },
  weight: {
    value: Number,
    unit: {
      type: String,
      enum: ["kgs", "lbs"],
    },
  },
  rpe: {
    min: Number,
    max: Number,
  },
  rest: {
    value: Number,
    unit: {
      type: String,
      enum: ["seconds", "minutes"],
    },
  },
  notes: String,
  warmupSetsCompletion: {
    individual: [Boolean],
    overall: Boolean,
  },
  workingSetsCompletion: {
    individual: [Boolean],
    overall: Boolean,
  },
});

module.exports = exerciseDetailSchema;
