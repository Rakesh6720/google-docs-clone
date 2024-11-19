import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";

export default function TextEditor() {
  const [IsEditing, SetIsEditing] = useState(false);
  const quillRef = useRef<any>(null);

  const documentRef = doc(db, "documents", "sample-doc");

  const saveContent = () => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const content = editor.getContents();
      console.log("Saving content to db: ", content);

      setDoc(documentRef, { content: content.ops }, { merge: true })
        .then(() => console.log("Content saved"))
        .catch((error) => console.error("Error saving content: ", error));
    }
  };

  useEffect(() => {
    if (quillRef.current) {
      // load initial content from firestore db
      // listen to firestore for any updates and update locally in real-time
      // listen for local text changes and save it to firestore

      const editor = quillRef.current.getEditor();
      editor.on("text-change", () => {
        SetIsEditing(true);
        saveContent();

        setTimeout(() => SetIsEditing(false), 5000);
      });
    }
  }, []);
  return (
    <div className="google-docs-editor">
      <ReactQuill ref={quillRef} />
    </div>
  );
}
