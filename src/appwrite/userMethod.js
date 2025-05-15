import { Client, Databases, ID, Storage } from "appwrite";
import config from "../main_config";

class userMethod {
  client = new Client()
    .setEndpoint(config.appwriteUrl)
    .setProject(config.appwriteProjectId);

  databases = new Databases(this.client);
  async addUser({ name, address, email, password }) {
    const docId = ID.unique();
    try {
      const result = await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteUserCollectionId,
        // Generate a unique ID for the item
        docId,
        {
          name,
          address,
          email,
          password,
        }
      );
      console.log("user added successfully:", result);
      this.getUsers(docId);
      return result;
    } catch (error) {
      console.log("addUser error: " + error);
      throw error;
    }
  }

  async updateUser(id, { name, address, email, password }) {
    try {
      const result = await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteUserCollectionId,
        id,
        {
          name,
          address,
          email,
          password,
        }
      );
      console.log("User updated successfully:", result);
      return result;
    } catch (error) {
      console.log("updateUser error: " + error);
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      const result = await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteUserCollectionId,
        id
      );
      console.log("User deleted successfully:", result);
      return result;
    } catch (error) {
      console.log("deleteUser error: " + error);
      throw error;
    }
  }

  async getUsers(docId) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteUserCollectionId,
        docId // Omit the queries parameter if not needed
      );
    } catch (error) {
      console.log("Appwrite service :: GetUsers :: error", error);
      return false;
    }
  }

  async getAllUser() {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteUserCollectionId // Omit the queries parameter if not needed
      );
    } catch (error) {
      console.log("Appwrite service :: GetAllUser :: error", error);
      return false;
    }
  }
}
const userService = new userMethod();
export default userService;
