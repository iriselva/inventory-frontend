import {useState} from 'react';

const LoginPage = ({setToken}) => {
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
        <div className="App">
            <form>
                <label>Username:
                <input value={username} onChange={(e) => {setUsername(e.target.value)}}/>
                </label>
                <label>Password:
                <input type='password' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                </label>
                <button disabled={loading} type="button" onClick={login}>Login</button>
            </form>
        </div>
    )

} 

export default LoginPage