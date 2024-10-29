import "./App.css";
import { MenuLateral } from "./components/Menu/MenuLateral";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <MenuLateral />
    </Router>
  );
}

export default App;
  