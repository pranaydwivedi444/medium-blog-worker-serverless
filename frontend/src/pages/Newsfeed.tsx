import ArticleCard from "../components/UI/ArticleCard";

import Skeleton from "../components/UI/Skeleton";
import AlertComponent from "../components/UI/AlertComponent";
import { DateModifier } from "../helperFunctions/helper";

import useFetchPostsWithLoad from "../components/hooks/useFetchPostsWithLoad";

function Newsfeed() {
  const { loading, showError, articlesData } = useFetchPostsWithLoad( );
  if (loading) {
    return <Skeleton />;
  }
  return (
    <>
      {showError && (
        <AlertComponent
          postivetype={false}
          alertMessageDescription="API Loading Error"
          alertMessageTitle="Api Error"
        />
      )}
      <div className="bg-gray-100 px-2 py-10">
        {
          // @ts-ignore
          articlesData?.posts &&  articlesData?.posts?.map((el, i) => {
              return (
                <ArticleCard
                  key={el.id}
                  description={el.content}
                  imgSrc="https://placehold.co/600x400/EEE/31343C"
                  title={el.title}
                  authorName={"unknown"}
                  datePosted={DateModifier(el.createdAt)}
                  id={el.id}
                />
              );
            })
        }
      </div>
    </>
  );
}

export default Newsfeed;
