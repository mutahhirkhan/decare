import React, { useState } from 'react'
import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import { LoadingButton } from '../LoadingButton/LoadingButton';
import { useStore } from '../../context/GlobalState';
import { authenticateAsync } from '../../store/actions/authActions';
import { useHistory } from 'react-router-dom';
import { Avatar, Box, CardContent, CssBaseline, makeStyles, TextField } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    overrides: {
        MuiInput: {
            root: {
                background: '#007BF',
            },
        },
    },
    notchedOutline: {
        borderWidth: '1px',
        borderColor: '##007BF !important',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        minWidth: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(5),
    },
}));

export const SignIn = () => {
    const [{ auth, appState }, dispatch] = useStore();
    const [isSignUp, setIsSignUp] = useState(false);
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const routeHistory = useHistory();

    const onEmailChanged = (e) => {
        setEmail(e.target.value);
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        setIsEmailValid(re.test(String(e.target.value).toLowerCase()));
    }

    const onPasswordChanged = (e) => {
        setPassword(e.target.value);
        setIsPasswordValid(e.target.value?.length > 0);
    }

    const authenticateHandler = async (e) => {
        let wasSuccess = await authenticateAsync(appState.currentAccount, email, password, isSignUp, dispatch);
        if (wasSuccess) {
            if (isSignUp) {
                routeHistory.push('/profile');
            }
            else {
                routeHistory.push('/campaigns');
            }
        }
    }

    return (
        <Container component="main" maxWidth="md" style={{ marginTop: '7%', marginBottom: '5%' }} className="login-container">
            <div style={{padding:"10px 0", borderRadius: "10px", boxShadow: "0px 0px 12px 1px rgba(0, 0, 0, 0.2)" }}>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar} alt="icon" style={{ height: "100px", width: "100px" }} />
                    <div className="smallHeading" style={{ color: "#007BFF" }}><h1>Please Login</h1></div>
                    <form className={classes.form} style={{ padding: "20px" }} noValidate>
                        <div style={{ paddingTop: "20px" }}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                autoFocus
                                required
                                id="email"
                                name="email"
                                autoComplete="email"
                                label="Email"
                                placeholder='Enter a Email'
                                className="inputStyle"
                                InputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline,
                                    },
                                }}
                                value={email}
                                onChange={(e) => onEmailChanged(e)}
                                isInvalid={!isEmailValid}
                            />
                        </div>

                        <div style={{ paddingTop: "20px" }}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                autoFocus
                                required
                                id="password"
                                name="password"
                                label="Password"
                                placeholder='Enter a Password'
                                className="inputStyle"
                                InputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline,
                                    },
                                }}
                                value={password}
                                onChange={(e) => onPasswordChanged(e)}
                                isInvalid={!isPasswordValid}
                            />
                        </div>

                        {/* Sign in */}
                        <div style={{ paddingTop: "20px" }}>
                            <LoadingButton isloading={auth.isLoading} onClick={(e) => authenticateHandler(e)}>
                                {isSignUp ? 'Sign Up' : 'Sign In'}
                            </LoadingButton>
                        </div>

                        {
                            isSignUp &&
                            <div>
                                <p>NOTE: This metamask account will be linked to your account permenantly and you cannot change it later!</p>
                                <p>Selected Account: <b>{appState.currentAccount}</b></p>
                            </div>
                        }

                        {/* Sign in/up toggle */}
                        <div style={{ textDecoration: 'none', marginTop: '10px' }}>
                            <a style={{ textDecoration: 'none' }}
                                className='text-align-center mt-5'
                                onClick={() => setIsSignUp(!isSignUp)}
                                href="#">{isSignUp ? 'Already have an account? Sign In!' : "Don't have an account? Sign Up!"}</a>
                        </div>
                    </form>
                </div>
            </div>

        </Container >
    );
}