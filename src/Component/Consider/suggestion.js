import React from "react";
import LoginNavbar from '../home/login_navbar';
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import Review from './review'
import Consider_layout from "./consider_layout";
import './consider.css';
import Moment from 'react-moment';
import 'moment-timezone';

function Suggestion() {
    const [data, setData] = useState();
    const [updata, setUpData] = useState();
    const [status, setStatus] = useState("Đã được cấp");
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [id, setId] = useState();
    const [name ,setName] = useState();
    const [result, setResult] = useState();
    const [update, setUpdate] = useState(true);

    const handleClose = () => {
        setShow(false);
        setShow2(false);
    }


    const handleChange2 = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        setUpData(vaults => ({
          ...vaults, 
          [name]: value
        }))
    }

    console.log(id);
    console.log(data)

    const handleUpdateData = () => {
        fetch("http://localhost:5000/edit_certificate/" + id, {
            method: "PUT",
            body: JSON.stringify(updata),
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
    }

    const handleUpdate = (event) => {
        fetch("http://localhost:5000/update_status/" + id, {
            method: "PUT",
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
    }


    useEffect(() => {
        fetch("http://localhost:5000/suggestions" , {
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
        });
    }, [])

    return (
        <>
            <LoginNavbar />
            <Consider_layout />
            <div>
                <div className="table  table-striped table-hover">
                    <table>
                    <thead>
                            <tr class="demuc">
                                <th scope="col" class="col-sm-1 col-md-1">STT</th>
                                <th scope="col" class="col-sm-2 col-md-2">Tên Cơ Sở</th>
                                <th scope="col" class="col-sm-4 col-md-4">Address</th>
                                <th scope="col" class="col-sm-1 col-md-1">Ngày Cấp</th>
                                <th scope="col" class="col-sm-1 col-md-1">Ngày Hết Hạn</th>
                                <th scope="col" class="col-sm-1 col-md-1">Status</th>
                                <th scope="col" class="col-sm-1 col-md-1">Thanh tra</th>
                                <th scope="col" class="col-sm-1 col-md-1">Giấy chứng nhận</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((datas, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{datas.name}</td>
                                        <td>{datas.address}</td>
                                        <td><Moment format="YYYY-MM-DD">{datas.beginDate}</Moment></td>
                                        <td><Moment format="YYYY-MM-DD">{datas.endDate}</Moment></td>
                                        <td>
                                            {datas.status}
                                            <span 
                                                className={
                                                    (status === "Đã hết hạn" && datas.status === "Đã được cấp" ) ? "update" : "hidden"
                                                }
                                                onClick={(e) => {
                                                    handleUpdate(e);
                                                    setId(datas._id);
                                                    setTimeout(() => {
                                                        setUpdate(!update);
                                                    }, 500);
                                                }}
                                                >
                                                    <i class="fa-solid fa-arrows-spin"></i>
                                            </span>
                                        </td>
                                        {/* Mẫu thực phẩm */}
                                        <td>
                                            <Button
                                                class="btn btn-primary" 
                                                type="button"
                                                disabled={false || datas.status === "Đã được cấp"}
                                                onClick={(e) => {
                                                    setShow(!show);
                                                    setName(datas.name);
                                                }}
                                                >
                                                <i class="fa-solid fa-pen-to-square"></i>
                                            </Button>
                                            <Modal show={show} onHide={handleClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Đánh giá mẫu thực phẩm</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <div>
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3">Cơ Sở: </span>
                                                            </div>
                                                            <input 
                                                                type="text" 
                                                                class="form-control" 
                                                                value={name}
                                                                id="basic-url" 
                                                                aria-describedby="basic-addon3"
                                                            />
                                                        </div>
                                                        <Review idx={datas._id}/>
                                                    </div>
                                                </Modal.Body>
                                            </Modal>
                                        </td>
                                        {/* Giấy chứng nhận */}
                                        <td>
                                            <Button
                                                class="btn btn-primary" 
                                                type="button"
                                                disabled={false || datas.status === "Đã được cấp"}
                                                onClick={(e) => {
                                                    setShow2(!show2);
                                                    setName(datas.name);
                                                    setResult(datas.result);
                                                    setId(datas._id);
                                                }}
                                                >
                                                <i class="fa-solid fa-note-sticky"></i>
                                            </Button>
                                            <Modal show={show2} onHide={handleClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Cấp giấy chứng nhận</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <div>
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text " id="basic-addon3">Cơ Sở: </span>
                                                            </div>
                                                            <input 
                                                                type="text" 
                                                                class="form-control" 
                                                                value={name}
                                                                id="basic-url" 
                                                                aria-describedby="basic-addon3"
                                                            />
                                                        </div>
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text " id="basic-addon3">Mẫu thực phẩm: </span>
                                                            </div>
                                                            <input 
                                                                type="text" 
                                                                class="form-control" 
                                                                value={result}
                                                                id="basic-url" 
                                                                aria-describedby="basic-addon3"
                                                            />
                                                        </div>
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text " id="basic-addon3">Số giấy chứng nhận: </span>
                                                            </div>
                                                            <input 
                                                                type="text" 
                                                                class="form-control" 
                                                                name="certificateId"
                                                                id="basic-url" 
                                                                aria-describedby="basic-addon3"
                                                                onChange={handleChange2}
                                                            />
                                                        </div>
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text " id="basic-addon3">Ngày bắt đầu: </span>
                                                            </div>
                                                            <input 
                                                                type="text" 
                                                                class="form-control" 
                                                                name="beginDate" 
                                                                placeholder="Định dạng YYYY-MM-DD" // do backend dùng định dạng này nên không thể dùng input type="date"
                                                                id="basic-url" 
                                                                aria-describedby="basic-addon3"
                                                                onChange={handleChange2}
                                                            />
                                                        </div>
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text " id="basic-addon3">Ngày hết hạn: </span>
                                                            </div>
                                                            <input 
                                                                type="text" 
                                                                class="form-control" 
                                                                name="endDate"
                                                                placeholder="Định dạng YYYY-MM-DD" // do backend dùng định dạng này nên không thể dùng input type="date"
                                                                id="basic-url" 
                                                                aria-describedby="basic-addon3"
                                                                onChange={handleChange2}
                                                            />
                                                        </div>
                                                        <span>* Thực hiện thanh kiểm tra 3 tháng 1 lần kể từ ngày cấp</span>
                                                        <div class="input-group my-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text " id="basic-addon3">Quyết định: </span>
                                                            </div>
                                                            <select class="form-select" aria-label="Default select example" name="status" onChange={handleChange2}>
                                                                <option selected></option>
                                                                <option value="Đã được cấp">Cấp giấy chứng nhận</option>
                                                                <option value="Bị thu hồi">Thu Hồi</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <button 
                                                            type="button" 
                                                            class="btn btn-primary w-100 mx-auto"
                                                            disabled={false || result === "Chưa giám định"}
                                                            onClick={(e) => {
                                                                handleUpdateData(e);
                                                                setTimeout(() => {
                                                                    setUpdate(!update);
                                                                }, 300);
                                                            }}
                                                            >
                                                            Cấp Giấy Chứng Nhận
                                                        </button>
                                                    </div>
                                                </Modal.Body>
                                            </Modal>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Suggestion;