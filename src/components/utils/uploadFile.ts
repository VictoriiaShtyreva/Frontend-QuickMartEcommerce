import axios, { AxiosError } from "axios";
import { UploadFile } from "../../misc/types/File";

const uploadFile = async (fileData: { file: File }) => {
  try {
    const { data } = await axios.post<UploadFile>(
      "https://api.escuelajs.co/api/v1/files/upload",
      fileData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error) {
    return error as AxiosError;
  }
};

export default uploadFile;
