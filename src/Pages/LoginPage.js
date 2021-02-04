import { render } from '@testing-library/react';
import {useState} from 'react';
import {withRouter} from 'react-router-dom';
import styled from "styled-components";
import {StyledContainer, StyledForm, StyledLabel, StyledInput, StyledLoginButton} from "../styles/FormStyles";


const StyledNewButton = styled(StyledLoginButton)`
  width: 150px;
`;

const LoginPage = ({setToken, history}) => {
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

            <StyledForm>
                <StyledLabel>Username</StyledLabel>
                <StyledInput value={username} onChange={(e) => {setUsername(e.target.value)}}/><br/>
                
                <StyledLabel>Password</StyledLabel>
                <StyledInput type='password' value={password} onChange={(e) => {setPassword(e.target.value)}}/><br/>
                
                <StyledLoginButton disabled={loading} type="button" onClick={login}>Login</StyledLoginButton>
                
            </StyledForm>
            
            <div>
              <StyledNewButton onClick={() => history.push('/signup')}>New User</StyledNewButton>
            </div>
            
        </StyledContainer>

    )
} 

export default withRouter(LoginPage);
