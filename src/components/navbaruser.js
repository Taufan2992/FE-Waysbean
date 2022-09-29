import React, { useContext, useState, useEffect } from "react";
import logo from "../assets/images/logo.png";
import cart from "../assets/images/cart.png";
import blank from "../assets/images/blank-profile.png";
import user from "../assets/images/user.png";
import logout from "../assets/images/logout.png";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user-context";
import { API } from "../config/api";

function Navbaruser() {
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();
  const [badge, setBadge] = useState([]);
  const [picture, setPicture] = useState();
  const ID = state.user.id;

  // GET PRODUCTS
  const getCarts = async () => {
    const response = await API.get("/cartuser");
    setBadge(response.data.data);
  };

  // GET USER
    //   GET PRODUCTS
    const getPicture = async () => {
      const response = await API.get("/user/" + ID);
      setPicture(response.data.data);
    };

  useEffect(() => {
    getCarts();
    getPicture()
  }, []);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleCart = () => {
    navigate("/cart");
  };

  const handleMain = () => {
    navigate("/mainuser");
  };

  return (
    <>
      <div
        className="container-fluids shadow"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <nav className="navbar navbar-expand-lg navbar-light mx-5">
          <div className="container-fluid">
            <a className="navbar-brand" href="#" onClick={handleMain}>
              <img src={logo} width="100" height="50" alt="" />
            </a>

            <div className="d-flex align-items-center">
              <div className="justify-content-end d-flex me-2">
                <a
                  style={{ textDecoration: "none", position: "relative" }}
                  onClick={handleCart}
                >
                  <img
                    src={cart}
                    alt=""
                    className="me-3 mt-2 my-auto position-relative cursor-pointer"
                    height="30px"
                    width="30px"
                  />
                  <span
                    className="badge rounded-pill bg-danger"
                    style={{ position: "absolute", top: "0", right: "0px" }}
                  >
                    {badge?.length}
                  </span>
                </a>
              </div>

              <div
                className="justify-content-end d-flex"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item dropdown">
                    <a
                      class="nav-link dropdown"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <img
                        className="rounded-circle"
                        src={
                          picture?.image || blank
                        }
                        width="50"
                        height="50"
                        alt=""
                      />
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={handleProfile}
                      >
                        <img src={user} alt="" height="20px" width="20px" />{" "}
                        Profile
                      </a>
                      <div className="dropdown-divider"></div>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={handleLogout}
                      >
                        <img src={logout} alt="" height="20px" width="20px" />{" "}
                        Log out
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbaruser;
