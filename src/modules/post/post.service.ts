import { prisma } from "../../lib/prisma"
import { ICreatePostPaylod } from "./post.interface"

const getAllPostsFromDB = async () => {
    const posts = await prisma.post.findMany({
        include: {
            author: {
                omit: {
                    password: true
                }
            },
            comments: true
        }
    })

    return posts;
}

const createPostIntoDB = async (payload: ICreatePostPaylod, userId: string) => {
    const result = await prisma.post.create({
        data: {
            ...payload,
            authorId: userId
        }
    })

    return result;
}

const getSinglePostFromDB = async (postId: string) => {
    const post = await prisma.post.findUnique({
        where: {
            id: postId
        },
        include: {
            author: true,
            comments: true
        }
    })

    return post;
}



export const postService = {
    getAllPostsFromDB,
    createPostIntoDB,
    getSinglePostFromDB
}