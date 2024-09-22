
import { useParams } from "react-router-dom";

import MainBlog from "../components/UI/MainBlog";
import Skeleton from "../components/UI/Skeleton";
import AuthorProfileSideComponent from "../components/UI/AuthorProfileSideComponent";

import useFetchBlogs from "../components/hooks/useFetchBlogs";
import AlertComponent from "../components/UI/AlertComponent";
import ModalComponent from "../components/UI/ModalComponent";

function Blog() {
  const { id } = useParams();
  const { loading, showError, articlesData } = useFetchBlogs(
    `blogs/${id}`,
    false
  );

  if (loading) {
    return <Skeleton />;
  }
  if (showError) {
    return (
      <AlertComponent
        postivetype={false}
        alertMessageDescription="API Loading Error"
        alertMessageTitle="Api Error"
      />
    );
  }
  return (
    <>
      <div className="grid  md:grid-cols-12">
        <div className="col-span-9">
          {" "}
          {
            //@ts-ignore
            <MainBlog  content={articlesData.posts.content}  title={articlesData.posts.title}  date={articlesData.posts.createdAt}
            />
          }
         { //@ts-ignore
          <ModalComponent content={articlesData.posts.content}/>}
        </div>
        <div className="col-span-3 invisible lg:visible">
          {" "}
          <AuthorProfileSideComponent />
        </div>
      </div>
    </>
  );
}

export default Blog;
