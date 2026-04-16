import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';
export const VerificationScreen = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(['', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    useEffect(() => {
        if (timer > 0 && !canResend) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
        else if (timer === 0) {
            setCanResend(true);
        }
        return undefined;
    }, [timer, canResend]);
    const handleOtpChange = (index, value) => {
        if (!/^\d*$/.test(value))
            return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(0, 1);
        setOtp(newOtp);
        // Move to next input
        if (value && index < 3) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };
    const handleBackspace = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };
    const handleSubmit = async () => {
        const otpCode = otp.join('');
        if (otpCode.length !== 4) {
            alert('Please enter a valid OTP');
            return;
        }
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        navigate('/location-select');
    };
    const handleResend = () => {
        setTimer(60);
        setCanResend(false);
        setOtp(['', '', '', '']);
        // Simulate resend API call
    };
    return (_jsxs("div", { className: "min-h-screen bg-white flex flex-col", children: [_jsx("button", { onClick: () => navigate('/login'), className: "p-6 text-gray-700", children: "\u2190 Back" }), _jsxs("div", { className: "flex-1 px-6 flex flex-col justify-center", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: "Verify Phone Number" }), _jsx("p", { className: "text-gray-600", children: "Enter the 4-digit code sent to your phone" })] }), _jsx("div", { className: "flex justify-center gap-4 mb-8", children: otp.map((digit, index) => (_jsx("input", { id: `otp-${index}`, type: "text", inputMode: "numeric", maxLength: 1, value: digit, onChange: (e) => handleOtpChange(index, e.target.value), onKeyDown: (e) => handleBackspace(index, e), className: "w-16 h-16 text-3xl font-bold text-center border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none", autoFocus: index === 0 }, index))) }), _jsx("div", { className: "text-center mb-8", children: !canResend ? (_jsxs("p", { className: "text-gray-600", children: ["Resend code in ", _jsxs("span", { className: "font-semibold text-primary-600", children: [timer, "s"] })] })) : (_jsx("button", { onClick: handleResend, className: "text-primary-600 font-semibold hover:text-primary-700", children: "Resend Code" })) }), _jsx(Button, { fullWidth: true, size: "lg", loading: loading, onClick: handleSubmit, disabled: otp.some((digit) => !digit), children: "Verify" })] })] }));
};
