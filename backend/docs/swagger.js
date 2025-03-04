import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Blood Safe Life API",
            version: "1.0.0",
            description: "API documentation for Blood Safe Life project",
        },
        servers: [
            {
                url: "http://localhost:8080", // Update if needed
            },
        ],
    },
    apis: ["./router/route.js"], // Path to your route file
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("Swagger Docs available at http://localhost:8080/api-docs");
};

export default swaggerDocs;
