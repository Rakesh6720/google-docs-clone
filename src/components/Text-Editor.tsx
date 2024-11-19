import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import "react-quill/dist/quill.snow.css";
import "../App.css";

export default function TextEditor() {
  const [IsEditing, SetIsEditing] = useState(false);

  const isLocalChange = useRef(false);

  const quillRef = useRef<any>(null);

  const documentRef = doc(db, "documents", "sample-doc");

  const saveContent = () => {
    if (quillRef.current && isLocalChange.current) {
      const editor = quillRef.current.getEditor();
      const content = editor.getContents();
      console.log("Saving content to db: ", content);

      setDoc(documentRef, { content: content.ops }, { merge: true })
        .then(() => console.log("Content saved"))
        .catch((error) => console.error("Error saving content: ", error));

      isLocalChange.current = false;
    }
  };

  useEffect(() => {
    if (quillRef.current) {
      // load initial content from firestore db
      getDoc(documentRef)
        .then((doc) => {
          if (doc.exists()) {
            const data = doc.data();
            if (data) {
              const editor = quillRef.current.getEditor();
              editor.setContents(data.content);
            }
          } else {
            console.log("No doc found, starting with any empty editor");
          }
        })
        .catch((error) => console.error("Error getting document:", error));
      // listen to firestore for any updates and update locally in real-time
      // listen for local text changes and save it to firestore

      const editor = quillRef.current.getEditor();
      editor.on("text-change", (delta: any, oldDelta: any, source: any) => {
        if (source === "user") {
          isLocalChange.current = true;
          SetIsEditing(true);
          saveContent();

          setTimeout(() => SetIsEditing(false), 5000);
        }
      });
    }
  }, []);
  return (
    <div className="google-docs-editor">
      <ReactQuill ref={quillRef} />
    </div>
  );
}
