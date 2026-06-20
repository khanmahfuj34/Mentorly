"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleGuard = void 0;
const roleGuard = (...roles) => (req, res, next) => {
    const userRole = req.user.role;
    if (!roles.includes(userRole)) {
        return res.status(403).json({
            success: false,
            message: "Forbidden Access",
        });
    }
    next();
};
exports.roleGuard = roleGuard;
