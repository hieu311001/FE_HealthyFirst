import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import Header from '../home/header';
import './list.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import Collapse from 'react-bootstrap/esm/Collapse';
import AddCS from './addCS';

function List_coso(){
    const [open, setAddOpen] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    return (
        <>
            <Header />
            <Button
                onClick={() => setAddOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
            >
                <i class="fa-solid fa-plus"></i>
            </Button>
            <Collapse in={open}>
                <div>
                    <AddCS />
                </div>
            </Collapse>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên Cơ Sở</th>
                        <th scope="col">Chủ sở hữu</th>
                        <th scope="col">SĐT</th>
                        <th scope="col">Address</th>
                        <th scope="col">Loại hình kinh doanh</th>
                        <th scope="col">Số giấy Chứng Nhận</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Apollo</td>
                        <td>Vũ Minh Hiếu</td>
                        <td>0363202943</td>
                        <td>ngõ 58 Nguyễn Đổng Chi, phường Cầu Diễn, quận Nam Từ Liêm, Hà Nội</td>
                        <td>Kinh Doanh Thực Phẩm</td>
                        <td>
                            <span>null</span>
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
                                    
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </td>
                        <td>
                            <Button class="btn btn-primary" type="button">
                                <i class="fa-solid fa-trash-can"></i>
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default List_coso;