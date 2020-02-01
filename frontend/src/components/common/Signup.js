import React, {useCallback, useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";

import axios from 'axios';

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import useStyles from "./styles";
import LockIcon from "@material-ui/icons/Lock";

import Copyright from "./Copyright";
import AppContext from "../../contexts/AppContexts";
import {SIGNUP, SIGNUP_ERROR, SIGNUP_INIT} from "../../actions";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const Signup = () => {

    const {state, dispatch} = useContext(AppContext);
    const [messageOpen, setMessageOpen] = useState(false);
    const [signupMessageOpen, setSignupMessageOpen] = useState(false);
    const {register, errors, handleSubmit, formState} = useForm();
    const {loading, errorMessage, signupMessage} = {...state.signup};
    const history = useHistory();
    const classes = useStyles();

    const onSubmit = useCallback(async (data, e) => {
        e.preventDefault();
        const result = window.confirm('登録してもよろしいですか？');
        if (!result) {
            return;
        }
        dispatch({
            type: SIGNUP_INIT,
        });
        const json = JSON.stringify(data);
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=utf-8',
            }
        };
        try {
            await axios.post("/api/signup", json, axiosConfig);
            dispatch({
                type: SIGNUP,
            });
            setSignupMessageOpen(true);
        } catch (e) {
            console.log(e);
            dispatch({
                type: SIGNUP_ERROR
            })
        }
    }, [dispatch]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setMessageOpen(false);
    };
    const handleSignupMessageClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSignupMessageOpen(false);
    };

    const handleOnExit = () => {
        history.replace('/');
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                {loading && !errorMessage ? (
                    <span>loading...</span>
                ) : (
                    <Snackbar open={messageOpen} autoHideDuration={6000} onClose={handleClose}>
                        <Alert severity="error" variant="filled" onClose={handleClose}>{errorMessage}</Alert>
                    </Snackbar>
                )}
                {/*登録完了時のメッセージ*/}
                {signupMessage ? (
                    <Snackbar open={signupMessageOpen} autoHideDuration={3000} onClose={handleSignupMessageClose}
                              onExit={handleOnExit}>
                        <Alert severity="success" variant="filled" onClose={handleSignupMessageClose}>{signupMessage}</Alert>
                    </Snackbar>
                ) : ('')}
                <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField id="userId"
                                       label="User ID"
                                       name="userId"
                                       inputRef={register({required: true, maxLength: 20})}
                                       error={!!errors.userId}
                                       helperText={errors.userId ? '20文字以内で入力してください' : ''}
                                       variant="outlined"
                                       fullWidth
                                       autoFocus
                                       required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="email"
                                       label="Email Address"
                                       name="email"
                                       inputRef={register({required: true})}
                                       error={!!errors.email}
                                       helperText={errors.email ? '必ず入力してください' : ''}
                                       variant="outlined"
                                       fullWidth
                                       autoComplete="email"
                                       required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="password"
                                       label="Password"
                                       name="password"
                                       type="password"
                                       inputRef={register({required: true})}
                                       error={!!errors.password}
                                       helperText={errors.password ? '必ず入力してください' : ''}
                                       variant="outlined"
                                       fullWidth
                                       autoComplete="password"
                                       required
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={!formState.dirty || formState.isSubmitting}>
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </Container>
    );
};

export default Signup;