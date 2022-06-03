import React from "react";
import './account.css';
import AccountLayout from './accountLayout';
import LoginNavbar from '../home/login_navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function AccountInfo() {
    return (
        <>
            <LoginNavbar />
            <AccountLayout />
            <div className="container infotable">
                <div className="row">
                    <div className="col">
                        <img alt="Ảnh đại diện"></img>
                    </div>
                    <div className="col-md-8">
                        <div class="item">
                            <label for="hoten">Họ và tên:</label> <span class="thongtin">{localStorage.username}</span>
                        </div>
                        <div class="item">
                            <label for="ngaysinh">Ngày sinh:</label> <span class="thongtin">15/12/2001</span>
                        </div>
                        <div class="item">
                            <label for="diachi">Địa chỉ:</label> <span class="thongtin">ACV-DFG-dfg</span>
                        </div>
                        <div class="item">
                            <label for="sdt">Số điện thoại:</label> <span class="thongtin">0234902403</span>
                        </div>
                        <div class="item">
                            <label for="email">Email:</label> <span class="thongtin">sdfj@gsdg.c</span>
                        </div>
                        <div class="item">
                            <label for="diaphan">Địa phận quản lý:</label> <span class="thongtin">23y2ui2hu2</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AccountInfo;