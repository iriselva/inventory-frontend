import {useState} from 'react';
// import '../App.css';
import { Switch, Route, Redirect } from "react-router-dom";
import SignUpPage from './Pages/SignUpPage';
import LoginPage from './Pages/LoginPage';
import MainPage from './Pages/MainPage';
import { StyledContainer } from './styles/FormStyles';

function App({history}) {
  const [token, setToken] = useState();

  return (
    <StyledContainer>
      <h2>Creative Inventory</h2>
      <Switch>
        <Route exact path="/signup">
          <SignUpPage history={history} />
        </Route>
        <Route exact path="/login">
          <LoginPage setToken={setToken}/>
        </Route>
          <Route exact path="/inventory">
            {token ? <MainPage token={token}/> : <Redirect to="/login" />}
          </Route>
      </Switch>
    </StyledContainer>
  );
}

export default App;
