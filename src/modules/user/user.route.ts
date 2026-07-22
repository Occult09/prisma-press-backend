import { Router } from "express";
import { userController } from "./user.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post('/register', userController.registerUser);
router.get("/me",auth(Role.ADMIN, Role.AUTHOR, Role.USER), userController.getMyProfile);
router.put("/my-profile",auth(Role.ADMIN, Role.AUTHOR, Role.USER),userController.updateMyProfile);

export const userRoutes = router;