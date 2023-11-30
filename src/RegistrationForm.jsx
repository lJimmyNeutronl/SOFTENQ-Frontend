import React, { useState } from 'react';
import Axios from 'axios';
import { Link, useNavigate} from 'react-router-dom'; 
function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number:'',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     console.log('Data of srever', formData);
      const response = await Axios.post('/api/auth/signup', formData);
      console.log('Ответ от сервера:', response.data);

  
      localStorage.setItem('token',response .data.token);

      Axios.defaults.headers.common['Authorization'] = 'Bearer ${token}';
   
      navigate('/profile', {replace: true});
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
  };

  return (
    <div className= 'registration-container'>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Имя пользователя:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Электронная почта:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Телефонный номер:</label>
          <input
            type="number"
            name="phone_number"
            value={formData.phone_number}
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
        <button type="submit">Зарегистрироваться</button>
      </form>
      <p>
        Уже есть аккаунт? <Link to="/signin">Войти</Link>
      </p>
    </div>
  );
}

export default RegistrationForm;