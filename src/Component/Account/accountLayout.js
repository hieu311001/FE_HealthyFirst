import React from 'react';
import { Link } from "react-router-dom";
import './account.css';

function AccountLayout() {

    return (
        <>   
            <div className="layout border">
                <Link className="link" to='/accountInfo'><button type="button" class="btn btn-primary btn-lg">Thông tin tài khoản</button></Link>
                <Link className={localStorage.getItem("role") === "Chuyên viên" ? "disabled-link" : "link"} to='/accountManagement' id="accountManagement" >
                    <button type="button" disabled={localStorage.getItem("role") === "Chuyên viên" ? true : false}class="btn btn-primary btn-lg">Quản lý tài khoản</button>
                </Link>
                <div className="dropdown-divider"></div>
            </div>
            
        </>
    )
}

export default AccountLayout;