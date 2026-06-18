import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './common/routers';

const app = express();

// Parsers
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Application routes
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Mentorly Server Running");
});

export default app;
