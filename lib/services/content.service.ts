import api from "@/appwrite/appwrite";
import { Query } from "appwrite";
import { userId } from "../localStorage";

const contentCollectionId =
  process.env.NEXT_PUBLIC_APPWRITE_CONTENT_COLLECTION_ID;

export const getContent = async () => {
  return await api.getDocuments(contentCollectionId, [
    Query.equal("userId", userId()),
  ]);
};

export const createContent = async (data: {
  userId: string;
  content?: string;
}) => {
  return await api.createDocument(contentCollectionId, data);
};

export const updateContent = async (docId: string, data: Object) => {
  return await api.updateDocument(contentCollectionId, docId, data);
};
