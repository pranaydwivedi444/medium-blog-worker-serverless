import axios from "axios";
import React, { useState } from "react";
import { geminiAPI, summaryPrompt } from "../../config";

type AIModalType = {
  show?: boolean;
  content: string;
};
function ModalComponent({
  show = false,
  content = " Welcome to my blogs",
}: AIModalType) {
  const [showModal, SetShowModal] = useState(show);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  async function fetchSummary() {
    setLoading(true);
    const contentPrompt = {
      contents: [{ parts: [{ text: `${summaryPrompt} : ${content}` }] }],
    };
    axios
      .post(
        `${geminiAPI}?key=${import.meta.env.VITE_Gemini_API_KEY}`,
        contentPrompt
      )
      .then((response) => {
        // Update state with fetched summary
        const summaryText =
          response.data?.candidates[0]?.content?.parts[0]?.text;
        // setSummary(response.data);
        setSummary(summaryText);
        setLoading(false);
        SetShowModal(true);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setSummary("Sorry AI Crashed Down <<< ROBOTS AT WORK");
        SetShowModal(true);
      });
  }

  const svgSummaryIcon = !loading ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className="size-10"
    >
      <circle
        cx="32"
        cy="32"
        r="30"
        fill="#ffffff"
        stroke="#4a4a4a"
        strokeWidth="4"
      />
      <g fill="none" stroke="#4a4a4a" strokeWidth="4" strokeLinecap="round">
        <line x1="20" y1="24" x2="44" y2="24" />
        <line x1="20" y1="32" x2="44" y2="32" />
        <line x1="20" y1="40" x2="44" y2="40" />
      </g>
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      className="size-10"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="#999"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="31.415, 31.415"
        transform="rotate(-90 25 25)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );

  return (
    <>
      {showModal && (
        <div
          onClick={() => SetShowModal(false)}
          className="wd-full h-screen fixed inset-0  bg-gray-900 bg-opacity-30 backdrop-blur-sm"
        >
          <div className=" rounded-lg shadow-lg max-w-lg min-w-28 fixed top-1/2  transform -translate-x-1/2 -translate-y-1/2 left-1/2 rig  bg-gray-600">
            <div className="flex flex-col">
              <div className="font-medium   p-3 text-white text-justify">
                {summary}
              </div>
              <button
                onClick={() => SetShowModal(false)}
                className="text-gray-500 transition  hover:text-blue-50 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-8"
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
        </div>
      )}
      {!showModal && (
        <button
          className="fixed  bottom-4 m-1 p-0"
          title="Summarise with AI"
          onClick={fetchSummary}
        >
          {svgSummaryIcon}
        </button>
      )}
    </>
  );
}

export default ModalComponent;
