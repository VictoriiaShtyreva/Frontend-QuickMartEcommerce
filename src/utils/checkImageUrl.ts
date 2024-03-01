export const checkImageUrl = (url: string) => {
  if (!url) {
    return null;
  }
  // Remove square brackets and backslashes from the start and end of the URL
  const cleanedUrl = url.replace(/[\[\]\\]+/g, "");
  //Check if the URL starts with 'https'
  if (cleanedUrl.slice(0, 5) === "https") {
    return cleanedUrl;
  }

  return null;
};
