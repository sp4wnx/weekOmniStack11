import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const ongId = localStorage.getItem('ongId');

  const history = useHistory();

  async function handleNewPost(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    }

    try {
      await api.post('posts', data, {
        headers: {
          Authorization: ongId
        }
      });

      history.push('/profile');
    } catch(error) {
      alert(`Error trying to save your new post, please try again later. ErrorMessage: ${error.message}`);
    }
  }

  return (
    <div className="new-post-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the Hero" />

          <h1>Register New Post</h1>
          <p>Describe your Post.</p>

          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="#E02041" />
            Back
          </Link>
        </section>

        <form onSubmit={handleNewPost}>
          <input 
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            />

          <textarea 
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            />

          <input 
            placeholder="Cost"
            value={value}
            onChange={e => setValue(e.target.value)}
            />

          <button className="button" type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}
