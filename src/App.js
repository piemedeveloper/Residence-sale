import "./App.css";
import "./assets/css/document.css";
import Content from "./layout/content";
// import Content from "./layout/content";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Content /> */}
      <BrowserRouter>
        <Content />
      </BrowserRouter>
    </div>
  );
}

export default App;
