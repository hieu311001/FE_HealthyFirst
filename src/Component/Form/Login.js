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
import './Form.css'
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login(props) {
    const navigate = useNavigate();
    const [login, setLogin] = useState();

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        setLogin(vaults => ({
          ...vaults, 
          [name]: value
        }))
      }

      const handleSubmit = (event) => {
        event.preventDefault();
        console.log(login);

        fetch("http://localhost:5000/signin", {
          method: "POST",
          body: JSON.stringify(login),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => {
            if (response.status === 401) {
              alert("Tên đăng nhập hoặc mật khẩu không đúng");
            } else {
              return response.json();
            }
          })
          .then((data) => {
            localStorage.setItem("id", data.id);
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("username", data.username);
            localStorage.setItem("role", data.role);
            localStorage.setItem("area", data.area);
            navigate("/home");
          });
      };

        return (
            <Grid container justify='center' alignContent='center' style={{marginTop: '5%'}}>
                <Grid item xs={6} md={4}>
                    <Paper elevation={4} style={{ padding: '20px 15px', marginTop: '30px' }} onSubmit={handleSubmit}>
                        <Typography 
                            variant="headline" 
                            gutterBottom
                            className="head_form"
                        >
                            <h1>Sign In</h1>
                            <h2 ><Link className="swap_form" to='/register'>Register</Link></h2>
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
                        {/* <FormControlLabel
                            control={
                                <Checkbox />
                            }
                            label='Remember Account'
                            style= {{paddingTop: '20px'}}
                        /> */}
                        <FormControl fullWidth margin='normal'>
                            <Button
                                variant='extendedFab'
                                color='primary'
                                type='submit'
                                onClick={handleSubmit}
                                disabled={props.errors.password || props.errors.username}
                            >
                                Sign In
                                </Button>
                        </FormControl>
                    </Paper>
                </Grid>
            </Grid>
        )
    }

    const LoginForm = withFormik({
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
    })(Login)
    
export default LoginForm
