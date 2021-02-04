import { render } from '@testing-library/react';
import {useState} from 'react';
import styled from "styled-components";
import {StyledContainer, StyledForm, StyledLabel, StyledInput, StyledLoginButton} from "./FormStyles";
import SignUpPage from './SignUpPage';


const StyledNewButton = styled.button`
  border: none;
  background-color: #505050;
  color: white;
  border-radius: 4px;
  font-weight: bold;
  padding: 4px;
  width: 150px;
    &:hover {
      background-color: #303030;
    }
`;

const LoginPage = ({setToken}) => {
  const [showSignup, setShowSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  function login() {
    const formData = new FormData();

    formData.append('username', username);
    formData.append('password', password);

    const requestOptions = {
      method: 'POST',
      /* headers: { 'Content-Type': 'application/json' }, */
      body: formData
    }
    setLoading(true);
    fetch (`${process.env.REACT_APP_BACKEND_URL}/token`, requestOptions)
      .then((r) => {
        return r.json();
      })
      .then((response) => {
        setToken(response.access_token);
        
        console.log(response);
      }).finally(() => setLoading(false))
   }

    return (
        <StyledContainer className="App">

          <h2>Art Inventory</h2>
            <StyledForm>
                <StyledLabel>Username</StyledLabel>
                <StyledInput value={username} onChange={(e) => {setUsername(e.target.value)}}/><br/>
                
                <StyledLabel>Password</StyledLabel>
                <StyledInput type='password' value={password} onChange={(e) => {setPassword(e.target.value)}}/><br/>
                
                <StyledLoginButton disabled={loading} type="button" onClick={login}>Login</StyledLoginButton>
                
            </StyledForm>
            
            <div>
              <StyledNewButton onClick={() => setShowSignup(!showSignup)}>New User</StyledNewButton>
            </div>
            
          {showSignup && <SignUpPage onSignupDone={() => setShowSignup(false)} />}
        </StyledContainer>

    )

} 

export default LoginPage