import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../../components';
import { validateEmail } from '../../utils/helpers';
export const LoginScreen = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        // Validation
        if (!email) {
            newErrors.email = 'Email is required';
        }
        else if (!validateEmail(email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!password) {
            newErrors.password = 'Password is required';
        }
        else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            setLoading(true);
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));
            navigate('/verification');
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-white flex flex-col", children: [_jsx("button", { onClick: () => navigate('/onboarding'), className: "p-4 text-gray-700 text-xl", children: "\u2190 Back" }), _jsxs("div", { className: "flex-1 px-6 flex flex-col justify-center pb-20 md:pb-0", children: [_jsxs("div", { className: "mb-8 text-center", children: [_jsx("div", { className: "text-6xl mb-4", children: "\uD83E\uDD55" }), _jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: "Logging" }), _jsx("p", { className: "text-gray-600 text-sm", children: "Enter your emails and password" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsx(Input, { label: "Email", type: "email", placeholder: "john@example.com", value: email, onChange: (e) => {
                                    setEmail(e.target.value);
                                    if (errors.email)
                                        setErrors({ ...errors, email: undefined });
                                }, error: errors.email }), _jsx(Input, { label: "Password", type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", value: password, onChange: (e) => {
                                    setPassword(e.target.value);
                                    if (errors.password)
                                        setErrors({ ...errors, password: undefined });
                                }, error: errors.password }), _jsx(Button, { fullWidth: true, size: "lg", loading: loading, children: "Login" })] }), _jsxs("div", { className: "flex items-center gap-4 my-6", children: [_jsx("div", { className: "flex-1 h-px bg-gray-200" }), _jsx("span", { className: "text-gray-500 text-sm", children: "Or" }), _jsx("div", { className: "flex-1 h-px bg-gray-200" })] }), _jsx("button", { className: "w-full border-2 border-gray-200 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 mb-4", children: "Sign in with Google" }), _jsx("div", { className: "text-center", children: _jsxs("p", { className: "text-gray-600", children: ["Don't have an account?", ' ', _jsx("button", { onClick: () => navigate('/signup'), className: "text-primary-600 font-semibold hover:text-primary-700", children: "Sign Up" })] }) })] })] }));
};
