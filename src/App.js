import Register from './Component/Form/Register'
import Login from './Component/Form/Login'
import { Routes, Route } from "react-router-dom";
import Home from "./Component/home/home";
import HomeAccount from './Component/home/home_account';

function App() {
 
    return (
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/home" element={<HomeAccount />} />
        </Routes>
      </>
    );
}

export default App;
