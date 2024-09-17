import React from 'react'

type BlogProps = {
    content: string;
    title : string;
    date : string;
}
function MainBlog({content,title,date}:BlogProps) {
  return (
    <div className="flex flex-col items-center  p-4">
      <div className="font-black text-6xl text- w-full max-w-5xl text-left px-4 py-2">
        {title}
      </div>
      <div className="text-left w-full max-w-5xl mt-2 px-4 text-base font-medium text-gray-600">
        Posted on {date}
      </div>
      <div className="w-full  text-base max-w-5xl px-4 mt-6 font-normal">
        <p>
          {content}
        </p>
      </div>
    </div>
  );
}

export default MainBlog
