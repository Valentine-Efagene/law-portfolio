import { faCommenting } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { string } from "prop-types";
import React, { useState } from "react";
import NavLink from "../NavLink/NavLink";
import styles from "./MobileNav.module.css";
import Profile from "../forms/Profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/user/user.slice";

MobileNav.propTypes = {
  className: string,
};

export default function MobileNav({ className }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const [showProfile, setShowProfile] = useState(false);

  const toggleShowProfile = () => setShowProfile((prevState) => !prevState);

  const handleLogout = () => {
    dispatch(logout());
  };

  return <nav className={`${className} ${styles.container}`}></nav>;
}
