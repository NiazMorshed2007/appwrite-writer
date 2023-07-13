import api from "@/appwrite/appwrite";

const bucketId: string = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID;

export const uploadFile = async (file: File) => {
  return await api.createFile(bucketId, file);
};
