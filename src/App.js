import "./App.css";
import "./assets/css/document.css";
// import Content from "./layout/content";
import LandingContent from "./layout/landing_content";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Content /> */}
      <BrowserRouter>
        <LandingContent />
      </BrowserRouter>
    </div>
  );
}

export default App;
