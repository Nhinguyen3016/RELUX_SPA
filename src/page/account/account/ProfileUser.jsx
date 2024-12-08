import React, { useState, useEffect } from "react";
import axios from "axios";
import profileImage from "../../../images/main_profile.jpg";
import "../../../styles/account/account/ProfileUser.css";
import defaultAvatar from "../../../images/avatar_pf.jpg"; 
import { useNavigate } from "react-router-dom";

const API_HOST = process.env.REACT_APP_API_HOST || "http://localhost:3000";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setErrorMessage("Authentication token not found. Please login again.");
        return;
      }

      try {
        const response = await axios.post(
          `${API_HOST}/v1/profile`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data && response.data.data) {
          setUserInfo(response.data.data);
        } else {
          setErrorMessage("Failed to fetch user profile.");
        }
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message || "An error occurred while fetching profile."
        );
      } finally {
        setLoading(false); 
      }
    };

    fetchUserProfile();

    // Retrieve avatar from localStorage if available
    const storedAvatar = localStorage.getItem("avatar");
    if (storedAvatar) {
      setSelectedAvatar(storedAvatar);
    }
  }, []);

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => setIsEditing(false);

  const handleUpdateClick = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setErrorMessage("Authentication token not found. Please login again.");
      return;
    }

    if (!userInfo || !userInfo.id) {
      setErrorMessage("User ID not found.");
      return;
    }

    try {
      const response = await axios.patch(
        `${API_HOST}/v1/users/${userInfo.id}`,
        userInfo,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setIsEditing(false);
        setErrorMessage(null);
        setUserInfo((prevState) => ({ ...prevState, ...response.data.data }));
      } else {
        setErrorMessage("Failed to update profile.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred while updating profile."
      );
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview selected avatar
    const avatarUrl = URL.createObjectURL(file);
    setSelectedAvatar(avatarUrl);

    // Save avatar URL to local storage
    localStorage.setItem("avatar", avatarUrl);

    const formData = new FormData();
    formData.append("avatar", file);

    const token = localStorage.getItem("authToken");
    if (!token) {
      setErrorMessage("Authentication token not found. Please login again.");
      return;
    }

    axios
      .post(`${API_HOST}/v1/users/avatar`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setUserInfo((prevState) => ({
          ...prevState,
          avatar: response.data.avatar,
        }));
        setErrorMessage(null);
      })
      .catch((error) => {
        setErrorMessage(
          error.response?.data?.message || "An error occurred while uploading avatar."
        );
      });
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (errorMessage) {
    return <p className="error-message">{errorMessage}</p>;
  }

  return (
    <>
      <div className="header-container-pf">
        <img src={profileImage} alt="Profile Header" className="header-image-pf" />
        <div className="header-overlay-pf">
          <h1 className="header-title-pf">Profile</h1>
        </div>
      </div>
      <div className="outer-wrapper-pf">
        <div className="profile-container-pf">
          <div className="profile-content-pf">
            <div className="avatar-pf">
              <img
                src={selectedAvatar || (userInfo.avatar ? `${API_HOST}/v1/images/${userInfo.avatar}` : defaultAvatar)}
                alt="Avatar"
                className="avatar-image-pf"
                onError={(e) => (e.target.src = defaultAvatar)}
              />
              <div
                className="camera-icon-pf"
                onClick={() => document.getElementById("avatar-input").click()}
              >
                📷
              </div>
              <input
                type="file"
                id="avatar-input"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleAvatarChange}
              />
              <p className="username-text-pf">{userInfo.username}</p>
              <p className="logout-text-pf" onClick={handleLogout}>
                Logout
              </p>
            </div>
            <div className="form-section-pf">
              <form>
                <label className="label-pf">Username</label>
                <input
                  type="text"
                  className="input-pf"
                  value={userInfo.username || ""}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, username: e.target.value })
                  }
                />
                <label className="label-pf">Email</label>
                <input
                  type="email"
                  className="input-pf"
                  value={userInfo.email || ""}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }
                />
                <label className="label-pf">Phone</label>
                <input
                  type="text"
                  className="input-pf"
                  value={userInfo.phone || ""}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, phone: e.target.value })
                  }
                />
                <label className="label-pf">Full Name</label>
                <input
                  type="text"
                  className="input-pf"
                  value={userInfo.fullName || ""}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, fullName: e.target.value })
                  }
                />
                {isEditing ? (
                  <div className="button-group-pf">
                    <button
                      type="button"
                      className="button-cancel-pf"
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="button-update-pf"
                      onClick={handleUpdateClick}
                    >
                      Update
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="button-pf"
                    onClick={handleEditClick}
                  >
                    Edit
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
