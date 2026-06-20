"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudentProfileValidationSchema = exports.createStudentProfileValidationSchema = void 0;
const zod_1 = require("zod");
exports.createStudentProfileValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        classLevel: zod_1.z.string().optional(),
        schoolCollege: zod_1.z.string().optional(),
        preferredSubjects: zod_1.z.array(zod_1.z.string()).optional(),
        district: zod_1.z.string().optional(),
        area: zod_1.z.string().optional(),
        guardianName: zod_1.z.string().optional(),
        guardianPhone: zod_1.z.string().optional(),
    }),
});
exports.updateStudentProfileValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        classLevel: zod_1.z.string().optional(),
        schoolCollege: zod_1.z.string().optional(),
        preferredSubjects: zod_1.z.array(zod_1.z.string()).optional(),
        district: zod_1.z.string().optional(),
        area: zod_1.z.string().optional(),
        guardianName: zod_1.z.string().optional(),
        guardianPhone: zod_1.z.string().optional(),
    }),
});
