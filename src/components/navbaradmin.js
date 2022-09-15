import React, {useContext} from "react";
import logo from "../assets/images/logo.png"
import admin from "../assets/images/admin.jpg"
import bean from "../assets/images/bean.png"
import logout from "../assets/images/logout.png"
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../context/user-context"

function Navbaradmin() {
  const [_, dispatch] = useContext(UserContext)
  const navigate = useNavigate()
  
  const handleLogout = () => {
    dispatch({
        type:"LOGOUT"
    })
    navigate("/")
}

const handleList = () => {
  navigate('/listproduct')
}

const handleTransaction = () => {
  navigate('/transaction')
}

const handleProduct = () => {
  navigate('/addproduct')
}

  return (
<>
<div className="container-fluids shadow" style={{backgroundColor:"#F5F5F5"}}>
        <nav className="navbar navbar-expand-lg navbar-light mx-5">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img src={logo} width="100" height="50" alt="" onClick={handleTransaction}/>
            </a>

            <div className="d-flex align-items-center">

              <div
                className="justify-content-end d-flex"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item dropdown">
                    <a
                      class="nav-link dropdown me-4"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <img
                        className="rounded-circle"
                        src={admin}
                        width="50"
                        height="50"
                        alt=""
                      />
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="#" onClick={handleProduct}>
                        <img src={bean} alt="" height="20px" width="20px" />{" "}
                        Add Product
                      </a>
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item" href="#" onClick={handleList}>
                        <img src={bean} alt="" height="20px" width="20px" />{" "}
                        List Product
                      </a>
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item" href="#" onClick={handleTransaction}>
                        <img src={bean} alt="" height="20px" width="20px" />{" "}
                        List Transaction
                      </a>
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item" href="#" onClick={handleLogout}>
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

export default Navbaradmin;
