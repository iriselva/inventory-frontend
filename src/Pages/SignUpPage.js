import React, {useEffect, useState} from "react";
import {withRouter} from 'react-router-dom';
import {StyledContainer, StyledForm, StyledLabel, StyledInput, StyledLoginButton, StyledSuccessMsg} from "../styles/FormStyles";


const SignUpPage = ({history}) => {
  const [showSuccessMsg, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (showSuccessMsg) {
      setTimeout(() => {
        history.push('/login');
      }, 3000)
    }

  }, [showSuccessMsg]);

  async function SignUp() {
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    const data = JSON.stringify({
      username: username,
      email: email,
      password: password,
    });

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,
    }

    setLoading(true);
    
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, requestOptions)
      const returnData = await response.json();
      if (response.status < 200 || response.status >= 300) {
        const err = new Error(returnData?.detail ?? 'Something went wrong, try again later');
        err.status = response.status;
        throw err;
      }
      setShowSuccess(true);
    } catch(err) { 
        if (err.status === 409) {
          alert('This email is already in use');
        } else {
          alert(err);
        }
    }
     
    setLoading(false);
   
  }

  return (
    <div>
      <StyledContainer>
        <StyledForm>
          <StyledLabel>Username</StyledLabel>
          <StyledInput value={username} onChange={(e) => {setUsername(e.target.value)}}/><br/>
          
          <StyledLabel>Email</StyledLabel>
          <StyledInput type='email' value={email} onChange={(e) => {setEmail(e.target.value)}}/><br/>
          
          <StyledLabel>Password</StyledLabel>
          <StyledInput type='password' value={password} onChange={(e) => {setPassword(e.target.value)}}/><br/>
          
          <StyledLabel>Confirm Password</StyledLabel>
          <StyledInput type='password' value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}}/><br/>
          
          <StyledLoginButton disabled={loading} type="button" onClick={SignUp}>Register</StyledLoginButton>
        </StyledForm>
        {showSuccessMsg && <StyledSuccessMsg>Success! Redirecting to login page...</StyledSuccessMsg>}
      </StyledContainer>
    </div>
  );
}

export default withRouter(SignUpPage);
