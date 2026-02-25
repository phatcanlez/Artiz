import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@fontsource/hubot-sans/400.css";
import "@fontsource/hubot-sans/500.css";
import "@fontsource/hubot-sans/600.css";
import "@fontsource/hubot-sans/700.css";
import "./index.css";
// Import model-viewer để đảm bảo nó được load
import "@google/model-viewer";

createRoot(document.getElementById("root")!).render(<App />);
