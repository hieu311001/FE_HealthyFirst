import React from 'react';
import { Link } from "react-router-dom";
import './account.css';

function AccountLayout() {
    const accountManageAlert = () => {
        if (localStorage.getItem("role") !== "Quản lý") {
            alert("Bạn cần có chức vụ quản lý để sử dụng chức năng này!!!");
            window.location = '/accountInfo';
        }
    }

    return (
        <>   
            <div className="layout border">
                <Link className="link" to='/accountInfo'><button type="button" class="btn btn-primary btn-lg">Thông tin tài khoản</button></Link>
                <Link className="link" to='/accountManagement' id="accountManagement" onClick={accountManageAlert}><button type="button" class="btn btn-primary btn-lg">Quản lý tài khoản</button></Link>
                <div className="dropdown-divider"></div>
            </div>
            
        </>
    )
}

export default AccountLayout;