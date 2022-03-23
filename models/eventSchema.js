const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);


const eventSchema = new mongoose.Schema({
  _id: Number,
  title: { type: String, required: true },
  date: { type: Date, required: true },
  mainSpeaker: { type: mongoose.Schema.Types.ObjectId, ref: "speakers" },
  speakers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Speakers" }],
  students: [{ type: Number, ref: "Students" }],
});


eventSchema.plugin(autoIncrement, {
  id: "event count",
  inc_field: "_id",
});

const Events = mongoose.model("Events", eventSchema);
module.exports = Events;
