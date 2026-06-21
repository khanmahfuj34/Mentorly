export const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Mentorly API",
        version: "1.0.0",
        description: "Mentorly Backend API Documentation",
    },
    servers: [
        {
            url: "http://localhost:3000/api/v1",
            description: "Development Server",
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
};