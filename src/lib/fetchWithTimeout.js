export const fetchWithTimeout = async (url, options = {}, timeout = 10000, retries = 3) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
  
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(id);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      if (retries > 0 && error.name !== 'AbortError') {
        console.warn(`Retrying fetch... (${retries} attempts left)`);
        return fetchWithTimeout(url, options, timeout, retries - 1);
      }
      throw error;
    }
  };