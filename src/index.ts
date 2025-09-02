import express from "express";
export const app = express();
import dotenv from "dotenv";
import { connectToDatabase } from "./database/connect";
import { moviesRoute } from "./routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";

dotenv.config();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/movies", moviesRoute);

connectToDatabase()
  .then(() => {
    app.listen(process.env.BACKEND_PORT || 5000, () => {
      console.log(`listening to the port ${process.env.BACKEND_PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
