import bcrypt from "bcrypt";
import { prisma } from "../../../config/prisma";
import { generateToken } from "../../utilis/jwt";

const registerUser = async (payload: {
    name: string;
    email: string;
    password: string;
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
        "7d"
    );

    const { password, ...userWithoutPassword } = user;

    return {
        accessToken,
        user: userWithoutPassword
    };
};

export const AuthService = {
    registerUser,
    loginUser,
};