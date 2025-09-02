"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
const connect_1 = require("./database/connect");
const routes_1 = require("./routes");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./swagger");
dotenv_1.default.config();
app.use(express_1.default.static("public")); //usefull for serving the static file in browser like image, css html and all others.
app.use(express_1.default.urlencoded({ extended: true })); //usefull for handling submitted form and parsing the req.body
app.use(express_1.default.json()); //for pasrsing json data and sending the json data
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
app.use("/movies", routes_1.moviesRoute);
(0, connect_1.connectToDatabase)()
    .then(() => {
    app.listen(process.env.BACKEND_PORT || 5000, () => {
        console.log(`listening to the port ${process.env.BACKEND_PORT}`);
    });
})
    .catch((error) => {
    console.log(error);
});
