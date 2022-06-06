
import React from "react";
import './list.css';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import Collapse from 'react-bootstrap/esm/Collapse';
import AddCS from './addFacility';
import Certificate from '../Certificate/certificate'
import LoginNavbar from '../home/login_navbar';

function List_coso(){
    const [data, setData] = useState();
    const [del, setDel] = useState();
    const [open, setAddOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [message, setMessage] = useState(true);
    const [idxData, setIdxData] = useState();
    const [search, setSearch] = React.useState('');
    

    const handleSearch = (event) => {
      setSearch(event.target.value.toLowerCase());
    };

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
            <div className="search ml-4">
                <label htmlFor="search" className="w-100">
                <h3>Tìm kiếm:</h3>
                <input className="input-lg w-50 form-control mt-2" id="search" placeholder="Name, Owner, Address..." type="text" onChange={handleSearch}/>
                </label>
            </div>
            <div className="flex mt-3">
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
                <div className="table  table-striped table-hover">
                    <table>
                        <thead class="thead-light">
                            <tr class="demuc">
                                <th scope="col" class="col-sm-1 col-md-1">STT</th>
                                <th scope="col" class="col-sm-2 col-md-2">Tên Cơ Sở</th>
                                <th scope="col" class="col-sm-1 col-md-1">Chủ sở hữu</th>
                                <th scope="col" class="col-sm-1 col-md-1">SĐT</th>
                                <th scope="col" class="col-sm-4 col-md-4">Address</th>
                                <th scope="col" class="col-sm-1 col-md-1">Loại hình kinh doanh</th>
                                <th scope="col" class="col-sm-1 col-md-1">Số giấy Chứng Nhận</th>
                                <th scope="col" class="col-sm-1 col-md-1">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((datas, index) => {
                                if(datas.name.toLowerCase().includes(search) || 
                                    datas.owner.toLowerCase().includes(search) || 
                                        datas.address.toLowerCase().includes(search)){
                                    return (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{datas.name}</td>
                                            <td>{datas.owner}</td>
                                            <td>{datas.phoneNumber}</td>
                                            <td>{datas.address}</td>
                                            <td>{datas.businessType}</td>
                                            <td>
                                                {datas.certificateId}
                                                <span
                                                    onClick={() => {
                                                        setShow(!show);
                                                        setIdxData([datas.name, datas.owner, datas.phoneNumber, datas.address, datas.businessType, datas.certificateId])	
                                                    }
                                                    }
                                                    className={datas.certificateId !== null ? "cId" : "hidden"}
                                                >
                                                    <i class="fa-solid fa-eye ml-2"></i>
                                                </span>
                                                <Modal show={show} onHide={handleClose}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Giấy chứng nhận</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <Certificate dataFromList={idxData} />
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
                                                        <Modal.Title>Xóa cơ sở</Modal.Title>
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
                                )}
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default List_coso;