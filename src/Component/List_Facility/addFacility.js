import React from 'react'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
// import Checkbox from '@material-ui/core/Checkbox'
import Typography from '@material-ui/core/Typography'
import FormHelperText from '@material-ui/core/FormHelperText'
import { FormLabel, RadioGroup, FormControlLabel, Radio, MenuItem, Select } from '@material-ui/core'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import './addFacility.css';
// import { Link } from "react-router-dom";
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

function AddCS(props) {
    const [addCS, setAddCS] = useState();
    const [area, setArea] = useState('');

    const sendData = () => {
        props.parentCallback("Message from Child");
    }

    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setArea(event.target.value);
        setAddCS(vaults => ({
            ...vaults, 
            [name]: value
        }))
    }

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        setAddCS(vaults => ({
          ...vaults, 
          [name]: value
        }))
      }

      const handleSubmit = (event) => {
        event.preventDefault();
        console.log(addCS);

        fetch("http://localhost:5000/add_foodFacility", {
            method: "POST",
            body: JSON.stringify(addCS),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authentication: "Bearer " + localStorage.getItem("accessToken")
            },
        })
        .then((response) => {
            if (response.status === 401) {
              alert("Bạn không có quyền ở khu vực này");
            } else {
                console.log("add thành công")
              return response.json();
            }
        })

        props.values.name = "";
        props.values.owner = "";
        props.values.phoneNumber = "";
        props.values.address = "";
        setArea("");
      };
    return (
        <Grid container justify='center' alignContent='center'>
                <Grid item xs={10} md={9}>
                    <Paper elevation={4} style={{ padding: '20px 15px', marginBottom: '10px' }} onSubmit={handleSubmit}>
                        <Typography 
                            variant="headline" 
                            gutterBottom
                            className="head_form"
                        >
                            <h1>Thêm Cơ Sở</h1>
                        </Typography>
                        <FormControl fullWidth margin='normal'  error={!!props.errors.name}>
                            <InputLabel>Tên Cơ Sở</InputLabel>
                            <Input 
                                fullWidth
                                type="text"
                                name='name' 
                                value={props.values.name}
                                onChange={(e) => {
                                    props.handleChange(e);
                                    handleInputChange(e);

                                }}
                            />
                            <FormHelperText>{props.errors.name}</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth margin='normal'  error={!!props.errors.owner}>
                            <InputLabel>Chủ Sở Hữu</InputLabel>
                            <Input 
                                fullWidth 
                                name='owner' 
                                type='text' 
                                value={props.values.owner}
                                onChange={(e) => {
                                    props.handleChange(e);
                                    handleInputChange(e);
                                }}
                            />
                            <FormHelperText>{props.errors.owner}</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth margin='normal'  error={!!props.errors.phoneNumber}>
                            <InputLabel>Số điện thoại</InputLabel>
                            <Input 
                                fullWidth 
                                name='phoneNumber' 
                                type='text' 
                                value={props.values.phoneNumber}
                                onChange={(e) => {
                                    props.handleChange(e);
                                    handleInputChange(e);
                                }}
                            />
                            <FormHelperText>{props.errors.phoneNumber}</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth margin='normal'  error={!!props.errors.address}>
                            <InputLabel>Địa Chỉ</InputLabel>
                            <Input 
                                fullWidth 
                                name='address' 
                                type='text' 
                                value={props.values.address}
                                onChange={(e) => {
                                    props.handleChange(e);
                                    handleInputChange(e);
                                }}
                            />
                            <FormHelperText>{props.errors.address}</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth margin='normal' className="form-select">
                            <InputLabel id="demo-simple-select-label">Địa bàn:</InputLabel>
                            <Select
                                labelId="select-label"
                                id="select"
                                value={area}
                                label="area"
                                name="area"
                                onChange={handleChange}
                            >
                                <MenuItem value="Cầu Giấy">Quận Cầu Giấy</MenuItem>
                                <MenuItem value="Nam Từ Liêm">Quận Nam Từ Liêm</MenuItem>
                                <MenuItem value="Bắc Từ Liêm">Quận Bắc Từ Liêm</MenuItem>
                                <MenuItem value="Hà Đông">Quận Hà Đông</MenuItem>
                                <MenuItem value="Tây Hồ">Quận Tây Hồ</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin='normal' className="control-area">
                            <FormLabel id="demo-radio-buttons-group-label">Loại hình kinh doanh:</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="businessType"
                            >
                                <FormControlLabel value="sản xuất thực phẩm" onClick={handleInputChange} control={<Radio />} label="Sản xuất thực phẩm" />
                                <FormControlLabel value="dịch vụ ăn uống" onClick={handleInputChange} control={<Radio />} label="Dịch vụ ăn uống" />
                            </RadioGroup>
                        </FormControl>
                        <FormControl fullWidth>
                            <Button
                                variant='extendedFab'
                                color='primary'
                                type='submit'
                                onClick={(e) => {
                                    handleSubmit(e);
                                    sendData(e);
                                }}
                                disabled={props.errors.name || props.errors.owner || props.errors.phoneNumber || props.errors.address}
                            >
                                Add...
                                </Button>
                        </FormControl>
                    </Paper>
                </Grid>
        </Grid>
    )
}

const AddCSForm = withFormik({
    mapPropsToValues() { // Khởi tạo giá trị cho các field trong From
        return {
            name: '',
            owner: '',
            phoneNumber: '',
            address: '',
            businessType: '',
        }
    },
    validationSchema: Yup.object().shape({ // Validate form field
        name: Yup.string()
            .required('name is required'),
        owner: Yup.string()
            .required('Name is required'),
        phoneNumber: Yup.string()
            .required('phoneNumber is required'),
        address: Yup.string()
            .required('Address is required'),     
    }),
})(AddCS)

export default AddCSForm;