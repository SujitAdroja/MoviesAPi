import request from "supertest";
import mongoose from "mongoose";
import { app } from "../index"; // your Express app

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Movies API", () => {
  let movieId: string;

  it("should return list of movies", async () => {
    const res = await request(app).get("/movies");
    expect(res.statusCode).toBe(200);
  });

  it("should create a new movie", async () => {
    const newMovie = {
      title: "Test Movie",
      director: "John Doe",
      releaseYear: 2010,
      genre: "Sci-Fi",
      rating: 9,
    };

    const res = await request(app).post("/movies").send(newMovie);
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("_id");

    // save ID for update & delete
    movieId = res.body.data._id;
  });

  it("should update a movie", async () => {
    const updatedMovie = {
      title: "Updated Test Movie",
      rating: 8,
    };

    const res = await request(app).put(`/movies/${movieId}`).send(updatedMovie);
    expect(res.statusCode).toBe(200);

    expect(res.body.data).toHaveProperty("_id");
  });
  it("should delete a movie", async () => {
    const res = await request(app).delete(`/movies/${movieId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("success", true);
  });
});
