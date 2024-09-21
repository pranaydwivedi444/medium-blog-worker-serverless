import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl } from "../../config";

interface Post {
  content: string;
  title: string;
  createdAt: string;
  id: string;
}

interface BulkResponse {
  posts: Post[] ;
  nextId: string | null;
}

async function handleAPIBlogRequest(nextId: string | null) {
  try {
    const response = await axios.get(`${backendUrl}/blogs/bulk?cursor=${nextId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

function useFetchPostsWithLoad() {
  const [articlesData, setArticlesData] = useState<BulkResponse>({
    posts: [],
    nextId: '',
  });
  const [loading, setLoading] = useState(true);
  const [showError, setError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

   async function fetchData() {
     if (isFetching ) return; // Avoid multiple fetches if already fetching
     setIsFetching(true); // Set fetching flag to true
     try {
       console.log("Fetching data" + articlesData.nextId);
       const result = await handleAPIBlogRequest(articlesData.nextId);
       console.log(result);
       if (articlesData.posts?.length > 0) {
         console.log("setting data while hittim bottong" + result.nextId);
         setArticlesData((prev) => ({
           posts: [...prev.posts, ...result.posts],
           nextId: result.nextId,
         }));
       } else {
         setArticlesData({
           posts: result.posts,
           nextId: result.nextId,
         });
         console.log("set data not hitting bottom  first time " + articlesData);
       }
     } catch (error) {
       console.log(error);
       setError(true);
     } finally {
       setLoading(false);
       setIsFetching(false);
     }
   }

  useEffect(() => {
   

    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      console.log("scrolling");
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        console.log("Reached bottom of the page");

        // Fetch next set of data only if articlesData.nextId exists
        if (articlesData?.nextId) {
          fetchData();
          console.log("Next ID set:", articlesData.nextId);
        }
      }
    };
   
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [articlesData.nextId,isFetching]);
  useEffect(() => {
     fetchData();
  },[])
  return { loading, showError, articlesData };
}

export default useFetchPostsWithLoad;
