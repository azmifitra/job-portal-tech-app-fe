import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/slices/authSlice';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [seePassword, setSeePassword] = useState(false);

  const changeLoginFormInput = (e) => {
    const value = e.target.value;
    const field = e.target.name;
    setLoginForm({
      ...loginForm,
      [field]: value,
    });
  };
  useEffect(() => {
    if (auth.loginStatus === 'success') {
      navigate('/');
    }
  }, [auth.loginStatus]);

  const doLogin = () => {
    dispatch(loginUser(loginForm));
  };

  return (
    <div className="pageWrapper flex justify-center marker:flex-col">
      <div className="formLoginWrapper">
        <h1>Login</h1>
        <form className="mt-6">
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" className="inputLogin mt-2" required value={loginForm.email} onChange={(e) => changeLoginFormInput(e)} />
          </div>
          <div className="relative mb-2">
            <label htmlFor="password">Password</label>
            <input type={seePassword ? 'text' : 'password'} name="password" className="inputLogin mt-2 pr-16" required value={loginForm.password} onChange={(e) => changeLoginFormInput(e)} />
            {seePassword ? (
              <AiOutlineEyeInvisible className="absolute bottom-2 right-4 cursor-pointer text-2xl text-gray-500" onClick={() => setSeePassword(false)} />
            ) : (
              <AiOutlineEye className="absolute bottom-2 right-4 cursor-pointer text-2xl text-gray-500" onClick={() => setSeePassword(true)} />
            )}
          </div>
          <p className="warningError">{auth.loginError}</p>
          <div className="mt-6">
            <button
              type="submit"
              value="Submit"
              className="buttonLogin"
              onClick={(el) => {
                el.preventDefault();
                doLogin();
              }}
            >
              {auth.loginStatus === 'pending' ? <div className="miniLoader"></div> : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
