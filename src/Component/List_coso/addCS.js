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
import { withFormik } from 'formik'
import * as Yup from 'yup'
// import { Link } from "react-router-dom";
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

function AddCS(props) {
    const handleInputChange = (event) => {
        // const target = event.target;
        // const value = target.value;
        // const name = target.name;
      }

      const handleSubmit = (event) => {
        event.preventDefault();
      };
    return (
        <Grid container justify='center' alignContent='center'>
                <Grid item xs={9} md={4}>
                    <Paper elevation={4} style={{ padding: '20px 15px', marginBottom: '10px' }} onSubmit={handleSubmit}>
                        <Typography 
                            variant="headline" 
                            gutterBottom
                            className="head_form"
                        >
                            <h1>Thêm Cơ Sở</h1>
                        </Typography>
                        <FormControl fullWidth margin='normal' error={!!props.errors.username}>
                            <InputLabel>Tên Cơ Sở</InputLabel>
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
                            <InputLabel>Chủ Sở Hữu</InputLabel>
                            <Input 
                                fullWidth 
                                name='password' 
                                type='text' 
                                value={props.values.password}
                                onChange={(e) => {
                                    props.handleChange(e);
                                    handleInputChange(e);
                                }}
                            />
                            <FormHelperText>{props.errors.password}</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth margin='normal' error={!!props.errors.password}>
                            <InputLabel>Số điện thoại</InputLabel>
                            <Input 
                                fullWidth 
                                name='password' 
                                type='text' 
                                value={props.values.password}
                                onChange={(e) => {
                                    props.handleChange(e);
                                    handleInputChange(e);
                                }}
                            />
                            <FormHelperText>{props.errors.password}</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth margin='normal' error={!!props.errors.password}>
                            <InputLabel>Địa Chỉ</InputLabel>
                            <Input 
                                fullWidth 
                                name='password' 
                                type='text' 
                                value={props.values.password}
                                onChange={(e) => {
                                    props.handleChange(e);
                                    handleInputChange(e);
                                }}
                            />
                            <FormHelperText>{props.errors.password}</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth margin='normal' error={!!props.errors.password}>
                            <InputLabel>Loại Hình Kinh Doanh</InputLabel>
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
                        <FormControl fullWidth margin='normal'>
                            <Button
                                variant='extendedFab'
                                color='primary'
                                type='submit'
                                onClick={handleSubmit}
                                disabled={props.errors.password || props.errors.username}
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
            username: '',
            password: '',
        }
    },
    validationSchema: Yup.object().shape({ // Validate form field
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .required('Password is required'),
    }),
})(AddCS)

export default AddCSForm;