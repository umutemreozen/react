import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const initialPosts = [
  {
    id: 1,
    username: 'JohnDoe',
    profileImage: '/images/profile1.jpg',
    postImage: '/images/post1.jpg',
    description: 'Exploring the world!',
    likes: 120,
    comments: [
      { id: 1, username: 'JaneDoe', text: 'Amazing view!' },
      { id: 2, username: 'MarkSmith', text: 'Wish I was there!' },
    ],
  },
  {
    id: 2,
    username: 'JaneDoe',
    profileImage: '/images/profile2.jpg',
    postImage: '/images/post2.jpg',
    description: 'Had a great day at the beach!',
    likes: 80,
    comments: [
      { id: 3, username: 'JohnDoe', text: 'Looks like fun!' },
      { id: 4, username: 'EmilyJones', text: 'Jealous!' },
    ],
  },
  {
    id: 3,
    username: 'MarkSmith',
    profileImage: '/images/profile3.jpg',
    postImage: '/images/post3.jpg',
    description: 'Hiking adventure!',
    likes: 90,
    comments: [
      { id: 5, username: 'SarahLee', text: 'Beautiful scenery!' },
      { id: 6, username: 'TomBrown', text: 'Great hike!' },
    ],
  },
];

function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [posts, setPosts] = useState(initialPosts);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="dashboard-container">
      <header>
        <button onClick={handleMenuToggle}>☰</button>
        <h1>Welcome, {localStorage.getItem('username')}</h1>
        <div className="profile-image-container">
          <img
            src={localStorage.getItem('profileImage') || '/images/default-profile.png'}
            alt="Profile"
            className="profile-image"
          />
        </div>
      </header>
      {isMenuOpen && (
        <nav className="sidebar">
          <ul>
            <li><Link to="/settings">Settings</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </nav>
      )}
      <div className="content">
        {posts.map(post => (
          <div key={post.id} className="post">
            <div className="post-header">
              <img src={post.profileImage} alt={post.username} className="profile-image" />
              <span className="username">{post.username}</span>
            </div>
            <img src={post.postImage} alt="Post" className="post-image" />
            <div className="post-body">
              <div className="post-description">{post.description}</div>
              <div className="post-footer">
                <button className="like-button">Like ({post.likes})</button>
                <div className="comments">
                  {post.comments.map(comment => (
                    <div key={comment.id} className="comment">
                      <strong>{comment.username}:</strong> {comment.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
