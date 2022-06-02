import React from "react";
import AccountLayout from './accountLayout';
import LoginNavbar from '../home/login_navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function AccountManagement() {
    return (
        <>  
            <LoginNavbar />
            <div className="container">
                <div className="row">
                    <div className="col">
                        <AccountLayout />
                    </div>
                    <div className="col-md-9">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Tên đăng nhập</th>
                                    <th scope="col">Chủ sở hữu</th>
                                    <th scope="col">SĐT</th>
                                    <th scope="col">Địa phận quản lý</th>
                                    <th scope="col">Số giấy Chứng Nhận</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Apollo</td>
                                    <td>Vũ Minh Hiếu</td>
                                    <td>0363202943</td>
                                    <td>ngõ 58 Nguyễn Đổng Chi, phường Cầu Diễn, quận Nam Từ Liêm, Hà Nội</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AccountManagement;