import * as React from 'react';
import axios from 'axios';

const LoginPageWrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  wdith: '100%',
  height: '100vh'
}
const FormStyle = {
  display: 'flex',
  flexDirection: 'column'
}

export default function LoginPage() {
  const [value, setValue] = React.useState({
    email: '',
    password: ''
  });

  const handleInputChange = (key) => (event) => {
    const value = event.target.value;
    setValue({ ...value, [key]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestBody = {
      email: value.email,
      password: value.password
    }

    const response = await axios.post('/api/users/login', requestBody);

    if (response.status === 200) {
      console.log('Login Success');
    } else {
      console.log(response);
    }
  };
  
  return (
    <div style={LoginPageWrapperStyle}>
      <form style={FormStyle} onSubmit={handleSubmit}>
        <label>Email</label>
        <input type='email' value={value.email} onChange={handleInputChange('email')} />
        <label>Password</label>
        <input type='password' autoComplete='new-password' value={value.password} onChange={handleInputChange('password')} />
        <br />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}
