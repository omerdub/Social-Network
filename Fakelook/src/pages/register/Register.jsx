import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { registerValidator } from "../../services/validators/authValidator";
import { Alert } from "@mui/material";
import { Button, FadeIn } from "../../UIkit";
import { useRegisterMutation } from "../../services/api/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/authSlice";



export const Register = () => {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        name: '',
    });
    const [errors, setErrors] = useState([]);
    const [disableButton, setDisableButton] = useState(true);

    const [register, { isLoading }] = useRegisterMutation();
    const dispatch = useDispatch();


    const navigate = useNavigate();

    useEffect(() => {
        setErrors(registerValidator(inputs));
    }, [inputs]);

    useEffect(() => {
        setDisableButton(errors.length > 0 || inputs.email.length === 0 || inputs.password.length === 0 || inputs.name.length === 0)
    }, [errors, inputs]);

    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    };

    const handleNameChange = (e) => {
        const value = e.target.value;
        const letters = /^[A-Za-z ]+$/;;
        if (value === '' || letters.test(value)) {
            handleChange(e);
        }
    }

    const handleSubmit = async (e) => {
        if (errors.length === 0) {
            e.preventDefault();
            try {
                const userData = await register(inputs).unwrap();
                console.log(userData);
                dispatch(setCredentials(userData));
                setInputs({
                    email: '',
                    password: '',
                    name: '',
                });
                navigate('/');
            } catch (error) {
                console.log(error);
                setErrors([...errors, error.data]);
            }
        }
    };

    return (
        <div className="register">
            <FadeIn>
                <div className="card">
                    <div className="left">
                        <h1>Fakelook</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <span>Do you have an account?</span>
                        <Link to="/login">
                            <Button variant="secondary">Login</Button>
                        </Link>
                    </div>
                    <div className="right">
                        <h1>Register</h1>
                        {errors.length > 0 && <Alert severity="error">
                            {errors.map(error => (
                                <div key={error}>• {error} <br /></div>
                            ))}
                        </Alert>}
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="Email" value={inputs.email} name="email" onChange={handleChange} />
                            <input type="password" placeholder="Password" value={inputs.password} name="password" onChange={handleChange} />
                            <input type="text" placeholder="Name" value={inputs.name} name="name" onChange={handleNameChange} />
                            <Button disabled={disableButton} isLoading={isLoading}>Register</Button>
                        </form>
                    </div>
                </div>
            </FadeIn>
        </div>
    );
}