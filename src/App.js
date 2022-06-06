import Login from './Component/Form/Login'
import { Routes, Route } from "react-router-dom";
import Home from "./Component/home/home";
import ListCoso from './Component/List_Facility/list';
import LoginNavbar from './Component/home/login_navbar';
import AccountInfo from './Component/Account/accountInfo';
import AccountManagement from './Component/Account/accountManagement';
import Consider from './Component/Consider/consider';
import Certificate from './Component/Certificate/certificate';
import Statistical from './Component/Consider/statistical';
import Suggestion from './Component/Consider/suggestion';

function App() {
 
    return (
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/coso" element={<ListCoso/>} />
          <Route path="/accountInfo" element={<AccountInfo/>} />
          <Route path="/accountManagement" element={<AccountManagement/>} />
          <Route path="/kehoach" element={<Consider/>} />
          <Route path="/certificate" element={<Certificate/>} />
          <Route path="/statistical" element={<Statistical/>} />
          <Route path="/suggestion" element={<Suggestion/>} />
        </Routes>
      </>
    );
}

export default App;
