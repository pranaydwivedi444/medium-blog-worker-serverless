function Quote() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-200 items-center justify-center">
      <div className="max-w-md">
        <div className="  font-bold racking-wide text-3xl text-pretty p-4">
          "Most people are other people. Their thoughts are someone else's
          opinions, their lives a mimicry, their passions a quotation."
        </div>
        <div className=" px-4 font-serif ">
          <div className="text-left  font-semibold text-lg ">Oscar Wilde</div>
          <div className="text-left text-sm font-light  text-gray-700 ">De Profundis </div>
        </div>
      </div>
    </div>
  );
}

export default Quote;
