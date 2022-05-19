import React from 'react'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Typography from '@material-ui/core/Typography'
import FormHelperText from '@material-ui/core/FormHelperText'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import './Form.css'
import { Link } from "react-router-dom";

function Register(props) {

        return (
            <Grid container justify='center' alignContent='center'>
                <Grid item xs={6} md={4}>
                    <Paper elevation={4} style={{ padding: '20px 15px', marginTop: '30px' }}>
                        <Typography 
                            variant="headline" 
                            gutterBottom
                            className="head_form"
                        >
                            <h1>Sign Up</h1>
                            <h2 className="swap_form"><Link to='/login'>Login</Link></h2>
                        </Typography>
                        <FormControl fullWidth margin='normal' error={!!props.errors.username}>
                            <InputLabel>Username</InputLabel>
                            <Input 
                                name='username' 
                                fullWidth 
                                value={props.values.username}
                                onChange={props.handleChange}
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
                                onChange={props.handleChange}
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
                        <FormControlLabel
                            control={
                                <Checkbox />
                            }
                            label='...'
                            style= {{paddingTop: '20px'}}
                        />
                        <FormControl fullWidth margin='normal'>
                            <Button
                                variant='extendedFab'
                                color='primary'
                                type='submit'
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
                .oneOf([Yup.ref('password'), null], 'Passwords must match')   
        }),
    })(Register)
    
export default RegisterForm
