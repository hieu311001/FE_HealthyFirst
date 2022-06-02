import React from 'react';
import { Link } from "react-router-dom";

function AccountLayout() {
    return (
        <>
            <Link className="link" to='/accountInfo'>Thông tin tài khoản</Link> <br></br>
            <div className="dropdown-divider"></div>
            <Link className="link" to='/accountManagement'>Quản lý tài khoản</Link> <br></br>
        </>
    )
}

export default AccountLayout;