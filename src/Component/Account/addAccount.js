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
              alert("T??i kho???n ???? t???n t???i");
            } else {
              return response.json();
            }
        })
    };

    return (
        <Grid container justify='center' alignContent='center'>
                <Grid item xs={9} md={11}>
                    <Paper elevation={4} style={{ padding: '20px 15px', marginBottom: '10px' }} onSubmit={handleSubmit}>
                        <Typography 
                            variant="headline" 
                            gutterBottom
                            className="head_form"
                        >
                            <h1>Th??m T??i Kho???n</h1>
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
                        <FormControl fullWidth margin='normal' >
                        {/* error={!!props.errors.role}> */}
                            <InputLabel>Ch???c v???</InputLabel>
                            <Select 
                                value={role}
                                label="role"
                                name="role"
                                // value={props.values.role}
                                onChange={handleChangeRole}
                            >
                                <MenuItem value="Chuy??n vi??n">Chuy??n vi??n</MenuItem>
                            </Select>
                            <FormHelperText>{props.errors.role}</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth margin='normal'>
                            <InputLabel id="demo-simple-select-label">?????a b??n:</InputLabel>
                            <Select
                                labelId="select-label"
                                id="select"
                                value={area}
                                label="area"
                                name="area"
                                onChange={handleChangeArea}
                            >
                                <MenuItem value="C???u Gi???y">Qu???n C???u Gi???y</MenuItem>
                                <MenuItem value="Nam T??? Li??m">Qu???n Nam T??? Li??m</MenuItem>
                                <MenuItem value="B???c T??? Li??m">Qu???n B???c T??? Li??m</MenuItem>
                                <MenuItem value="H?? ????ng">Qu???n H?? ????ng</MenuItem>
                                <MenuItem value="T??y H???">Qu???n T??y H???</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin='normal'>
                            <Button
                                variant='extendedFab'
                                color='primary'
                                type='submit'
                                onClick={(e) => {
                                    handleSubmit(e);
                                    setTimeout(() => {
                                        sendData(e);
                                    }, 500);
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
    mapPropsToValues() { // Kh???i t???o gi?? tr??? cho c??c field trong From
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