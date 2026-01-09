import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// Import model-viewer để đảm bảo nó được load
import "@google/model-viewer";

createRoot(document.getElementById("root")!).render(<App />);
