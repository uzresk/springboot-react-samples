import React, {useCallback} from 'react';
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
import {makeStyles} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";

import Copyright from "./Copyright";

const Signup = () => {

    const {register, errors, handleSubmit, formState} = useForm();
    const history = useHistory();

    const onSubmit = useCallback(async (data, e) => {
        e.preventDefault();
        const json = JSON.stringify(data);
        console.log(json);
        let axiosConfig = {
            headers: {
                'content-type': 'application/json;charset=utf-8',
            }
        };
        await axios.post("/api/signup", json, axiosConfig);
        history.push('/');
    },[]);

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