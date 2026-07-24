import { prisma } from "../../lib/prisma"
import { ICreatePostPaylod, IUpdatePostPayload } from "./post.interface"

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

const getMyPostFromDB = async (userId: string) => {
    const post = await prisma.post.findMany({
        where: {
            authorId: userId
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            comments: true,
            _count: {
                select : {
                    comments: true
                }
            }
        }
    })

    return post;
}

const getSinglePostFromDB = async (postId: string) => {
    const updatedPost = await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            views: {
                increment: 1
            }
        },
        include: {
            author: {
                omit: {
                    password: true
                }
            },
            comments: true
        }
    })

    return updatedPost;
}

const updatePostIntoDB = async (postId: string, payload: IUpdatePostPayload, authorId: string, isAdmin: boolean) => {
    const post = await prisma.post.findUniqueOrThrow({
        where: {
            id: postId
        }
    })

    if(!isAdmin && post.authorId !== authorId){
        throw new Error("You dont have access to update this post")
    }

    const updatedPost = await prisma.post.update({
        where : {
            id: postId
        },
        data: payload,
        include : {
            author : {
                omit: {
                    password: true
                }
            },
            comments: true
        }
    });

    return updatedPost;
}



export const postService = {
    getAllPostsFromDB,
    createPostIntoDB,
    getMyPostFromDB,
    getSinglePostFromDB,
    updatePostIntoDB
}