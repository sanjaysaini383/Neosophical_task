import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../../components';
import { validateEmail, validatePhone } from '../../utils/helpers';
export const SignUpScreen = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        // Validation
        if (!formData.name) {
            newErrors.name = 'Name is required';
        }
        if (!formData.email) {
            newErrors.email = 'Email is required';
        }
        else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!formData.phone) {
            newErrors.phone = 'Phone number is required';
        }
        else if (!validatePhone(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }
        else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        }
        else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            setLoading(true);
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));
            navigate('/location-select');
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-white flex flex-col", children: [_jsx("button", { onClick: () => navigate('/login'), className: "p-4 text-gray-700 text-xl", children: "\u2190 Back" }), _jsxs("div", { className: "flex-1 px-6 flex flex-col justify-center pb-20 md:pb-0", children: [_jsxs("div", { className: "mb-8 text-center", children: [_jsx("div", { className: "text-6xl mb-4", children: "\uD83E\uDD55" }), _jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: "Sign Up" }), _jsx("p", { className: "text-gray-600 text-sm", children: "Enter your credentials to continue" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsx(Input, { label: "Full Name", placeholder: "John Doe", value: formData.name, onChange: (e) => handleChange('name', e.target.value), error: errors.name }), _jsx(Input, { label: "Email", type: "email", placeholder: "john@example.com", value: formData.email, onChange: (e) => handleChange('email', e.target.value), error: errors.email }), _jsx(Input, { label: "Phone Number", type: "tel", placeholder: "+1 (555) 123-4567", value: formData.phone, onChange: (e) => handleChange('phone', e.target.value), error: errors.phone }), _jsx(Input, { label: "Password", type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", value: formData.password, onChange: (e) => handleChange('password', e.target.value), error: errors.password }), _jsx(Input, { label: "Confirm Password", type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", value: formData.confirmPassword, onChange: (e) => handleChange('confirmPassword', e.target.value), error: errors.confirmPassword }), _jsxs("div", { className: "flex items-start gap-2 py-4", children: [_jsx("input", { type: "checkbox", id: "terms", className: "mt-1" }), _jsxs("label", { htmlFor: "terms", className: "text-sm text-gray-600", children: ["I agree to the ", _jsx("span", { className: "text-primary-600 font-semibold", children: "Terms and Conditions" })] })] }), _jsx(Button, { fullWidth: true, size: "lg", loading: loading, children: "Create Account" })] }), _jsx("div", { className: "text-center mt-6", children: _jsxs("p", { className: "text-gray-600", children: ["Already have an account?", ' ', _jsx("button", { onClick: () => navigate('/login'), className: "text-primary-600 font-semibold hover:text-primary-700", children: "Login" })] }) })] })] }));
};
