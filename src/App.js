import Register from './Component/Form/Register'
import Login from './Component/Form/Login'
import { Routes, Route } from "react-router-dom";
import Home from "./Component/home/home";

function App() {
    return (
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </>
    );
}

export default App;
