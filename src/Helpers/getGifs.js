const baseUrl = process.env.REACT_APP_URL;
const apiKey = process.env.REACT_APP_APIKEY;
const locale = "es_ES";
const perPage = 20;
const trendingPerPage = 8;
const contentFilter = "moderate";

const formatGifs = (data) => {
  if (!data) return [];
  
  let gifs = [];

  if (Array.isArray(data)) {
    gifs = data;
  } else if (data.data && data.data.data && Array.isArray(data.data.data)) {
    gifs = data.data.data;
  } else if (data.data && Array.isArray(data.data)) {
    gifs = data.data;
  } else if (Array.isArray(data.gifs)) {
    gifs = data.gifs;
  } else if (Array.isArray(data.results)) {
    gifs = data.results;
  }
  
  if (!Array.isArray(gifs) || gifs.length === 0) {
    console.warn("No gifs found in response. Data structure:", data);
    return [];
  }
  
  const formatted = gifs.map((gif) => {
    let url = "";
    if (gif.file?.hd?.gif?.url) {
      url = gif.file.hd.gif.url;
    } else if (gif.file?.md?.gif?.url) {
      url = gif.file.md.gif.url;
    } else if (gif.file?.sm?.gif?.url) {
      url = gif.file.sm.gif.url;
    } else if (gif.url) {
      url = gif.url;
    } else if (gif.image_url) {
      url = gif.image_url;
    }
    
    return {
      id: gif.id,
      title: gif.title || gif.name || gif.category || "",
      url: url,
      description: gif.caption || gif.description || "",
    };
  });
  
  return formatted;
};

const fetchOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  mode: "cors",
  credentials: "omit",
};

const makeFetch = async (url, signal) => {
  const options = { ...fetchOptions };
  if (signal) {
    options.signal = signal;
  }
  return fetch(url, options);
};

export const getTrendingGifs = async (page = 1, signal = null) => {
  try {
    const url = `${baseUrl}/api/v1/${apiKey}/gifs/trending?page=${page}&per_page=${trendingPerPage}&locale=${locale}`;
    const res = await makeFetch(url, signal);
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    const images = formatGifs(data);
    const hasNext = data?.data?.has_next || false;
    
    return { images, hasNext };
  } catch (error) {
    if (error.name === "AbortError") {
      return { images: [], hasNext: false };
    }
    console.error("Error fetching trending gifs:", error);
    return { images: [], hasNext: false };
  }
};

export const getSearchGifs = async (query, page = 1, signal = null) => {
  try {
    const url = `${baseUrl}/api/v1/${apiKey}/gifs/search?page=${page}&per_page=${perPage}&q=${encodeURIComponent(query)}&locale=${locale}&content_filter=${contentFilter}`;
    const res = await makeFetch(url, signal);
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    const images = formatGifs(data);
    const hasNext = data?.data?.has_next || false;
    
    return { images, hasNext };
  } catch (error) {
    if (error.name === "AbortError") {
      return { images: [], hasNext: false };
    }
    console.error("Error searching gifs:", error);
    return { images: [], hasNext: false };
  }
};

export const getCategories = async () => {
  try {
    const url = `${baseUrl}/api/v1/${apiKey}/gifs/categories?locale=${locale}`;
    
    const res = await fetch(url);
    
    if (!res.ok) {
      console.error("Categories API responded with status:", res.status);
      return [];
    }
    
    const data = await res.json();
    
    if (data.data && Array.isArray(data.data.categories)) {
      return data.data.categories;
    }
    
    console.warn("Could not extract categories array from response.");
    return [];
  } catch (error) {
  
    return [];
  }
};
