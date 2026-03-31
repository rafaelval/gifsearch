import { useEffect, useState } from "react";
import { getTrendingGifs, getSearchGifs } from "../Helpers/getGifs";

function useFetchGifs(searchQuery = null) {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const getImages = async () => {
      setIsLoading(true);
      let result = { images: [], hasNext: false };
      
      try {
        if (searchQuery && searchQuery.toLowerCase() !== "trending") {
          result = await getSearchGifs(searchQuery, page, controller.signal);
        } else {
          result = await getTrendingGifs(page, controller.signal);
        }
        
        if (!controller.signal.aborted) {
          setImages(result.images || []);
          setHasNextPage(result.hasNext || false);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error in useFetchGifs:", error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    getImages();

    return () => {
      controller.abort();
    };
  }, [searchQuery, page]);

  return {
    images,
    isLoading,
    page,
    setPage,
    hasNextPage,
  };
}

export default useFetchGifs;
