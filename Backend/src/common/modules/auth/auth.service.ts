import bcrypt from "bcrypt";
import { prisma } from "../../../config/prisma";
import { generateToken, verifyToken } from "../../utilis/jwt";
import { AppError } from "../../errors/AppError";

const registerUser = async (payload: {
    name: string;
    email: string;
    password: string;
    role?: "STUDENT" | "TUTOR" | "ADMIN";
}) => {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: payload.email,
        },
    });

    if (existingUser) {
        throw new AppError(409, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const user = await prisma.user.create({
        data: {
            name: payload.name,
            email: payload.email,
            password: hashedPassword,
            role: payload.role || "STUDENT",
        },
    });

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
};

const loginUser = async (payload: {
    email: string;
    password: string;
}) => {
    const user = await prisma.user.findUnique({
        where: {
            email: payload.email,
        },
    });

    if (!user) {
        throw new AppError(404, "User not found");
    }

    const isPasswordMatched = await bcrypt.compare(
        payload.password,
        user.password
    );

    if (!isPasswordMatched) {
        throw new AppError(401, "Invalid credentials");
    }
    const accessToken = generateToken(
        {
            userId: user.id,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_ACCESS_SECRET as string,
        process.env.JWT_ACCESS_EXPIRES_IN || "15m"
    );

    const refreshToken = generateToken(
        {
            userId: user.id,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_REFRESH_SECRET as string,
        process.env.JWT_REFRESH_EXPIRES_IN || "30d"
    );

    const { password, ...userWithoutPassword } = user;

    return {
        accessToken,
        refreshToken,
        user: userWithoutPassword
    };
};

const refreshToken = async (token: string) => {
    let decodedData;
    try {
        decodedData = verifyToken(
            token,
            process.env.JWT_REFRESH_SECRET as string
        ) as any;
    } catch (err) {
        throw new AppError(401, "Invalid Refresh Token");
    }

    const { email } = decodedData;

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        throw new AppError(404, "User does not exist");
    }

    if (user.isBlocked) {
        throw new AppError(403, "User is blocked");
    }

    const accessToken = generateToken(
        {
            userId: user.id,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_ACCESS_SECRET as string,
        process.env.JWT_ACCESS_EXPIRES_IN || "15m"
    );

    return {
        accessToken,
    };
};

const updateAccount = async (
    userId: string,
    payload: { name?: string; email?: string }
) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        throw new AppError(404, "User not found");
    }

    if (payload.email && payload.email !== user.email) {
        const existingEmailUser = await prisma.user.findUnique({
            where: { email: payload.email },
        });

        if (existingEmailUser && existingEmailUser.id !== userId) {
            throw new AppError(409, "Email is already taken by another account");
        }
    }

    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
            ...(payload.name ? { name: payload.name } : {}),
            ...(payload.email ? { email: payload.email } : {}),
        },
    });

    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
};

const changePassword = async (
    userId: string,
    payload: { currentPassword?: string; newPassword?: string }
) => {
    const { currentPassword, newPassword } = payload;
    if (!currentPassword || !newPassword) {
        throw new AppError(400, "Both current password and new password are required");
    }

    if (newPassword.length < 6) {
        throw new AppError(400, "New password must be at least 6 characters long");
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        throw new AppError(404, "User not found");
    }

    const isMatched = await bcrypt.compare(currentPassword, user.password);
    if (!isMatched) {
        throw new AppError(400, "Current password is incorrect");
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
        where: { id: userId },
        data: {
            password: newHashedPassword,
        },
    });

    return { message: "Password updated successfully" };
};

const deleteAccount = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        throw new AppError(404, "User not found");
    }

    await prisma.$transaction(async (tx) => {
        await tx.review.deleteMany({
            where: {
                OR: [{ studentId: userId }, { tutorId: userId }],
            },
        });

        await tx.booking.deleteMany({
            where: {
                OR: [{ studentId: userId }, { tutorId: userId }],
            },
        });

        await tx.tutorApplication.deleteMany({
            where: {
                OR: [
                    { tutorId: userId },
                    { tuitionRequest: { studentId: userId } },
                ],
            },
        });

        await tx.tuitionRequest.deleteMany({
            where: { studentId: userId },
        });

        await tx.user.delete({
            where: { id: userId },
        });
    });

    return { message: "Account deleted successfully" };
};

export const AuthService = {
    registerUser,
    loginUser,
    refreshToken,
    updateAccount,
    changePassword,
    deleteAccount,
};