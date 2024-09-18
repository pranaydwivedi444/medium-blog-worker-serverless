import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { backendUrl } from "../config";
import axios from "axios";
import MainBlog from "../components/UI/MainBlog";
import Skeleton from "../components/UI/Skeleton";
import AuthorProfileSideComponent from "../components/UI/AuthorProfileSideComponent";

function Blog() {
  const { id } = useParams();
  const [blogContent, setBlogContent] = useState({
    title: "",
    content: "",
    author: "",
    createdAt: "",
    loading: true,
  });
  async function fetchBlogData() {
    try {
      const response = await axios.get(`${backendUrl}/blogs/${id}`, {
        withCredentials: true,
      });
      console.log(response.data.post);
      const post = response.data.post;
      setBlogContent({
        title: post.title,
        content: post.content,
        author: post.author,
        createdAt: new Date(post.createdAt).toLocaleDateString("en-GB"),
        loading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }
  // Fetch blog data based on id

  useEffect(() => {
    console.log(id);
    try {
      fetchBlogData();
    } catch (error) {
      console.error(error);
    }
  }, []);

  if (blogContent.loading) {
    return <Skeleton />;
  }
  return (
    <>
      <div className="grid  md:grid-cols-12">
        <div className="col-span-9">
          {" "}
          <MainBlog
            content={blogContent.content}
            title={blogContent.title}
            date={blogContent.createdAt}
          />
        </div>
        <div className="col-span-3 invisible md:visible">
          {" "}
          <AuthorProfileSideComponent />
        </div>
      </div>
    </>
  );
}

export default Blog;
