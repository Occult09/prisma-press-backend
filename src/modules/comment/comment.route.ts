import { Router } from "express";
import { commentController } from "./comment.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.get("/author/:authorId", commentController.getCommentByAuthor);

router.get("/:commentId", commentController.getSingleComment);

router.post("/", auth(Role.ADMIN, Role.USER), commentController.createComment);

router.patch("/:commentId", auth(Role.ADMIN, Role.USER), commentController.updateComment);

router.delete("/:commentId", auth(Role.ADMIN, Role.USER), commentController.deleteComment);

router.patch("/:commentId/moderate", auth(Role.ADMIN), commentController.updateModeration);

export const commentRoutes = router;