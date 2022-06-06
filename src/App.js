import Register from './Component/Form/Register'
import Login from './Component/Form/Login'
import { Routes, Route } from "react-router-dom";
import Home from "./Component/home/home";
import ListCoso from './Component/List_coso/list';
import LoginNavbar from './Component/home/login_navbar';
import AccountInfo from './Component/Account/accountInfo';
import AccountManagement from './Component/Account/accountManagement';
import Consider from './Component/Consider/consider';
import Certificate from './Component/Certificate/certificate';
import Statistical from './Component/Consider/statistical';
import Suggestion from './Component/Consider/suggestion';
import Example from './Component/Consider/example'

function App() {
 
    return (
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/coso" element={<ListCoso/>} />
          <Route path="/accountInfo" element={<AccountInfo/>} />
          <Route path="/accountManagement" element={<AccountManagement/>} />
          <Route path="/kehoach" element={<Consider/>} />
          <Route path="/certificate" element={<Certificate/>} />
          <Route path="/statistical" element={<Statistical/>} />
          <Route path="/suggestion" element={<Suggestion/>} />
          <Route path="/ex" element={<Example/>} />
        </Routes>
      </>
    );
}

export default App;
