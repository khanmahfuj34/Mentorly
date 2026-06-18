import bcrypt from "bcrypt";
import { prisma } from "../../../config/prisma";

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

    return user;
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

    return user;
};

export const AuthService = {
    registerUser,
    loginUser,
};