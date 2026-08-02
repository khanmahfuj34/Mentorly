import { RequestHandler } from "express";

export const notFound: RequestHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
    errorSources: [
      {
        path: req.originalUrl,
        message: `The API route ${req.originalUrl} does not exist.`,
      },
    ],
  });
};
