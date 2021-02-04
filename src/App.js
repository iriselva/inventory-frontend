// import {Fragment, useEffect, useState} from 'react';
// import InventoryList from './components/pages/ItemList/ItemList';
// import NewItem from './components/pages/ItemList/NewItem';
// import '../App.css';
import { Switch, Route } from "react-router-dom";
import SignUpPage from './Pages/SignUpPage';
import LoginPage from './Pages/LoginPage';
import FrontPage from './Pages/FrontPage';
import {StyledContainer} from './styles/FormStyles';

function App() {
  // const [token, setToken] = useState();

  // useEffect ( () => {
  //   fetch (`${process.env.REACT_APP_BACKEND_URL}/test`).then((r) => {
  //     console.log(process.env)
  //   })
  //  }, []);


  //  function getCurrentUser() {
  //   const requestOptions = {
  //     method: 'GET',
  //     headers: { 'Authorization': `Bearer ${token}` }
  //   }

  //   fetch (`${process.env.REACT_APP_BACKEND_URL}/users`, requestOptions)
  //     .then((r) => {
  //       return r.json();
  //     })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //  }
  //  if (!token) {
  //    return <NewItemPage setToken={setToken}/>
  //  }

  return (
    <StyledContainer>
      <h2>Creative Inventory</h2>
      <Switch>
        <Route exact path="/">
          <FrontPage />
        </Route>
        <Route exact path="/signup">
          <SignUpPage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
      </Switch>
    </StyledContainer>
  );
}

export default App;
