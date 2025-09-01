import mongoose from "mongoose";

const moviesSchema = new mongoose.Schema({
  title: { type: String, require: true },
  director: { type: String },
  releaseYear: { type: Number },
  genre: { type: String },
  rating: { type: Number, min: 1, max: 10 },
});

export const moviesModel = mongoose.model("movies", moviesSchema);
