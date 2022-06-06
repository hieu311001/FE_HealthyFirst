import React from "react";
import './consider.css'
import { useState } from "react";

function Review(props) {
    const [data, setData] = useState();

    const sendData = () => {
        props.parentCallback("Message from Child");
    }
    
    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        setData(vaults => ({
          ...vaults, 
          [name]: value
        }))
    };

    const handleUpdate = () => {
        fetch("http://localhost:5000/accreditation/" + props.idx, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authentication: "Bearer " + localStorage.getItem("accessToken")
            },
          })
            .then((response) => {
              if (response.status === 401) {
                alert("Không đạt yêu cầu");
              } else {
                return response.json();
              }
            })
    }
    console.log(data)

    return (
        <>
            <div class="input-group mb-3">
                <span class="mr-4 w-25">Môi trường: </span>
                <select class="form-select" aria-label="Default select example" name="environtment" onChange={handleChange}>
                    <option value="Đạt">Đạt</option>
                    <option value="Không đạt" selected>Không đạt</option>
                </select>
            </div>
            <div class="input-group mb-3">
                <span class="mr-4 w-25">Nguồn nước: </span>
                <select class="form-select" aria-label="Default select example" name="water" onChange={handleChange}>
                    <option value="Đạt">Đạt</option>
                    <option value="Không đạt" selected>Không đạt</option>
                </select>
            </div>
            <div class="input-group mb-3">
                <span class="mr-4 w-25">Dụng cụ: </span>
                <select class="form-select" aria-label="Default select example" name="appliances" onChange={handleChange}>
                    <option value="Đạt">Đạt</option>
                    <option value="Không đạt" selected>Không đạt</option>
                </select>
            </div>
            <div class="input-group mb-3">
                <span class="mr-4 w-25">Xử lý chất thải: </span>
                <select class="form-select" aria-label="Default select example" name="waste" onChange={handleChange}>
                    <option value="Đạt">Đạt</option>
                    <option value="Không đạt" selected>Không đạt</option>
                </select>
            </div>
            <div class="input-group mb-3">
                <span class="mr-4 w-25">Nguyên liệu: </span>
                <select class="form-select" aria-label="Default select example" name="ingredient" onChange={handleChange}>
                    <option value="Đạt">Đạt</option>
                    <option value="Không đạt" selected>Không đạt</option>
                </select>
            </div>
            <div class="input-group mb-3">
                <span class="mr-4 w-25">Bảo quản thực phẩm: </span>
                <select class="form-select" aria-label="Default select example" name="food_preservation" onChange={handleChange}>
                    <option value="Đạt">Đạt</option>
                    <option value="Không đạt" selected>Không đạt</option>
                </select>
            </div>
            <button type="button" class="btn btn-primary w-100 mx-auto" 
                onClick={(e) => {
                    handleUpdate(e);
                    setTimeout(() => {
                        sendData(e);
                    }, 500);
                }}
            >Cập nhật</button>
        </>
    )
}

export default Review;