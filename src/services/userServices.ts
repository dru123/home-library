import { User } from "../models/interfaces/user";
import { v4 as uuidV4 } from "uuid";

let users: User[] = [];
export class UserService {
  static getAllUsers(): Omit<User, "password">[] {
    return users.map(
      ({ password, ...userWithoutPassword }) => userWithoutPassword
    );
  }

  static getUserById(id: string): Omit<User, "password"> | undefined {
    const user = users.find((data) => data.id === id);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return undefined;
  }

  static createUser(login: string, password: string): Omit<User, "password">[] {
    const newUser: User = {
      id: uuidV4(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    users.push(newUser);
    return users.map(
      ({ password, ...userWithoutPassword }) => userWithoutPassword
    );
  }

  static updateUserPassword(
    id: string,
    oldPassword: string,
    newPassword: string
  ): Omit<User, "password"> | null | string {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      const user = users[index];
      if (user.password === oldPassword) {
        user.password = newPassword;
        user.version++;
        user.updatedAt = Date.now();
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      } else {
        return "Password not match";
      }
    }
    return null;
  }

  static deleteUserById(id: string): boolean {
    const index = users.findIndex((data) => data.id === id);
    if (index > -1) {
      users.splice(index, 1);
      return true;
    }
    return false;
  }
}
