import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import AccountLayout from './accountLayout';
import LoginNavbar from '../home/login_navbar';
import './account.css';


function AccountInfo() {
    return (
        <>
            <LoginNavbar />
            <AccountLayout />
            <div className="container infotable">
                <div className="row">
                    <div className="col">
                        <img alt="" src={require('./avatar.png')} width="100%" height="100%"></img>
                    </div>
                    <div className="col-md-8 mt-4 ml-4">
                        <div class="item my-2">
                            <label class="w-25" for="hoten">Họ và tên:</label> <span class="thongtin">{localStorage.getItem("username")}</span>
                        </div>
                        <div class="item my-2">
                            <label  class="w-25" for="diaphan">Chức vụ:</label> <span class="thongtin">{localStorage.getItem("role")}</span>
                        </div>
                        <div class="item my-2">
                            <label  class="w-25" for="diaphan">Địa phận quản lý:</label> <span class="thongtin">{localStorage.getItem("area")}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AccountInfo;