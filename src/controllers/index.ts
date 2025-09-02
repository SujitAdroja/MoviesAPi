import { Request, Response } from "express";
import { moviesModel } from "../database/movies.mode";

export const getMovies = async function (req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    //page and limit not exits
    if (!page && !limit) {
      const movies = await moviesModel.find();
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
    } else {
      //calculating skip value
      const skip = (page - 1) * limit;
      const movies = await moviesModel.find().skip(skip).limit(limit);
      const total = await moviesModel.countDocuments();

      res.status(200).json({
        success: true,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        data: movies,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error,
      });
    }
  }
};

// get movies by id'
export const getMovieById = async function (req: Request, res: Response) {
  try {
    const { id } = req?.params;
    const movie = await moviesModel.findById(id);
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
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error,
      });
    }
  }
};

export const addNewMovie = async function (req: Request, res: Response) {
  try {
    const { title, director, releaseYear, genre, rating } = req?.body;
    const movies = new moviesModel({
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
  } catch (error: any) {
    if (error.name === "ValidationError") {
      // Handle mongoose validation errors
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: error.errors || "Invalid input",
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

export const updateMovie = async function (req: Request, res: Response) {
  try {
    const { id } = req?.params;
    const obj = req?.body;
    const movie = await moviesModel.findOneAndUpdate({ _id: id }, obj);
    await movie?.save();
    const newMovie = await moviesModel.findById(id);
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
        data: movie,
        updatedData: newMovie,
      });
    }
  } catch (error: any) {
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

export const deleteMovie = async function (req: Request, res: Response) {
  try {
    const { id } = req?.params;
    const movie = await moviesModel.findByIdAndDelete(id);
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
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error,
      });
    }
  }
};
