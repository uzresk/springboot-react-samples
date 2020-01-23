import axios from 'axios';

import React, {useCallback, useContext, useState} from 'react';
import {Link, useHistory, useLocation} from "react-router-dom";
import {useForm} from "react-hook-form";

import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Snackbar from "@material-ui/core/Snackbar"
import Alert from "@material-ui/lab/Alert"

import AppContext from "../../contexts/AppContexts";
import Copyright from "./Copyright";
import {LOGIN_INIT, LOGIN, LOGIN_ERROR} from "../../actions";

const Signin = () => {

    const {state, dispatch} = useContext(AppContext);
    const [messageOpen, setMessageOpen] = useState(false);
    const {register, errors, handleSubmit, formState} = useForm();
    const {loading, errorMessage} = {...state.signin};
    const history = useHistory();
    const location = useLocation();
    let {from} = location.state || {from: {pathname: "/top"}};

    const onSubmit = useCallback(async (data, e) => {
        e.preventDefault();
        dispatch({
            type: LOGIN_INIT,
        });
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            }
        };
        const json = JSON.stringify(data);
        try {
            await axios.post("/api/signin", json, axiosConfig);
            dispatch({
                type: LOGIN
            });
            history.replace(from);
        } catch (e) {
            console.log(e);
            dispatch({
                type: LOGIN_ERROR
            });
            setMessageOpen(true);
        }
    }, [dispatch, from, history]);

    const useStyles = makeStyles(theme => ({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(3),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));

    const classes = useStyles();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setMessageOpen(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AccountCircleIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                {loading && !errorMessage ? (
                    <span>loading...</span>
                ) : (
                    <Snackbar open={messageOpen} autoHideDuration={6000} onClose={handleClose}>
                        <Alert severity="error" variant="filled" onClose={handleClose}>{errorMessage}</Alert>
                    </Snackbar>
                )}
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
                        Sign In
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/signup" variant="body2">
                                Register new membership
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

export default Signin;