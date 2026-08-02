import { Prisma } from "@prisma/client";

export const handlePrismaError = (err: Prisma.PrismaClientKnownRequestError) => {
  let statusCode = 500;
  let message = err.message || "Database Error";
  let errorSources = [
    {
      path: "",
      message: err.message,
    },
  ];

  if (err.code === "P2002") {
    statusCode = 409;
    message = "Unique constraint failed";
    const target = err.meta?.target as string[] | undefined;
    errorSources = [
      {
        path: target ? target.join(", ") : "",
        message: `${target ? target.join(", ") : "Field"} must be unique.`,
      },
    ];
  } else if (err.code === "P2025") {
    statusCode = 404;
    message = "Record not found";
    errorSources = [
      {
        path: "",
        message: (err.meta?.cause as string) || "The requested record was not found.",
      },
    ];
  } else if (err.code === "P2003") {
    statusCode = 400;
    message = "Foreign key constraint failed";
    errorSources = [
      {
        path: "",
        message: "Invalid reference key.",
      },
    ];
  }

  return {
    statusCode,
    message,
    errorSources,
  };
};
