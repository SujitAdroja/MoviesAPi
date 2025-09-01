import express from "express";

const app = express();
import dotenv from "dotenv";
import { connectToDatabase } from "./database/connect";
import { moviesRoute } from "./routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";

dotenv.config();

app.use(express.static("public")); //usefull for serving the static file in browser like image, css html and all others.
app.use(express.urlencoded({ extended: true })); //usefull for handling submitted form and parsing the req.body
app.use(express.json()); //for pasrsing json data and sending the json data

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
