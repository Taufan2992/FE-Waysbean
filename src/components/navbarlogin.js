import React from "react";
import logo from "../assets/images/logo.png"
import Login from "../pages/main/login";
import Register from "../pages/main/register";

function Navbarlogin() {

  return (
<>
<div className="container-fluids shadow" style={{backgroundColor:"#F5F5F5"}}>
  <Login/>
  <Register/>
        <nav className="navbar navbar-expand-lg navbar-light mx-5">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img src={logo} width="100" height="50" alt=""/>
            </a>

            <div className="d-flex align-items-center">
            <div class="d-flex align-items-center">
                <button
                  type="button"
                  class="btn btn-light px-4 me-2 fw-bold"
                  style={{color:"#613D2B", borderColor:"#613D2B"}}
                  data-bs-toggle="modal" data-bs-target="#ModalLogin"
                >
                 Login
                </button>
                <button
                  type="button"
                  class="btn me-3 fw-bold text-white"
                  style={{backgroundColor:"#613D2B"}}
                  data-bs-toggle="modal" data-bs-target="#ModalRegister"
                >
                  Register
                </button>
              </div>

            </div>
          </div>
        </nav>
      </div>
</>
  );
}

export default Navbarlogin;
