import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Menu = () => {
  const location = useLocation();

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("USERID");

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    fetch("https://stock-platform-4u7q.onrender.com/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        return response.json();
      })
      .then((data) => {
        setUserName(data.name);
      })
      .catch((error) => {
        console.error("User fetch error:", error);
      });
  }, []);

  const getInitials = (name) => {
    if (!name || name === "USERID") {
      return "ZU";
    }

    const words = name.trim().split(" ");

    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }

    return (
      words[0][0] + words[words.length - 1][0]
    ).toUpperCase();
  };

  const initials = getInitials(userName);

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname === path;
  };

  return (
    <div className="menu-container">

      <img
        src="logo.png"
        style={{ width: "50px" }}
        alt="Logo"
      />

      <div className="menus">

        <ul>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
            >
              <p className={isActive("/") ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
            >
              <p className={isActive("/orders") ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
            >
              <p className={isActive("/holdings") ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
            >
              <p className={isActive("/positions") ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
            >
              <p className={isActive("/funds") ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
            >
              <p className={isActive("/apps") ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>

        </ul>

        <hr />

        <div
          className="profile"
          onClick={handleProfileClick}
        >
          <div className="avatar">
            {initials}
          </div>

          <p className="username">
            {userName}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Menu;