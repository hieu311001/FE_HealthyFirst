import React from 'react'
import Input from '@material-ui/core/Input'
// import FormControl from '@material-ui/core/FormControl'
// import InputLabel from '@material-ui/core/InputLabel'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
// import FormHelperText from '@material-ui/core/FormHelperText'
import {FormHelperText, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react';

function AddAccount(props) {
    const [newAccount, setNewAccount] = useState();
    const [area, setArea] = useState('');
    const [role, setRole] = useState('');

    const sendData = () => {
        props.parentCallback("Message from Child");
    }

    const handleChangeRole = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setRole(event.target.value);
        setNewAccount(vaults => ({
            ...vaults, 
            [name]: value
        }))
    }

    const handleChangeArea = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setArea(event.target.value);
        setNewAccount(vaults => ({
            ...vaults, 
            [name]: value
        }))
    }



    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        setNewAccount(vaults => ({
          ...vaults, 
          [name]: value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(newAccount);

        fetch("http://localhost:5000/add_account", {
          method: "POST",
          body: JSON.stringify(newAccount),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authentication: "Bearer " + localStorage.getItem("accessToken")
          },
        })
        .then((response) => {
            if (response.status === 401) {
              alert("Chưa add được");
            } else {
                console.log("add thành công")
              return response.json();
            }
        })
    };

    return (
        <Grid container justify='center' alignContent='center'>
                <Grid item xs={9} md={12}>
                    <Paper elevation={4} style={{ padding: '20px 15px', marginBottom: '10px' }} onSubmit={handleSubmit}>
                        <Typography 
                            variant="headline" 
                            gutterBottom
                            className="head_form"
                        >
                            <h1>Thêm Tài Khoản</h1>
                        </Typography>
                        <FormControl fullWidth margin='normal' error={!!props.errors.username}>
                            <InputLabel>Username</InputLabel>
                            <Input 
                                fullWidth
                                type="text"
                                name='username' 
                                value={props.values.username}
                                onChange={(e) => {
                                    props.handleChange(e);
                                    handleInputChange(e);
                                }}
                            />
                            <FormHelperText>{props.errors.username}</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth margin='normal' error={!!props.errors.password}>
                            <InputLabel>Password</InputLabel>
                            <Input 
                                fullWidth 
                                name='password' 
                                type='password' 
                                value={props.values.password}
                                onChange={(e) => {
                                    props.handleChange(e);
                                    handleInputChange(e);
                                }}
                            />
                            <FormHelperText>{props.errors.password}</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth margin='normal' error={!!props.errors.confirm_password}>
                            <InputLabel>Enter the Password</InputLabel>
                            <Input 
                                fullWidth 
                                name='confirm_password' 
                                type='password' 
                                value={props.values.confirm_password}
                                onChange={props.handleChange}
                            />
                            <FormHelperText>{props.errors.confirm_password}</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth margin='normal' className="form-select" >
                        {/* error={!!props.errors.role}> */}
                            <InputLabel>Chức vụ</InputLabel>
                            <Select 
                                value={role}
                                label="role"
                                name="role"
                                // value={props.values.role}
                                onChange={handleChangeRole}
                            >
                                <MenuItem value="Quản lý">Quản lý</MenuItem>
                                <MenuItem value="Chuyên viên">Chuyên viên</MenuItem>
                            </Select>
                            <FormHelperText>{props.errors.role}</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth margin='normal' className="form-select">
                            <InputLabel id="demo-simple-select-label">Địa bàn:</InputLabel>
                            <Select
                                labelId="select-label"
                                id="select"
                                value={area}
                                label="area"
                                name="area"
                                onChange={handleChangeArea}
                            >
                                <MenuItem value="Cầu Giấy">Quận Cầu Giấy</MenuItem>
                                <MenuItem value="Nam Từ Liêm">Quận Nam Từ Liêm</MenuItem>
                                <MenuItem value="Bắc Từ Liêm">Quận Bắc Từ Liêm</MenuItem>
                                <MenuItem value="Hà Đông">Quận Hà Đông</MenuItem>
                                <MenuItem value="Tây Hồ">Quận Tây Hồ</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin='normal'>
                            <Button
                                variant='extendedFab'
                                color='primary'
                                type='submit'
                                onClick={(e) => {
                                    handleSubmit(e);
                                    sendData(e);
                                }}
                                disabled={props.errors.password || props.errors.username || props.errors.confirm_password}
                            >
                                Add...
                                </Button>
                        </FormControl>
                    </Paper>
                </Grid>
        </Grid>
    )
}

const AddAccountForm = withFormik({
    mapPropsToValues() { // Khởi tạo giá trị cho các field trong From
        return {
            username: '',
            password: '',
            role: '',
            area: '',
        }
    },

    validationSchema: Yup.object().shape({ // Validate form field
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .required('Password is required'),
        confirm_password: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Password must be confirmed'),
        // role: Yup.string()
        //     .required('Role is required'),
    }),
})(AddAccount)

export default AddAccountForm