import uploadFile from "./uploadFile";

const uploadFilesService = async (images: { file: File }[]) => {
  try {
    const fileData = Promise.all(
      images.map(async (file) => {
        const fileResponse = await uploadFile(file);
        if ("location" in fileResponse) {
          return fileResponse.location;
        } else {
          throw fileResponse;
        }
      })
    );
    return fileData;
  } catch (error) {
    return [error];
  }
};

export default uploadFilesService;
