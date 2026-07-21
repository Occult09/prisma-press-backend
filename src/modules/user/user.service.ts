import bcrypt from "bcryptjs";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { User } from "./user.interface";

const registerUserIntoDB = async (payload: User) => {
    const { name, email, password, profilePhoto } = payload;

    const isUserExists = await prisma.user.findUnique({
        where: { email },
    });

    if (isUserExists) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

    const createdUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            profile: {
                create: {
                    profilePhoto
                }
            }
        }
    });

    // await prisma.profile.create({
    //     data: {
    //         userId: createdUser.id,
    //         profilePhoto
    //     }
    // })

    const user = await prisma.user.findUnique({
        where: {
            email: email
        },
        omit: {
            password: true
        },
        include: {
            profile: true
        }
    })
    return user;
}

export const userService = {
    registerUserIntoDB
}