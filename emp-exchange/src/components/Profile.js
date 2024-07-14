import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="container">
      <h2>Profile</h2>
      {user ? (
        <div>
          <p>Email: {user.email}</p>
          <button onClick={logout} className="btn btn-primary">Logout</button>
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default Profile;
