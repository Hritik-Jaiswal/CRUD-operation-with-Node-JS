import { BrowserRouter, Routes, Route } from "react-router-dom";

// import { Navbar } from "./components";
import { Home, Add, Update } from "./pages";
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home/> }/>
          <Route path="/add" element={ <Add/> }/>
          <Route path="/update/:id" element={ <Update/> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
