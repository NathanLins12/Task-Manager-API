import { hash } from "bcrypt";
import { UserDataType } from "../validations/userSchema";
import { randomUUID } from "node:crypto";
import { createUserDataType } from "../repositories/userRepository";

export type userRepositoryTypes = {
  createUser(data: createUserDataType): Promise<{} | undefined>;
  getUserByEmail(email: string): Promise<{} | undefined>;
};

export const userServices = {
  async create(data: UserDataType, repository: userRepositoryTypes) {
    try {
      const { name, email, password } = data;

      const passwordHash = await hash(password, 10);

      const user = { id: randomUUID(), name, email, password: passwordHash };

      const userCreated = await repository.createUser(user);

      return userCreated;
    } catch (error) {
      throw error;
    }
  },
};
