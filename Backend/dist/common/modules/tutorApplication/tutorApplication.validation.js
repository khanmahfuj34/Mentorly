"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorApplicationValidation = void 0;
const zod_1 = require("zod");
const createTutorApplicationValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        coverLetter: zod_1.z.string().max(2000, "Cover letter must not exceed 2000 characters").optional(),
    }),
});
exports.TutorApplicationValidation = {
    createTutorApplicationValidationSchema,
};
