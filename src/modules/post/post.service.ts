import { CommentStatus } from "../../../generated/prisma/enums";
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
                select: {
                    comments: true
                }
            }
        }
    })

    return post;
}

const getSinglePostFromDB = async (postId: string) => {
    const transactionResult = await prisma.$transaction(
        async (tx) => {
            await tx.post.update({
                where: {
                    id: postId
                },
                data: {
                    views: {
                        increment: 1
                    }
                }
            })

            const post = await tx.post.findUniqueOrThrow({
                where: {
                    id: postId
                },
                include: {
                    author: {
                        omit: {
                            password: true
                        }
                    },
                    comments: {
                        where: {
                            status: CommentStatus.APPROVED
                        },
                        orderBy: {
                            createdAt: "desc"
                        }
                    },
                    _count: {
                        select: {
                            comments: true
                        }
                    }
                }
            })
            return post;
        }
    )
    return transactionResult;
}

const updatePostIntoDB = async (postId: string, payload: IUpdatePostPayload, authorId: string, isAdmin: boolean) => {
    const post = await prisma.post.findUniqueOrThrow({
        where: {
            id: postId
        }
    })

    if (!isAdmin && post.authorId !== authorId) {
        throw new Error("You dont have access to update this post")
    }

    const updatedPost = await prisma.post.update({
        where: {
            id: postId
        },
        data: payload,
        include: {
            author: {
                omit: {
                    password: true
                }
            },
            comments: true
        }
    });

    return updatedPost;
}

const deletePostFromDB = async (postId: string, authorId: string, isAdmin: boolean) => {
    const post = await prisma.post.findUniqueOrThrow({
        where: {
            id: postId
        }
    })

    if (!isAdmin && post.authorId !== authorId) {
        throw new Error("You don't have access to delete this post!");
    }

    await prisma.post.delete({
        where: {
            id: postId
        }
    })
}

export const postService = {
    getAllPostsFromDB,
    createPostIntoDB,
    getMyPostFromDB,
    getSinglePostFromDB,
    updatePostIntoDB,
    deletePostFromDB
}