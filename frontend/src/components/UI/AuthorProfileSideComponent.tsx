interface AuthorDetails  {
  authorName?: string;
  authorDescription?: string; 
  id?:'string', // Optional prop with default value
}

function AuthorProfileSideComponent({}: AuthorDetails) {
  return (
    <div className=" h-screen bg-gray-200 flex w-full flex-col p-4">
      <div>Author </div>
      <div className="flex w-full items-center ">
        <div className=" shrink-0 w-16 p-1">
          <img src="https://placehold.co/100X100 " className="max-w-full rounded-full"  alt=""/>
        </div>
        <div className="p-2 max-w-md">
          <h3 className="text-lg font-bold">Makr Zucker-burger</h3>
          <p className="text-gray-500">
            Master of mirth, purveyor of puns, and the funniest person in the
            kingdom.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthorProfileSideComponent;
