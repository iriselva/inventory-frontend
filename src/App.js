import {useState} from 'react';
import ItemList from './components/pages/ItemList/ItemList';
// import NewItem from './components/pages/ItemList/NewItem';
// import '../App.css';
import { Switch, Route, useHistory } from "react-router-dom";
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
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route exact path="/signup">
          <SignUpPage history={history} />
        </Route>
        <Route exact path="/login">
          <LoginPage setToken={setToken}/>
        </Route>
        {token && 
          <Route exact path="/inventory">
            <ItemList token={token}/>
          </Route>
        }
      </Switch>
    </StyledContainer>
  );
}

export default App;
