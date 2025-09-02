import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movies API",
      version: "1.0.0",
      description: "API documentation for Movies app",
    },
    servers: [{ url: "https://moviesapi-zhkp.onrender.com/" }],
  },
  apis: ["src/routes/*.ts"], // Path to your route files
};

export const swaggerSpec = swaggerJSDoc(options);
