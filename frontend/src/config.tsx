// export const backendUrl = "https://backend.pranaydwivedi444.workers.dev/api/v1";
export const backendUrl = "http://127.0.0.1:8787/api/v1";
export const navbarConfig = {
  logoSrc:
    "https://upload.wikimedia.org/wikipedia/commons/0/0d/Medium_%28website%29_logo.svg",
  logoAlt: "Logo",
  menuItems: [
    { href: "/blog/all", label: "Newsfeed" },
    { href: "/signup", label: "Signup" },
    { href: "/signin", label: "Signin" },
    { href: "/blog/create", label: "📝" },
  ],
  profileImgSrc: "https://placehold.co/100X100",
  profileName: "Pranay Dwivedi",
};

export const editorConfig = {
  height: 500,
  width: 900,
  menubar: false,
  content_css: "writer",
  statusbar: false,
  plugins: [
    "advlist",
    "autolink",
    "lists",
    "link",
    "image",
    "charmap",
    "preview",
    "anchor",
    "searchreplace",
    "visualblocks",
    "code",
    "fullscreen",
    "insertdatetime",
    "table",
    "code",
    "help",
    "wordcount",
  ],
  toolbar:
    "undo redo | blocks fontfamily fontsize | " +
    "bold italic forecolor | alignleft aligncenter " +
    "alignright alignjustify | bullist numlist  | " +
    "removeformat blockquote ",
  content_style:
    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px ; padding:4px; margin:2px; }",
};