import React, { PureComponent } from 'react';
import LoginNavbar from '../home/login_navbar';
import { useState } from "react";
import './consider.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Consider_layout from './consider_layout';

function Statistical() {

    const [postdata, setPostdata] = useState();
    const [data, setData] = useState();

    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        setPostdata(vaults => ({
          ...vaults, 
          [name]: value
        }))
    }

    const handleClick = (event) => {
        fetch("http://localhost:5000/statisticalCertificateByBusinessType" , {
            method: "POST",
            body: JSON.stringify(postdata),
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
        });
    }

    console.log(data);

    return (
        <>
            <LoginNavbar />
            <Consider_layout />
            <div className="sts border p-4">
                <h4 class="mr-4"><span>Lọc Theo:</span></h4>
                <select 
                    class="form-select col-md-12 mb-3" 
                    aria-label="Default select example"
                    name="businessType"
                    onChange={handleChange}
                    >
                    <option value="" selected></option>
                    <option value="Sản xuất thực phẩm">Sản xuất thực phẩm</option>
                    <option value="Dịch vụ ăn uống">Dịch vụ ăn uống</option>
                </select>

                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon3">Từ: </span>
                    </div>
                    <input type="text" name="timeFrom" class="form-control" placeholder="Định dạng YYYY/MM/DD" id="basic-url" aria-describedby="basic-addon3" onChange={handleChange}/>
                </div>

                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon3">Đến: </span>
                    </div>
                    <input type="text" name="timeTo" class="form-control" placeholder="Định dạng YYYY/MM/DD" id="basic-url" aria-describedby="basic-addon3" onChange={handleChange}/>
                </div>

                <button type="button" class="btn btn-primary" onClick={(e) => {
                    handleClick();
                }}>
                    Biểu đồ
                </button>
            </div>
            <div className="div_bar">
                    <BarChart
                        className="bar"
                        width={600}
                        height={400}
                        data={data}
                        barSize={20}
                    >
                    <XAxis dataKey="months" scale="point" padding={{ left: 10, right: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="count" fill="#8884d8" background={{ fill: '#eee' }} />
                    </BarChart>
            </div>
        </>
    )
}

export default Statistical;