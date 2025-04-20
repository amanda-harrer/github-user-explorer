import React from 'react';

function UserProfile({ user }) {
  if (!user) return null;

  return (
    <div>
      <img
        src={user.avatar_url}
        alt="avatar"
        width={100}
        style={{ borderRadius: '50%' }}
      />
      <h2>{user.name}</h2>
      <p>{user.login}</p>
      <p>Joined {user.created_at}</p>
      <p>{user.bio}</p>
      <p>📍 {user.location}</p>
      <p>{user.blog}</p>
      <p>{user.public_repos}</p>
      <p>{user.followers}</p>
      <p>{user.following}</p>
    </div>
  );
}

export default UserProfile;
