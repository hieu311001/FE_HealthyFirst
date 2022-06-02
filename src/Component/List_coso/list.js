import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import './list.css';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import Collapse from 'react-bootstrap/esm/Collapse';
import AddCS from './addCS';
import Certificate from '../Certificate/certificate'
import LoginNavbar from '../home/login_navbar';

function List_coso(){
    const [data, setData] = useState();
    const [del, setDel] = useState();
    const [open, setAddOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [message, setMessage] = useState(true);

    const callbackFunction = () => {
        setMessage(!message)
    }

    const handleClose = () => {
        setShow(false);
        setShow2(false);
    }

    const handleDelete = () => {
        fetch("http://localhost:5000/remove_foodfacility/" + del, {
            method: "DELETE",
            body: JSON.stringify(),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authentication: "Bearer " + localStorage.getItem("accessToken")
            },
        })
        .then((response) => {
            if (response.status === 401) {
              alert("Chưa xóa được");
            } else {
              setMessage(!message);
              return response.json();
            }
        })
    }
    console.log(del)
    console.log(data);

    useEffect(() => {
        fetch("http://localhost:5000/foodFacility", {
            method: "GET",
            body: JSON.stringify(),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authentication: "Bearer " + localStorage.getItem("accessToken")
            },
        })
        .then((response) => {
            if (response.status === 401) {
              alert("Chưa lấy được dữ liệu");
            } else {
              return response.json();
            }
        })
        .then((data) => {
            setData(data);
        });
    }, [message]);

    return (
        <>
            <LoginNavbar />
            <div className="flex">
                <div className="add">
                    <Button
                        onClick={() => setAddOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                    >
                        <i class="fa-solid fa-plus"></i>
                    </Button>
                    <Collapse in={open}>
                        <div>
                            <AddCS parentCallback={callbackFunction}/>
                        </div>
                    </Collapse>
                </div>
                <div className="table">
                    <table>
                        <thead>
                            <tr class="demuc">
                                <th scope="col">STT</th>
                                <th scope="col">Tên Cơ Sở</th>
                                <th scope="col">Chủ sở hữu</th>
                                <th scope="col">SĐT</th>
                                <th scope="col">Address</th>
                                <th scope="col">Loại hình kinh doanh</th>
                                <th scope="col" >Số giấy Chứng Nhận</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((datas, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{datas.name}</td>
                                        <td>{datas.owner}</td>
                                        <td>{datas.phoneNumber}</td>
                                        <td>{datas.address}, {datas.area}</td>
                                        <td>{datas.businessType}</td>
                                        <td>
                                            {datas.status}
                                            <Button
                                                onClick={() => setShow(!show)}
                                                className="down btn btn-light"
                                            >
                                                <i class="fa-solid fa-eye"></i>
                                            </Button>
                                            <Modal show={show} onHide={handleClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Giấy chứng nhận</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Certificate />
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleClose}>
                                                        Close
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </td>
                                        <td>
                                            <Button
                                                class="btn btn-primary" 
                                                type="button"
                                                onClick={(e) => {
                                                    setShow2(!show2);
                                                    setDel(datas._id);
                                                }}
                                                >
                                                <i class="fa-solid fa-trash-can"></i>
                                            </Button>
                                            <Modal show={show2} onHide={handleClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Giấy chứng nhận</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    Bạn có chắc chắn muốn xóa không?
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleClose}>
                                                        Close
                                                    </Button>
                                                    <Button variant="secondary" onClick={(e) => {
                                                        handleClose(e);
                                                        handleDelete(e);
                                                    }}>
                                                        Đồng Ý
                                                    </Button>
                                                </Modal.Footer>
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

export default List_coso;