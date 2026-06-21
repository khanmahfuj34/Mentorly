import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import { swaggerDefinition } from "./swaggerDef";

const options = {
    definition: swaggerDefinition,
    apis: [
        path.join(__dirname, "../modules/**/*.ts").replace(/\\/g, "/"),
        path.join(__dirname, "../modules/**/*.js").replace(/\\/g, "/"),
    ],
};

export const swaggerSpec = swaggerJsdoc(options);