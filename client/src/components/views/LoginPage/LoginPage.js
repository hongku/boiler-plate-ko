import * as React from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../store/actions/userAction';

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
  const dispatch = useDispatch();
  
  const [value, setValue] = React.useState({
    email: '',
    password: ''
  });

  const handleInputChange = (key) => (event) => {
    const inputValue = event.target.value;
    setValue({ ...value, [key]: inputValue });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const requestBody = {
      email: value.email,
      password: value.password
    }

    dispatch(loginUser(requestBody));
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
