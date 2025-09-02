import { kMaxLength } from "buffer";
import mongoose from "mongoose";

const moviesSchema = new mongoose.Schema({
  title: { type: String, require: true, minlength: 2, maxlength: 20 },
  director: { type: String, default: "", minLength: 2, maxlength: 20 },
  releaseYear: { type: Number, default: new Date().getFullYear() },
  genre: { type: String, default: "", minlength: 2, maxlength: 20 },
  rating: { type: Number, min: 1, max: 10 },
});

export const moviesModel = mongoose.model("movies", moviesSchema);
