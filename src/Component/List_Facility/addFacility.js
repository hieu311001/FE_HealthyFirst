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
              alert("B???n kh??ng c?? quy???n ??? khu v???c n??y");
            } else {
                console.log("add th??nh c??ng")
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
                            <h1>Th??m C?? S???</h1>
                        </Typography>
                        <FormControl fullWidth margin='normal'  error={!!props.errors.name}>
                            <InputLabel>T??n C?? S???</InputLabel>
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
                            <InputLabel>Ch??? S??? H???u</InputLabel>
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
                            <InputLabel>S??? ??i???n tho???i</InputLabel>
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
                            <InputLabel>?????a Ch???</InputLabel>
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
                        <FormControl fullWidth margin='normal' >
                            <InputLabel id="demo-simple-select-label">?????a b??n:</InputLabel>
                            <Select
                                labelId="select-label"
                                id="select"
                                value={area}
                                label="area"
                                name="area"
                                onChange={handleChange}
                            >
                                <MenuItem value="C???u Gi???y">Qu???n C???u Gi???y</MenuItem>
                                <MenuItem value="Nam T??? Li??m">Qu???n Nam T??? Li??m</MenuItem>
                                <MenuItem value="B???c T??? Li??m">Qu???n B???c T??? Li??m</MenuItem>
                                <MenuItem value="H?? ????ng">Qu???n H?? ????ng</MenuItem>
                                <MenuItem value="T??y H???">Qu???n T??y H???</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin='normal' className="control-area">
                            <FormLabel id="demo-radio-buttons-group-label">Lo???i h??nh kinh doanh:</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="businessType"
                            >
                                <FormControlLabel value="S???n xu???t th???c ph???m" onClick={handleInputChange} control={<Radio />} label="S???n xu???t th???c ph???m" />
                                <FormControlLabel value="D???ch v??? ??n u???ng" onClick={handleInputChange} control={<Radio />} label="D???ch v??? ??n u???ng" />
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
    mapPropsToValues() { // Kh???i t???o gi?? tr??? cho c??c field trong From
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