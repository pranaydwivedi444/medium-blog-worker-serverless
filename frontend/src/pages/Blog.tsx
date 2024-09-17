import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { backendUrl } from "../config";
import axios from "axios";

function Blog() {
  const { id } = useParams();
  async function fetchBlogData () {
    try {
       const response = await axios.get(`${backendUrl}/blogs/${id}`,{
        withCredentials: true
       });
       console.log(response.data);
    } catch (error) {
      
    }
   
  }
  // Fetch blog data based on id

  useEffect( () => {
    console.log(id);
    try {
      fetchBlogData();
    } catch (error) {
      console.error(error);
    }
  },[]);

  return <div>Blogs</div>;
}

export default Blog;
