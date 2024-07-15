import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';


const UserProfile = () => {
  const { user, token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user ? user.name : '',
    password: '',
    newPassword: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({ ...prevData, name: user.name }));
    }
  }, [user]);

  const { name, password, newPassword } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/auth/update', { name, password, newPassword }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setMessage('Profile updated successfully');
    } catch (err) {
      setMessage('Error updating profile');
    }
  };

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>
      {message && <p>{message}</p>}
      <form className="user-profile-form" onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Current Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>New Password:</label>
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;
