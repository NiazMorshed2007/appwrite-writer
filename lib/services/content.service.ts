import api from "@/appwrite/appwrite";

const contentCollectionId =
  process.env.NEXT_PUBLIC_APPWRITE_CONTENT_COLLECTION_ID;

export const getContent = async (docId: string) => {
  return await api.getDocument(contentCollectionId, docId);
};

export const updateContent = async (docId: string, data: Object) => {
  return await api.updateDocument(contentCollectionId, docId, data);
};
