import React from "react";
import LoginNavbar from '../home/login_navbar';
import { useState } from "react";
import './consider.css';

function Consider() {
    const [data, setData] = useState();
    const [status, setStatus] = useState(1);

    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        setStatus(event.target.value);
    }

    console.log(status);

    const handleSearch = () => {
        if (status == 1) {
            fetch("http://localhost:5000/listFoodCertification", {
                method: "GET",
                body: JSON.stringify(),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authentication: "Bearer " + localStorage.getItem("accessToken")
                },
            })
            .then((response) => {
                if (response.status === 401) {
                alert("Bạn không có quyền ở khu vực này");
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                setData(data);
            })
        } else {
            fetch("http://localhost:5000/listFoodNotCertification", {
                method: "GET",
                body: JSON.stringify(),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authentication: "Bearer " + localStorage.getItem("accessToken")
                },
            })
            .then((response) => {
                if (response.status === 401) {
                alert("Bạn không có quyền ở khu vực này");
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                setData(data);
            })
        }
        console.log(data);
    }

    return (
        <>
            <LoginNavbar />
            <div className="search border">
                <h4 class="mr-4"><span>Lọc Theo:</span></h4>
                <select 
                    class="form-select col-md-8" 
                    aria-label="Default select example"
                    onChange={handleChange}
                    >
                    <option value="1">Đủ điều kiện an toàn thực phẩm</option>
                    <option value="2">Không đủ điều kiện an toàn thực phẩm</option>
                </select>
                <button 
                    type="button" 
                    class="btn btn-primary"
                    onClick={handleSearch}
                    >
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>
            <div className="table">
                    <table>
                        <thead>
                            <tr class="demuc">
                                <th scope="col" class="col-xs-1">STT</th>
                                <th scope="col" class="col-xs-1">Tên Cơ Sở</th>
                                <th scope="col" class="col-xs-1">Chủ sở hữu</th>
                                <th scope="col" class="col-xs-4">Address</th>
                                <th scope="col" class="col-xs-2">Loại hình kinh doanh</th>
                                <th scope="col" class="col-xs-1">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((datas, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{datas.name}</td>
                                        <td>{datas.owner}</td>
                                        <td>{datas.address}, {datas.area}</td>
                                        <td>{datas.businessType}</td>
                                        <td>{datas.status}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
        </>
    )
}

export default Consider;