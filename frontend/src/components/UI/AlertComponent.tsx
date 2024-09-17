import  { useEffect, useState } from "react";

interface AlertComponent {
  alertMessageTitle: string;
  alertMessageDescription: string;
  timeout?: boolean; // default to false
  onClose?: () => void; // default to null
  postivetype?: boolean; // type can be either "positive" or "negative"
}

const AlertComponent = ({
  alertMessageTitle,
  alertMessageDescription,
  timeout = true,
  onClose = ()=>{},
  postivetype = true,
}: AlertComponent) => {
  const [showAlert, setShowAlert] = useState(true);
  useEffect(() => {
    if (timeout) {
      setTimeout(() => {
        setShowAlert(false);
      }, 1000 * 3);
      if (onClose){
        onClose();
      }
    }
  }, []);
  function closePopup(){
    setShowAlert(false);
  }
  return (
    <>
      {showAlert && (
        <div
          role="alert"
          className="rounded-xl border border-gray-100 bg-white  p-4 fixed bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 sm:w-96 z-50 flex items-start justify-center gap-4 shadow-lg"
        >
          <div className="flex items-start gap-4  overflow-y-auto">
            {postivetype && (
              <span className="text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            )}
            <div className="flex-1 ">
              <strong
                className={`block font-medium  text-wrap ${
                  postivetype ? "text-green-900" : "text-red-900"
                }`}
              >
                {alertMessageTitle}
              </strong>
              <p
                className={`mt-1 text-sm  text-wrap ${
                  postivetype ? "text-green-700" : "text-red-700"
                }`}
              >
                {alertMessageDescription}
              </p>
            </div>

            <button
              onClick={closePopup}
              className="text-gray-500 transition  hover:text-gray-600 "
            >
              <span className="sr-only">Dismiss </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AlertComponent;
