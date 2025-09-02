"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moviesModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const moviesSchema = new mongoose_1.default.Schema({
    title: { type: String, require: true },
    director: { type: String },
    releaseYear: { type: Number },
    genre: { type: String },
    rating: { type: Number, min: 1, max: 10 },
});
exports.moviesModel = mongoose_1.default.model("movies", moviesSchema);
