import Register from './Component/Form/Register'
import Login from './Component/Form/Login'
import { Routes, Route } from "react-router-dom";
import Home from "./Component/home/home";
import HomeAccount from './Component/home/home_account';
import List_coso from './Component/List_coso/list';

function App() {
 
    return (
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/home" element={<HomeAccount />} />
          <Route path="/coso" element={<List_coso/>} />
        </Routes>
      </>
    );
}

export default App;
