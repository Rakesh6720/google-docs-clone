import { useEffect } from "react";
import "./App.css";
import { auth } from "./firebase-config";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";

function App() {
  useEffect(() => {
    signInAnonymously(auth)
      .then(() => {
        console.log("Signed in anonymously");
      })
      .catch((error) => {
        console.error("Error signing in anonymously:", error);
      });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in:", user.uid);
      } else {
        console.log("User is signed out");
      }
    });
  }, []);
  return (
    <>
      <div className="App">
        <header>
          <h1>Google Docs Clone</h1>
        </header>
      </div>
    </>
  );
}

export default App;
