import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('sessions', { id });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      // console.log(`Logged Successfuly:  ${response.data.name}`);
      history.push('/profile');
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }

  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be the Hero"/>
        <form onSubmit={handleLogin}>
          <h1>Please Login</h1>
          <input 
            placeholder="Your ID" 
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">Login</button>

          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#E02041" />
            Not registered yet?
          </Link>
        </form>

      </section>
      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}
