import "./login.scss";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { loginValidator } from "../../services/validators/authValidator";
import { Button, FadeIn } from "../../UIkit";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/authSlice";
import { useLoginMutation } from "../../services/api/authApiSlice";

export const Login = () => {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState([]);
    const [disableButton, setDisableButton] = useState(true);

    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();


    useEffect(() => {
        setErrors(loginValidator(inputs));
    }, [inputs]);

    useEffect(() => {
        setDisableButton(errors.length > 0 || inputs.email.length === 0 || inputs.password.length === 0)
    }, [errors, inputs]);

    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    };

    const handleSubmit = async (e) => {
        if (errors.length === 0) {
            e.preventDefault();
            try {
                const userData = await login(inputs).unwrap();
                dispatch(setCredentials(userData));
                setInputs({
                    email: '',
                    password: '',
                });
                navigate('/');
            } catch (error) {
                console.log(error)
                setErrors([...errors, error.data]);
            }
        }
    };



    return (
        <div className="login">
            <FadeIn>
                <div className="card">
                    <div className="left">
                        <h1>Hello World.</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <span>Don't you have an account?</span>
                        <Link to="/register">
                            <Button variant="secondary">Register</Button>
                        </Link>
                    </div>
                    <div className="right">
                        <h1>Login</h1>
                        {errors.length > 0 && <Alert severity="error">
                            {errors.map(error => (
                                <div key={error}>• {error} <br /></div>
                            ))}
                        </Alert>}
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="Email" value={inputs.email} name="email" onChange={handleChange} />
                            <input type="password" placeholder="Password" value={inputs.password} name="password" onChange={handleChange} />
                            <Button disabled={disableButton} isLoading={isLoading}>Login</Button>
                        </form>
                    </div>
                </div>
            </FadeIn>
        </div>
    );
};