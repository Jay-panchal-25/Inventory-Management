import { Client, Databases, ID } from "appwrite";
import config from "../main_config";

class orderMethod {
  client = new Client()
    .setEndpoint(config.appwriteUrl)
    .setProject(config.appwriteProjectId);

  databases = new Databases(this.client);
  async addOrder({ userId, userName, orderItem, totalPrice }) {
    const docId = ID.unique();
    try {
      const result = await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteOrderCollectionId,
        // Generate a unique ID for the item
        docId,
        {
          userId,
          userName,
          orderItem,
          totalPrice,
        }
      );
      console.log("order added successfully:", result);

      return result;
    } catch (error) {
      console.log("addOrder error: " + error);
      throw error;
    }
  }

  async deleteOrder(id) {
    try {
      const result = await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteOrderCollectionId,
        id
      );
      console.log("order deleted successfully:", result);
      return result;
    } catch (error) {
      console.log("deleteOrder error: " + error);
      throw error;
    }
  }

  async getAllOrder() {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteOrderCollectionId // Omit the queries parameter if not needed
      );
    } catch (error) {
      console.log("Appwrite service :: GetAllOrder :: error", error);
      return false;
    }
  }
}
const orderService = new orderMethod();
export default orderService;
