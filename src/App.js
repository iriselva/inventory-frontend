import {Fragment, useEffect, useState} from 'react';
import logo from './logo.svg';
import LoginPage from './LoginPage';
import './App.css';

function App() {
  const [token, setToken] = useState();

  useEffect ( () => {
    fetch (`${process.env.REACT_APP_BACKEND_URL}/test`).then((r) => {
      console.log(process.env)
    })
   }, []);


   function getCurrentUser() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    }

    fetch (`${process.env.REACT_APP_BACKEND_URL}/users`, requestOptions)
      .then((r) => {
        return r.json();
      })
      .then((response) => {
        console.log(response);
      })
   }
   if (!token) {
     return <LoginPage setToken={setToken}/>
   }

  return (
    <div className="App">
      Inventory page here
    </div>
  );
}

export default App;
