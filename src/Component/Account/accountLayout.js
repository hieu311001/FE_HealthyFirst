import React from 'react';
import { Link } from "react-router-dom";
import './account.css'

function AccountLayout() {

    return (
        <>   
            <div className="layout border">
                <button type="button" class="btn btn-primary"><Link className="link" to='/accountInfo'>Thông tin tài khoản</Link></button>
                <div className="dropdown-divider"></div>
                <button type="button" class="btn btn-primary"><Link className="link" to='/accountManagement'>Quản lý tài khoản</Link></button>
            </div>
            
        </>
    )
}

export default AccountLayout;