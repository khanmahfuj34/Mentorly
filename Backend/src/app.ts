import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUi from "swagger-ui-express";
import router from './common/routers';
import { swaggerSpec } from './common/docs/swagger';

const app = express();

// Parsers
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Application routes
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Mentorly Server Running");
});

export default app;
