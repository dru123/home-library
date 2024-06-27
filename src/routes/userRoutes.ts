import express from "express";
import { UserController } from "../controllers/userController";
import { validateCreateUser, validateUpdatePassword } from "../models/dto/user";

const router = express.Router();

router.get("/", UserController.getAllUsers);

router.get("/:id", UserController.getUserById);

router.post("/", validateCreateUser, UserController.createUser);

router.put("/:id", validateUpdatePassword, UserController.updateUserPassword);

router.delete("/:id", UserController.deleteUserById);

export default router;
