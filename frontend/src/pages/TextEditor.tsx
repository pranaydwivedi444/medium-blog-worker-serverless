import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Button from "../components/UI/Button";
import Checkbox from "../components/UI/Checkbox";
import { backendUrl, editorConfig } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TextEditor() {
  const editorRef = useRef(null);
  const [isChecked, setIsChecked] = useState(false);
  const [inputArticleTitle,setInputArticleTitle] = useState("");
  const navigate = useNavigate();
  const postRequest = async () => {
    if (editorRef.current) {
      //axios api call post
      try {
        const id = await axios.post(`${backendUrl}/blogs`, {
          title: inputArticleTitle,
          //@ts-ignore
          content: editorRef.current.getContent(),
          published: isChecked,
        });
        setTimeout(() => {
            navigate(`/blog/${id}`);
        }, 3*1000);

      } catch (error) {
        console.error(error);
      }
    }
  };

  function checkboxHandler(checked: boolean) {
    setIsChecked(checked);
  }

  return (
    <div className="flex flex-col justify-center items-center p-8">
      <div className="mb-6 w-2/3  ">
        <input
          type="text"
          required
          onChange={(e) => setInputArticleTitle(e.target.value)}
          value={inputArticleTitle}
          placeholder="Enter Title Here"
          id="title-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  w-full "
        />
      </div>
      <Editor
        apiKey={import.meta.env.VITE_tinyMCE_API_KEY}
        //@ts-ignore
        onInit={(_evt, editor) => (editorRef.current = editor)}
        init={editorConfig}
      />
      <Checkbox label="Publish" onChange={checkboxHandler} />
      <Button classname="max-w-32" onClickHandler={postRequest} type="button">
        {isChecked ? "Publish" : "Save"}
      </Button>
    </div>
  );
}

export default TextEditor;
