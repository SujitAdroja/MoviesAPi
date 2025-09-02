"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.updateMovie = exports.addNewMovie = exports.getMovieById = exports.getMovies = void 0;
const movies_mode_1 = require("../database/movies.mode");
const getMovies = async function (req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        //page and limit not exits
        if (!page && !limit) {
            const movies = await movies_mode_1.moviesModel.find();
            if (!movies)
                res.status(404).json({
                    success: true,
                    message: "No movies Found Please add movies",
                    data: [],
                });
            res.json({
                success: true,
                message: "Movies Fetched successfully",
                data: movies,
            });
        }
        else {
            //calculating skip value
            const skip = (page - 1) * limit;
            const movies = await movies_mode_1.moviesModel.find().skip(skip).limit(limit);
            const total = await movies_mode_1.moviesModel.countDocuments();
            res.status(200).json({
                success: true,
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                data: movies,
            });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error,
            });
        }
    }
};
exports.getMovies = getMovies;
// get movies by id'
const getMovieById = async function (req, res) {
    try {
        const { id } = req?.params;
        const movie = await movies_mode_1.moviesModel.findById(id);
        if (!movie)
            return res.status(404).json({
                success: true,
                message: "No movie found with this id",
                data: [],
            });
        else {
            res.status(200).json({
                success: true,
                message: "Movie found successfully",
                data: movie,
            });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error,
            });
        }
    }
};
exports.getMovieById = getMovieById;
const addNewMovie = async function (req, res) {
    try {
        const { title, director, releaseYear, genre, rating } = req?.body;
        const movies = new movies_mode_1.moviesModel({
            title,
            director,
            releaseYear,
            genre,
            rating,
        });
        await movies.save();
        res.status(200).json({
            success: true,
            message: "Movie added successfully",
            data: movies,
        });
    }
    catch (error) {
        if (error.name === "ValidationError") {
            // Handle mongoose validation errors
            return res.status(400).json({
                success: false,
                message: "Validation error",
                error: error.errors?.rating?.message || "Invalid input",
            });
        }
        // Unexpected server/database error
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};
exports.addNewMovie = addNewMovie;
const updateMovie = async function (req, res) {
    try {
        const { id } = req?.params;
        const obj = req?.body;
        const movie = await movies_mode_1.moviesModel.findOneAndUpdate({ _id: id }, obj);
        await movie?.save();
        const newMovie = await movies_mode_1.moviesModel.findById(id);
        if (!movie || !newMovie)
            return res.status(404).json({
                success: true,
                message: "movie not found or update unsuccessfull",
                data: [],
            });
        else {
            res.status(200).json({
                success: true,
                message: "Movies updated successfully",
                Data: movie,
                updatedData: newMovie,
            });
        }
    }
    catch (error) {
        if (error.name === "ValidationError") {
            // Handle mongoose validation errors
            return res.status(400).json({
                success: false,
                message: "Validation error",
                error: error.errors?.rating?.message || "Invalid input",
            });
        }
        // Unexpected server/database error
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};
exports.updateMovie = updateMovie;
const deleteMovie = async function (req, res) {
    try {
        const { id } = req?.params;
        const movie = await movies_mode_1.moviesModel.findByIdAndDelete(id);
        if (!movie)
            return res.status(404).json({
                success: true,
                message: "Movie Not found or deletion unsuccessfull",
                data: movie,
            });
        res.status(200).json({
            success: true,
            message: "Movie deleted Successfully",
            data: movie,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error,
            });
        }
    }
};
exports.deleteMovie = deleteMovie;
