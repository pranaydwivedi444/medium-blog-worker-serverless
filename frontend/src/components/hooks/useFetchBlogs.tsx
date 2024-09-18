import axios from "axios";
import  { useEffect, useState } from "react";
import { backendUrl } from "../../config";

interface Post {
  content: string;
  title: string;
  createdAt: string;
  id: string;
}

interface BulkResponse {
  posts: Post[];
  nextId: string | null;
}

interface SinglePostResponse {
  posts: Post | null;
  nextId: null;
}

async function handleAPIBlogRequest(url: string) {
  try {
    const response = await axios.get(`${backendUrl}/${url}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

function useFetchBlogs(url: string , bulk: boolean = false) {
  const [articlesData, setArticlesData] = useState<
    BulkResponse | SinglePostResponse
  >({
    posts: null,
    nextId: null,
  });
  const [loading, setLoading] = useState(true);
  const [showError, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await handleAPIBlogRequest(url);
        if (bulk) {
        setArticlesData({
            posts: result.posts,
            nextId: result.nextId,
        });
    }
    else {
        setArticlesData({
            posts:result.post,
            nextId: null,
        });
  
    }
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { loading, showError , articlesData };
}

export default useFetchBlogs;
