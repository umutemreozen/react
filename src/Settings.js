import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Redirecting to Dashboard
import './Settings.css';

function Settings() {
  const [profileImage, setProfileImage] = useState(null);
  const [bio, setBio] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleSave = () => {
    // Save profile image and bio to localStorage for demonstration purposes
    localStorage.setItem('profileImage', profileImage);
    localStorage.setItem('bio', bio);

    // Navigate back to the Dashboard
    navigate('/dashboard');
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <div className="profile-image-container">
        <img
          src={profileImage || localStorage.getItem('profileImage') || 'default-profile.png'}
          alt="Profile"
          className="profile-image"
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <div className="bio-container">
        <textarea
          value={bio}
          onChange={handleBioChange}
          placeholder="Enter your bio..."
        />
      </div>
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
}

export default Settings;
