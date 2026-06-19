import bcrypt from "bcrypt";
import { prisma } from "../../../config/prisma";
import { generateToken, verifyToken } from "../../utilis/jwt";

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
        throw new Error("User already exists");
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
        throw new Error("User not found");
    }

    const isPasswordMatched = await bcrypt.compare(
        payload.password,
        user.password
    );

    if (!isPasswordMatched) {
        throw new Error("Invalid credentials");
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
        throw new Error("Invalid Refresh Token");
    }

    const { email } = decodedData;

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        throw new Error("User does not exist");
    }

    if (user.isBlocked) {
        throw new Error("User is blocked");
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

export const AuthService = {
    registerUser,
    loginUser,
    refreshToken,
};