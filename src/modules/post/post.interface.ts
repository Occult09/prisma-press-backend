import { PostStatus } from "../../../generated/prisma/enums";

export interface ICreatePostPaylod {
    title: string;
    content: string;
    thumbnail?: string;
    isFeatured?: boolean;
    status?: PostStatus;
    tag: string[];
}