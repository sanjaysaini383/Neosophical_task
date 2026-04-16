import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';

export const VerificationScreen: React.FC = () => {
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
    } else if (timer === 0) {
      setCanResend(true);
    }
    return undefined;
  }, [timer, canResend]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    // Move to next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  const handleBackspace = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
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

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <button
        onClick={() => navigate('/login')}
        className="p-6 text-gray-700"
      >
        ← Back
      </button>

      {/* Content */}
      <div className="flex-1 px-6 flex flex-col justify-center">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Phone Number</h1>
          <p className="text-gray-600">Enter the 4-digit code sent to your phone</p>
        </div>

        {/* OTP Input */}
        <div className="flex justify-center gap-4 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleBackspace(index, e)}
              className="w-16 h-16 text-3xl font-bold text-center border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
              autoFocus={index === 0}
            />
          ))}
        </div>

        {/* Timer / Resend */}
        <div className="text-center mb-8">
          {!canResend ? (
            <p className="text-gray-600">
              Resend code in <span className="font-semibold text-primary-600">{timer}s</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-primary-600 font-semibold hover:text-primary-700"
            >
              Resend Code
            </button>
          )}
        </div>

        {/* Submit Button */}
        <Button
          fullWidth
          size="lg"
          loading={loading}
          onClick={handleSubmit}
          disabled={otp.some((digit) => !digit)}
        >
          Verify
        </Button>
      </div>
    </div>
  );
};
