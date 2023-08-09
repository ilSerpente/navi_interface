import React, { useState } from 'react';
import axios from 'axios';

export default function SignUp() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [message, setMessage] = useState('');
    const [emailExists, setEmailExists] = useState(false);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setEmailExists(false);
        setMessage('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/signup', formData);
            setMessage('Successfully registered!');
            const { access_token } = response.data;
            localStorage.setItem('access_token', access_token);

        } catch (error) {
            if (error.response && error.response.status === 409) {
                setMessage('Email already exists!');
                setEmailExists(true);
            } else {
                setMessage('An error occurred');
            }
        }

        setFormData({
            email: '',
            password: '',
        });
    };

    return (
        <div className="signup-container">
            <h2>Sign Up!</h2>
            <p className={emailExists ? 'error-message' : 'success-message'}>{message ? message : ""}</p>
            <form onSubmit={handleSubmit} className="signup-form">
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="submit-button">Sign Up</button>
            </form>
        </div>
    );
}

