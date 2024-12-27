const config = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteUserCollectionId: String(
    import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID
  ),
  appwriteOrderCollectionId: String(
    import.meta.env.VITE_APPWRITE_ORDER_COLLECTION_ID
  ),
  appwriteItemCollectionId: String(
    import.meta.env.VITE_APPWRITE_ITEM_COLLECTION_ID
  ),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default config;
