import React, { useState } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


function LoginForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    loginType: 'name',
    identifier: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    console.log("1");
    e.preventDefault();
    try {
      console.log('Форма отправлена:', formData);
    
      const requestData = {
      };
  
      if (formData.loginType === 'name') {
        requestData.name = formData.identifier;
      } else if (formData.loginType === 'phone_number') {
        requestData.phone_number = formData.identifier;
      }
      requestData.password = formData.password;
  
      console.log('Отправляемые данные на сервер:', requestData);
  
      const response = await Axios.post('/api/auth/signin', requestData);
  
      console.log('Ответ от сервера:', response.data);
  
      localStorage.setItem('token', response.data.token);
      Axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
  
      navigate('/profile', { replace: true });
    } catch (error) {
      console.log('Full responce from server:', error.response);
      console.error('Ошибка при отправке данных:', error);
    }
  };

  return (
    <div>
      <h2>SignIn</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Login Type:</label>
          <select
            name="loginType"
            className=""
            value={formData.loginType}
            onChange={handleInputChange}
          >
            <option value="name">Username</option>
            <option value="phone_number">Phone Number</option>
          </select>
        </div>
        <div>
          <label>{formData.loginType === 'name' ? 'Name' : 'Phone Number'}:</label>
          <input
            type={formData.loginType === 'phone_number' ? 'tel' : 'text'}
            name="identifier"
            className=""
            placeholder={formData.loginType === 'name' ? 'Name' : 'Phone Number'}
            value={formData.identifier}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Войти</button>
      </form>
      <p>
        Нет аккаунта? <Link to="/signup">Зарегистрироваться</Link>
      </p>
    </div>
  );
}

export default LoginForm;