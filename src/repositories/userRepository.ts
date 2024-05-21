import { UserDataType } from "../validations/userSchema";
import { sqliteConnection } from "../database/sqlite3";

export type createUserDataType = UserDataType & { id: string };

export const userRepository = {
  async createUser(data: createUserDataType) {
    try {
      const { id, name, email, password } = data;

      const db = await sqliteConnection();

      const querySQL =
        "INSERT INTO users (id,  name, email, password ) VALUES (?, ?, ?, ?);";

      await db.run(querySQL, [id, name, email, password]);

      return { id };
    } catch (error) {
      throw error;
    }
  },

  async getUserByEmail(email: string) {
    try {
      const db = await sqliteConnection();

      const querySQL = "SELECT * FROM users WHERE email = ?);";

      const user = await db.get(querySQL, [email]);

      return user;
    } catch (error) {
      throw error;
    }
  },
};
