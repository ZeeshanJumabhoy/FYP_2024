import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { generateOTP, verifyOTP, register } from '../Helper/helper';
import { useNavigate, useLocation } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import '../Styles/card.css';
import "../Styles/tailwind.css";

export default function OTPVerification() {
  const [otp, setOtp] = useState('');
  const [otpGenerated, setOtpGenerated] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);  // Add verifying state
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;  
  //const username = location.state?
  const username = email;

  const sendOTP = () => {
    const sendPromise = generateOTP(username);
    toast.promise(sendPromise, {
      loading: 'Sending OTP...',
      success: <b>OTP has been sent to your email.</b>,
      error: <b>Problem while generating OTP...!</b>,
    });
  };

  const sendFirstOTP = (e) => {
    e.preventDefault();
    if (!otpGenerated) {
      setOtpGenerated(true);
      sendOTP();
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsVerifying(true);  // Set verifying state
    try {
      const { status } = await verifyOTP({ email: username, otp });
      if (status === 201) {
        const registerPromise = register(location.state);  // Use location.state to get registration values
        toast.promise(registerPromise, {
          loading: 'Creating...',
          success: (res) => {
            navigate('/');
            return <b>Registered Successfully</b>;
          },
          error: (err) => {
            return <b>{err.message || 'Could Not Register...!'}</b>;
          },
        });
      }
    } catch (error) {
      toast.error('Invalid OTP!, Check email again.');
    } finally {
      setIsVerifying(false);  // Reset verifying state
    }
  };

  return (
    <div className="gradient-bg">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex justify-center items-center h-full py-10">
        <div className="glass-form">
          <div className="title flex flex-col items-center">
            <h4 className="text-4xl font-bold">OTP Verification</h4>
            <span className="py-2 text-lg w-2/3 text-center text-gray-500">
              {otpGenerated
                ? 'Verify OTP to complete registration.'
                : 'Generate OTP and verify your account registration.'}
            </span>
          </div>

          <form className="pt-5">
            <div className="textbox flex flex-col items-center justify-center gap-6">
              <span className="py-4 text-left text-blue-700">
                {otpGenerated
                  ? 'Enter the 6-digit OTP sent to your registered email.'
                  : 'The OTP will be sent to your registered email.'}
              </span>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                separator={<span style={{ width: '8px' }}></span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    className="otp-input"
                    disabled={!otpGenerated}
                  />
                )}
                isInputNum={true}
                shouldAutoFocus={true}
              />
              {otpGenerated ? (
                <button className="btn" onClick={onSubmit} disabled={isVerifying}>
                  {isVerifying ? 'Verifying...' : 'Verify OTP'}
                </button>
              ) : (
                <button className="btn" onClick={sendFirstOTP}>
                  Generate OTP
                </button>
              )}
            </div>
          </form>

          <div className="text-center py-2">
            {otpGenerated ? (
              <span>
                Can't get OTP?{' '}
                <button className="text-green-600 link" onClick={sendOTP}>
                  Resend
                </button>
              </span>
            ) : (
              <span className="text-red-500">Don't refresh or leave the page.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
