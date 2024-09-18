import { useNavigate } from "react-router-dom";

type ArticleCard = {
  imgSrc?: string;
  description: string;
  title: string;
  authorName:string;
  datePosted: string;  
  id:string;
};
function ArticleCard({imgSrc = "", description, title , authorName ,datePosted ,id}: ArticleCard) {
    const navigate = useNavigate();

  // Navigate to the article page when the card is clicked.
  function onClickHandler() {
   return navigate(`/blog/${id}`);
  }
  return (
    // <div className="bg-gray-100 px-2 py-10">
    <article className="mx-auto my-10 flex max-w-md flex-col rounded-2xl bg-white px-4 shadow md:max-w-5xl md:flex-row md:items-center cursor-pointer" onClick={onClickHandler}>
      {imgSrc && (
        <div className="shrink-0 my-4 md:mr-8 md:max-w-sm">
          <img className="rounded-2xl" src={imgSrc} alt="" />
        </div>
      )}
      <div className="py-4 sm:py-8">
        <a href="#" className="mb-6 block text-2xl font-medium text-gray-700">
          {title}
        </a>
        <p className="mb-6 text-gray-500">
          {description}
        </p>
        <div className="flex items-center">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://placehold.co/100X100"
            alt={authorName}
          />
          <p className="ml-4 w-56">
            <strong className="block font-medium text-gray-700">
              {authorName}
            </strong>
            <span className="text-sm text-gray-400">{datePosted}</span>
          </p>
        </div>
      </div>
    </article>
    // </div>
  );
}

export default ArticleCard
