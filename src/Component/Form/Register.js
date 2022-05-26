import React from 'react'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Typography from '@material-ui/core/Typography'
import FormHelperText from '@material-ui/core/FormHelperText'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormLabel from '@material-ui/core/FormLabel'
import Radio from '@material-ui/core/Radio'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import './Form.css'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Register(props) {
    const navigate = useNavigate();
    const [login, setLogin] = useState();

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(login)
        
        setLogin(vaults => ({
          ...vaults, 
          [name]: value
        }))
      }

      const handleSubmit = (event) => {
        event.preventDefault();

        fetch("http://localhost:5000/register", {
          method: "POST",
          body: JSON.stringify(login),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => {
            if (response.status === 401) {
              alert("Tai khoan da ton tai");
            } else {
              return response.json();
            }
          })
          .then((data) => {
              console.log("abc")
            navigate("/login");
          });
      };

        return (
            <Grid container justify='center' alignContent='center' style={{marginTop: '5%'}}>
                <Grid item sm={6} xs={11} md={4}>
                    <Paper elevation={4} style={{ padding: '20px 15px', marginTop: '30px' }}>
                        <Typography 
                            variant="headline" 
                            gutterBottom
                            className="head_form"
                        >
                            <h1>Sign Up</h1>
                            <h2><Link className="swap_form" to='/login'>Login</Link></h2>
                        </Typography>
                        <FormControl fullWidth margin='normal' error={!!props.errors.username}>
                            <InputLabel>Username</InputLabel>
                            <Input 
                                name='username' 
                                fullWidth 
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
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Level:</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="level"
                            >
                                <FormControlLabel value="1" onClick={handleInputChange} control={<Radio />} label="Level 1" />
                                <FormControlLabel value="2" onClick={handleInputChange} control={<Radio />} label="Level 2" />
                                <FormHelperText>{props.errors.level}</FormHelperText>
                            </RadioGroup>
                        </FormControl>
                        <FormControl fullWidth margin='normal'>
                            <Button
                                variant='extendedFab'
                                color='primary'
                                type='submit'
                                onClick={handleSubmit}
                                disabled={props.errors.username || props.errors.password || props.errors.confirm_password}
                            >
                                Sign Up
                                </Button>
                        </FormControl>
                    </Paper>
                </Grid>
            </Grid>
        )
    }

    const RegisterForm = withFormik({
        mapPropsToValues() { // Khởi tạo giá trị cho các field trong From
            return {
                username: '',
                password: '',
                confirm_password: '',
                level: ''
            }
        },
        validationSchema: Yup.object().shape({ // Validate form field
            username: Yup.string()
                .required('Username is required')
                .min(5, 'Username must have min 5 characters'),
            password: Yup.string()
                .required('Password is required')
                .min(5, 'Password must have min 5 characters'),
            confirm_password: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match'),
            // level: Yup.boolean().required("A radio option is required")   
        }),
    })(Register)
    
export default RegisterForm
