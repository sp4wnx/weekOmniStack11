import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
  const [posts, setPosts] = useState([]);

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  const history = useHistory();

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId
      }
    }).then(response => {
      console.log(response.data);
      setPosts(response.data);
    })
  }, [ongId]);

  async function handleDeletePost(id) {
    try {
      api.delete(`posts/${id}`, {
        headers: {
          Authorization: ongId
        }
      });

      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      alert(`Error trying to delete Post. ERROR Message: ${error.message}`);
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero"/>
        <span>Welcome, {ongName}</span>

        <Link className="button" to="/posts/new">Register new Post</Link>
        <button type="button">
          <FiPower 
            size={18} 
            color="#E02041" 
            onClick={handleLogout}
          />
        </button>
      </header>

      <h1>Registered Posts</h1>

      <ul>
        { posts.map(post => (
          <li key={post.id}>
            <strong>Title:</strong>
            <p>{ post.title }</p>

            <strong>Description:</strong>
            <p>{ post.description }</p>

            <strong>Cost:</strong>
            <p>{ Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR' }).format(post.value) }</p>
            
            <button type="button">
              <FiTrash2 
                size={20} 
                color="#a8a8b3" 
                onClick={() => handleDeletePost(post.id)}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
