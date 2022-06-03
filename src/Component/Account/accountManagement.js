import React from "react";
import AccountLayout from './accountLayout';
import LoginNavbar from '../home/login_navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddAccount from './addAccount'
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import Collapse from 'react-bootstrap/esm/Collapse';
import { useState, useEffect } from 'react';
import './account.css'

function AccountManagement() {
    const [data, setData] = useState();
    const [del, setDel] = useState();
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [open, setAddOpen] = useState(false);
    const [message, setMessage] = useState(true);

    const callbackFunction = () => {
        setMessage(!message)
    }

    const handleClose = () => {
        setShow(false);
        setShow2(false);
    }

    const handleDelete = () => {
        fetch("http://localhost:5000/remove_account/" + del, {
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
        fetch("http://localhost:5000/account", {
            method: "GET",
            body: JSON.stringify(),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authentication: "Bearer " + localStorage.getItem("accessToken")
            },
        })
        .then((response) => {
            if (response.status === 401) {
              
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
            <AccountLayout />
            <div style={{display: "flex"}}>
                <div className="add">
                    <Button onClick={() => setAddOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open}>
                    <i class="fa-solid fa-plus"></i>
                    </Button>
                    <Collapse in={open}>
                        <div>
                            <AddAccount parentCallback={callbackFunction} />
                        </div>
                    </Collapse>
                </div>
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Tên đăng nhập</th>
                                {/* <th scope="col">Chủ sở hữu</th> */}
                                <th scope="col">Chức vụ</th>
                                <th scope="col">Địa phận quản lý</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((datas, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{datas.username}</td>
                                        <td>{datas.role}</td>
                                        <td>{datas.area}</td>
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
                                                    <Modal.Title>Xoa Tai Khoan</Modal.Title>
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
                                    </tr>);
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default AccountManagement;