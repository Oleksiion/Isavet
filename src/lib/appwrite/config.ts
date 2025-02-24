import { Client, Account, Databases, Storage, Avatars } from "appwrite";

//создаем переменные для использования их при создании Client
export const appwriteConfigObj = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  url: import.meta.env.VITE_APPWRITE_URL,
};

export const client = new Client()
  .setEndpoint(appwriteConfigObj.url)
  .setProject(appwriteConfigObj.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
