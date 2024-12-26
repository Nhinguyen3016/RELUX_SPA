import React, { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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
  const [bookings, setBookings] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [activeTab, setActiveTab] = useState("upcoming");
  const navigate = useNavigate();

  const fetchEmployeeDetails = async (employeeId) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.get(
        `${API_HOST}/v1/employees/${employeeId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching employee details: ${error}`);
      return null;
    }
  };

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
          const user = response.data.data;
          setUserInfo(user);
          localStorage.setItem("userId", user.id);
          setUserId(user.id);
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

    const fetchUserBookings = async () => {
      const token = localStorage.getItem("authToken");
      if (!token || !userId) {
        setErrorMessage("Authentication token or user ID not found. Please login again.");
        return;
      }

      try {
        const response = await axios.get(
          `${API_HOST}/v1/bookings/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data && response.data.data) {
          const bookingsWithDetails = await Promise.all(
            response.data.data.map(async (booking) => {
              const employeeDetail = await fetchEmployeeDetails(booking.employeeId);
              return {
                ...booking,
                employeeDetail
              };
            })
          );
          setBookings(bookingsWithDetails);
        } else {
          setErrorMessage("Failed to fetch user bookings.");
        }
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message || "An error occurred while fetching bookings."
        );
      }
    };

    fetchUserProfile();
    if (userId) {
      fetchUserBookings();
    }

    const storedAvatar = localStorage.getItem("avatar");
    if (storedAvatar) {
      setSelectedAvatar(storedAvatar);
    }
  }, [userId]);

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => setIsEditing(false);

  const handleUpdateClick = async (e) => {
    e.preventDefault();
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
    navigate("/account");
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const avatarUrl = URL.createObjectURL(file);
    setSelectedAvatar(avatarUrl);
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

  const getChartData = () => {
    const bookingsByMonth = {};
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    bookings.forEach(booking => {
      const date = new Date(booking.bookingTime);
      const monthIndex = date.getMonth();
      const monthName = monthNames[monthIndex];
      const year = date.getFullYear().toString().substr(-2);
      const key = `${monthName} ${year}`;
      
      if (!bookingsByMonth[key]) {
        bookingsByMonth[key] = {
          name: key,
          count: 0,
          revenue: 0
        };
      }
      
      bookingsByMonth[key].count += 1;
      bookingsByMonth[key].revenue += booking.services.reduce(
        (total, service) => total + parseFloat(service.price), 
        0
      );
    });

    return Object.values(bookingsByMonth)
      .sort((a, b) => {
        const [aMonth, aYear] = a.name.split(' ');
        const [bMonth, bYear] = b.name.split(' ');
        const aIndex = monthNames.indexOf(aMonth) + parseInt(aYear) * 12;
        const bIndex = monthNames.indexOf(bMonth) + parseInt(bYear) * 12;
        return aIndex - bIndex;
      })
      .slice(-6); // Show only last 6 months
  };

  const categorizeBookings = () => {
    const currentTime = new Date();
    const upcoming = [];
    const ongoing = [];
    const completed = [];

    bookings.forEach((booking) => {
      const bookingTime = new Date(booking.bookingTime);
      const endTime = new Date(booking.endTime);

      if (endTime < currentTime) {
        completed.push(booking);
      } else if (bookingTime <= currentTime && endTime >= currentTime) {
        ongoing.push(booking);
      } else {
        upcoming.push(booking);
      }
    });

    return { upcoming, ongoing, completed };
  };

  const { upcoming, ongoing, completed } = categorizeBookings();

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (errorMessage) {
    return <p className="error-message">{errorMessage}</p>;
  }

  const renderBookingTable = (bookings) => {
    if (bookings.length === 0) {
      return <p>No bookings found.</p>;
    }
    

    return (
      <table className="booking-history-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Service</th>
            <th>Employee</th>
            <th>Location</th>
            <th>Booking Time</th>
            <th>End Time</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={booking.id}>
              <td>{index + 1}</td>
              <td>
                {booking.services.map((service) => (
                  <div key={service.id}>
                    {service.name} <br />
                  </div>
                ))}
              </td>
              <td>{booking.employeeDetail?.name || 'Loading...'}</td>
              <td>{booking.employeeDetail?.location?.locationName || 'Loading...'}</td>
              <td>{new Date(booking.bookingTime).toLocaleString()}</td>
              <td>{new Date(booking.endTime).toLocaleString()}</td>
              <td>${booking.services.reduce((total, service) => total + parseFloat(service.price), 0).toFixed(2)}</td>
              <td>{booking.services.reduce((total, service) => total + service.duration, 0)} minutes</td>
              <td>{booking.bookingNotes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
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
                      className="button-cancel-pf"
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </button>
                    <button
                      className="button-update-pf"
                      onClick={handleUpdateClick}
                    >
                      Update
                    </button>
                  </div>
                ) : (
                  <button
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

      <div className="booking-chart">
        <h2 className="chart-title">Booking History</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart 
              data={getChartData()} 
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke="#e5e7eb"
              />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
                dx={-10}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
                dx={10}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '4px',
                  padding: '10px'
                }}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="count" 
                stroke="#2563eb" 
                strokeWidth={2}
                dot={{ fill: '#fff', stroke: '#2563eb', strokeWidth: 2, r: 4 }}
                activeDot={{ fill: '#2563eb', stroke: '#fff', strokeWidth: 2, r: 6 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="revenue" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#fff', stroke: '#10b981', strokeWidth: 2, r: 4 }}
                activeDot={{ fill: '#10b981', stroke: '#fff', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="booking-tabs">
        <button
          className={`tab-button ${activeTab === "upcoming" ? "active" : ""}`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`tab-button ${activeTab === "ongoing" ? "active" : ""}`}
          onClick={() => setActiveTab("ongoing")}
        >
          Ongoing
        </button>
        <button
          className={`tab-button ${activeTab === "completed" ? "active" : ""}`}
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </button>
      </div>

      <div className="form-history-book">
        <div className="history-book">
          {activeTab === "upcoming" && renderBookingTable(upcoming)}
          {activeTab === "ongoing" && renderBookingTable(ongoing)}
          {activeTab === "completed" && renderBookingTable(completed)}
        </div>
      </div>
    </>
  );
};

export default Profile;