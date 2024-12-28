import { Client, Databases, ID, Storage } from "appwrite";
import config from "../main_config";

export class DataBaseService {
  client = new Client()
    .setEndpoint(config.appwriteUrl)
    .setProject(config.appwriteProjectId);

  databases = new Databases(this.client);
  bucket = new Storage(this.client);

  async addItem({ name, quantity, itemImage, itemId, price }) {
    quantity = parseInt(quantity);
    price = parseInt(price);

    try {
      const result = await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteItemCollectionId,
        ID.unique(), // Generate a unique ID for the item
        {
          name,
          quantity,
          itemImage,
          itemId,
          price,
        }
      );
      console.log("Item added successfully:", result);
      return result;
    } catch (error) {
      console.log("addItem error: " + error);
      throw error; // Rethrow error to be handled by the caller
    }
  }

  async updateItem(id, { name, quantity, itemImage, itemId, price }) {
    quantity = parseInt(quantity);
    price = parseInt(price);
    try {
      const result = await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteItemCollectionId,
        id,
        {
          name,
          quantity,
          itemImage,
          itemId,
          price,
        }
      );
      console.log("Item updated successfully:", result);
      return result;
    } catch (error) {
      console.log("updateItem error: " + error);
      throw error;
    }
  }

  async deleteItem(itemId) {
    try {
      const result = await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteItemCollectionId,
        itemId
      );
      console.log("Item deleted successfully:", result);
      return result;
    } catch (error) {
      console.log("deleteItem error: " + error);
      throw error;
    }
  }

  async getItem($id) {
    console.log($id);
    try {
      const result = await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteItemCollectionId,
        $id
      );
      return result;
    } catch (error) {
      console.log("getItem error: " + error);
      throw error;
    }
  }

  async getAllItems() {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteItemCollectionId // Omit the queries parameter if not needed
      );
    } catch (error) {
      console.log("Appwrite service :: GetPosts :: error", error);
      return false;
    }
  }

  async uploadFile(file) {
    console.log("file", file);
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
    }
  }
  async deleteFile(name) {
    const newName = name.replace(/[^a-zA-Z0-9]/g, "_");
    console.log("it is item image " + newName);
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, newName);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
    } catch (error) {
      throw error;
      return false;
    }
  }
}

const service = new DataBaseService();
export default service;
