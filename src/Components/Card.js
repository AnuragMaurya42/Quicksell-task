import React from 'react';
import "../css/Card.css";

const Card = ({ ticket, user }) => {
  const { id, title, tag, priority } = ticket;
  const firstNameInitial = user?.name.charAt(0).toUpperCase();

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-id">{id}</span>
        <div className="user-info">
          <div className="profile-initials" style={{ backgroundColor: getColorForUser(user.name) }}>
            {firstNameInitial}
          </div>
          {/* <span className="user-name">{user?.name}</span> */}
        </div>
      </div>
      <h1 className="card-title">{title}</h1>
      <div className="card-footer">
        <span className="feature-request">{tag[0]}</span>
      </div>
    </div>
  );
}

const getColorForUser = (userName) => {
  const colors = ['#4a90e2', '#e94e77', '#f39c12', '#8e44ad', '#16a085'];
  let hash = 0;
  for (let i = 0; i < userName.length; i++) {
    hash = userName.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

export default Card;
