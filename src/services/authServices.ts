import { LoginDataType } from "../validations/loginSchema";
import { userRepositoryTypes } from "./userServices";

export const authServices = {
  async login(data: LoginDataType, repository: userRepositoryTypes) {
    try {
      const { email, password } = data;

      const user = await repository.getUserByEmail(email);
      if (!user) throw "Email invalid";

      return "token";
    } catch (error) {
      throw error;
    }
  },
};
