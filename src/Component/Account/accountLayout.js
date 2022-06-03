import React from 'react';
import { Link } from "react-router-dom";
import './account.css'

function AccountLayout() {

    return (
        <>   
            <div style={{display: "flex"}}>
                <button><Link className="link" to='/accountInfo'>Thông tin tài khoản</Link></button>
                <div className="dropdown-divider"></div>
                <button disabled={true}><Link className="link" to='/accountManagement'>Quản lý tài khoản</Link></button>
            </div>
            
        </>
    )
}

export default AccountLayout;