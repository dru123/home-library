import { Request, Response } from "express";
import { UserService } from "../services/userServices";
import { validateUUID } from "../utils/validate";
import { CreateUserDto, UpdatePasswordDto } from "../models/dto/user";
export class UserController {
  static getAllUsers(req: Request, res: Response): void {
    const userData = UserService.getAllUsers();
    res.status(200).json(userData || []);
  }

  static getUserById(req: Request, res: Response): void {
    const id = req.params.id;
    if (!validateUUID(id)) {
      res.status(400).json({ message: "Invalid User Id" });
      return;
    }
    const user = UserService.getUserById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  }

  static createUser(req: Request, res: Response): void {
    const { login, password } = req.body as CreateUserDto;
    const user = UserService.createUser(login, password);
    res.status(201).json(user);
  }

  static updateUserPassword(req: Request, res: Response): void {
    const id = req.params.id;
    if (!validateUUID(id)) {
      res.status(400).json({ message: "Invalid User Id" });
      return;
    }
    const { oldPassword, newPassword } = req.body as UpdatePasswordDto;
    const updatedUser = UserService.updateUserPassword(
      id,
      oldPassword,
      newPassword
    );
    if (typeof updatedUser === "string") {
      res.status(403).json({ message: "Old Password is wrong" });
      return;
    }

    if (updatedUser) {
      res.status(200).json(updatedUser);
      return;
    }

    res.status(404).json({ message: "User not found" });
  }

  static deleteUserById(req: Request, res: Response): void {
    const id = req.params.id;
    if (!validateUUID(id)) {
      res.status(400).json({ message: "Invalid User Id" });
      return;
    }
    const user = UserService.deleteUserById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(204).send(`User with id: ${id} deleted`);
  }
}
