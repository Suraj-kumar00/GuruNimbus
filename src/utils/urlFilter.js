export function isValidUrl(url) {
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname !== 'www.ratemyprofessors.com') {
        return false;
      }
      const pathRegex = /^\/professor\/\d+$/; // Regular expression to match the format `/professor/[some number]`
      if (!pathRegex.test(parsedUrl.pathname)) {
        return false;
      }
      return true;
    } catch (error) {
      return false; // Invalid URL
    }
  }