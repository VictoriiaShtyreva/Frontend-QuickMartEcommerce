export const checkImageUrl = (url: string, svgUrl: string) => {
  if (!url) {
    return svgUrl;
  }
  if (url === '["https://placeimg.com/640/480/any"]') {
    return svgUrl;
  }
  // Remove square brackets and backslashes from the start and end of the URL
  if (url.slice(0, 2) === '["' && url.slice(-2) === '"]') {
    url = url.slice(2, -2);
    return url;
  } else if (url.slice(0, 2) === '["' && url.slice(-1) === '"') {
    url = url.slice(2, -1);
    return url;
  } else {
    return svgUrl;
  }
};
