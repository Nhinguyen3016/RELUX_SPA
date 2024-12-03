import React, { useState } from "react";
import profileImage from "../../../images/main_profile.jpg";
import "../../../styles/account/account/ProfileUser.css";
import avatarpf from "../../../images/avatar_pf.jpg";

const Profile = () => {
  // State để kiểm soát chế độ chỉnh sửa
  const [isEditing, setIsEditing] = useState(false);

  // State để lưu thông tin người dùng
  const [userInfo, setUserInfo] = useState({
    username: "john_doe",
    password: "******",
    email: "john.doe@example.com",
    phone: "1234567890",
    fullName: "John Doe"
  });

  // Hàm xử lý khi nhấn nút Edit
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Hàm xử lý khi nhấn nút Cancel
  const handleCancelClick = () => {
    setIsEditing(false);
  };

  // Hàm xử lý khi nhấn nút Update
  const handleUpdateClick = () => {
    // Thực hiện cập nhật thông tin ở đây
    setIsEditing(false);
  };

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
          <div className="header-pf"></div>
          <div className="profile-content-pf">
            <div className="avatar-pf">
              <img
                src={avatarpf}
                alt="Avatar"
                className="avatar-image-pf"
              />
              <div className="camera-icon-pf">📷</div>
              {/* Add the Logout text here */}
              <p className="username-text-pf">User name</p>
              <p className="logout-text-pf">Logout</p>
            </div>
            <div className="form-section-pf">
              <form>
                <label className="label-pf">Username</label>
                <input
                  type="text"
                  className="input-pf"
                  value={userInfo.username}
                  disabled={!isEditing}
                  onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
                />
                <label className="label-pf">Password</label>
                <input
                  type="password"
                  className="input-pf"
                  value={userInfo.password}
                  disabled={!isEditing}
                  onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                />
                <label className="label-pf">Email</label>
                <input
                  type="email"
                  className="input-pf"
                  value={userInfo.email}
                  disabled={!isEditing}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                />
                <label className="label-pf">Phone</label>
                <input
                  type="text"
                  className="input-pf"
                  value={userInfo.phone}
                  disabled={!isEditing}
                  onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                />
                <label className="label-pf">Full Name</label>
                <input
                  type="text"
                  className="input-pf"
                  value={userInfo.fullName}
                  disabled={!isEditing}
                  onChange={(e) => setUserInfo({ ...userInfo, fullName: e.target.value })}
                />
                {isEditing ? (
                  <div className="button-group-pf">
                    <button type="button" className="button-cancel-pf" onClick={handleCancelClick}>Cancel</button>
                    <button type="button" className="button-pf" onClick={handleUpdateClick}>Update</button>
                  </div>
                ) : (
                  <button type="button" className="button-pf" onClick={handleEditClick}>Edit</button>
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
