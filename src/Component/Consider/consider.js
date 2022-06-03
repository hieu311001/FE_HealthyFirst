import React from "react";
import LoginNavbar from '../home/login_navbar';
import './consider.css';

function Consider() {
    return (
        <>
            <LoginNavbar />
            <div className="search border">
                <h4 class="mr-4"><span>Lọc Theo:</span></h4>
                <select class="form-select col-md-8" aria-label="Default select example">
                    <option value="1">Chưa được cấp phép</option>
                    <option value="2">Đã được cấp phép</option>
                    <option value="3">Đã bị thu hồi</option>
                </select>
                <button type="button" class="btn btn-primary"><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
        </>
    )
}

export default Consider;