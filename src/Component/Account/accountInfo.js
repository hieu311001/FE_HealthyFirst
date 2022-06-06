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
                        <img alt="" src={require('./avatar.png')} width="70%" height="70%"></img>
                    </div>
                    <div className="col-md-8">
                        <div class="item">
                            <label for="hoten">Họ và tên:</label> <span class="thongtin">{localStorage.getItem("username")}</span>
                        </div>
                        <div class="item">
                            <label for="diaphan">Chức vụ:</label> <span class="thongtin">{localStorage.getItem("role")}</span>
                        </div>
                        <div class="item">
                            <label for="diaphan">Địa phận quản lý:</label> <span class="thongtin">{localStorage.getItem("area")}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AccountInfo;