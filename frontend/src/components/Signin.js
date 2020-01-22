import React, {useContext} from 'react';
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
import AppContext from "../contexts/AppContexts";
import {LOGIN} from "../actions";

const Signin = () => {

    const {state, dispatch} = useContext(AppContext);
    const {register, errors, handleSubmit, formState} = useForm();
    const history = useHistory();
    const location = useLocation();
    let {from} = location.state || {from: {pathname: "/top"}};

    const onSubmit = async data => {
        // const json = JSON.stringify(data)
        // console.log(json);
        // let axiosConfig = {
        //     headers: {
        //         'Content-Type': 'application/json;charset=UTF-8',
        //     }
        // };
        // await axios.post("/api/signin", json, axiosConfig);
        // history.push('/top');
        dispatch({type: LOGIN});
        console.log(from);
        history.replace(from);
    };

    function Copyright() {
        return (
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <a color="inherit" href="https://">
                    your web site
                </a>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

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
                    <AccountCircleIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
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