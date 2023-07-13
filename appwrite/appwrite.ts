import { RegisterInterface } from "@/lib/services/auth.service";
import {
  Account,
  Client as Appwrite,
  Databases,
  ID,
  Query,
  Storage,
} from "appwrite";

const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;

let api: any = {
  sdk: null,

  provider: () => {
    if (api.sdk) {
      return api.sdk;
    }
    let appwrite = new Appwrite();
    appwrite
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
    const account = new Account(appwrite);
    const database = new Databases(appwrite);
    const storage = new Storage(appwrite);

    api.sdk = { database, account, storage };
    return api.sdk;
  },

  getAccount: () => {
    let account = api.provider().account;
    return account.get();
  },

  createAccount: (registerBody: RegisterInterface) => {
    return api
      .provider()
      .account.create(
        ID.unique(),
        registerBody.email,
        registerBody.password,
        registerBody.name
      );
  },

  createSession: (loginBody: any) => {
    return api
      .provider()
      .account.createEmailSession(loginBody.email, loginBody.password);
  },

  deleteCurrentSession: () => {
    return api.provider().account.deleteSession("current");
  },

  createDocument: (collectionId: string, data: JSON, permissions: any) => {
    return api
      .provider()
      .database.createDocument(
        databaseId,
        collectionId,
        "unique()",
        data,
        permissions
      );
  },

  getDocument: (collectionId: string, documentId: string, queries: any) => {
    return api
      .provider()
      .database.getDocument(databaseId, collectionId, documentId, queries);
  },

  updateDocument: (collectionId: string, documentId: string, data: JSON) => {
    return api
      .provider()
      .database.updateDocument(databaseId, collectionId, documentId, data);
  },

  createFile: (bucketId: string, file: any) => {
    return api.provider().storage.createFile(bucketId, ID.unique(), file);
  },
};

export default api;
