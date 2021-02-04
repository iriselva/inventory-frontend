import React, { useState } from "react";

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function SignUp() {
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

    fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, requestOptions)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          const err = new Error();
          err.status = response.status;
          throw err;
        }
        return response.json();
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        if (err.status === 409) {
          alert('This email is already in use');
        } else {
          console.log(err);
          console.log(err.status);
          alert('Something went wrong, try again later');
        }
      })
      .finally(() => setLoading(false))
  }

  return (
    <div>
      <div className="signUp">
        <form>
          <label>Username:
          <input value={username} onChange={(e) => {setUsername(e.target.value)}}/>
          </label>
          <label>Email:
          <input type='email' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
          </label>
          <label>Password:
          <input type='password' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
          </label>
          <label>Confirm Password:
          <input type='password' value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}}/>
          </label>
          <button disabled={loading} type="button" onClick={SignUp}>Register</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
