import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import authService from "../appwrite/auth";

function Logout() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(logout());
      authService.logout();
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [isLoggedIn, dispatch, navigate]);

  return null;
}

export default Logout;
