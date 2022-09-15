import React, { useState } from "react";
import { useMutation } from "react-query";
import { API } from "../../config/api";

function Register() {
  const [message, setMessage] = useState(null);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(data);

      // Insert data user to database
      const response = await API.post("/register", body, config);
      console.log(response);

      const alert = (
        <div class="alert alert-success mt-3 p-3" role="alert">
          Register Success
        </div>
      );
      setMessage(alert);
    } catch (error) {
      const alert = (
        <div class="alert alert-danger" role="alert">
          {error.message}
        </div>
      );

      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <>
      <div className="modal fade" id="ModalRegister">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ width: 400 }}>
            {message}
            <form action="" onSubmit={(e) => handleSubmit.mutate(e)}>
              <div className="ms-3 mt-4">
                <h5 style={{ color: "#613D2B", fontSize: 22, fontWeight: 900 }}>
                  Register
                </h5>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <input
                    onChange={handleChange}
                    style={{
                      backgroundColor: "#613D2B40",
                      borderColor: "#613D2B",
                      borderWidth: "2px",
                    }}
                    type="email"
                    name="email"
                    className="form-control"
                    id="registeremail"
                    placeholder="Email"
                  />
                </div>

                <div className="mb-3">
                  <input
                    onChange={handleChange}
                    style={{
                      backgroundColor: "#613D2B40",
                      borderColor: "#613D2B",
                      borderWidth: "2px",
                    }}
                    type="password"
                    name="password"
                    className="form-control"
                    id="registerpassword"
                    placeholder="Password"
                  />
                </div>
                <div className="mb-4">
                  <input
                    onChange={handleChange}
                    style={{
                      backgroundColor: "#613D2B40",
                      borderColor: "#613D2B",
                      borderWidth: "2px",
                    }}
                    type="text"
                    name="name"
                    className="form-control"
                    id="registerfullname"
                    placeholder="Full Name"
                  />
                </div>
                <div className="mb-3">
                  <button
                    type="submit"
                    className="btn mx-auto w-100 text-white fw-bold"
                    style={{ backgroundColor: "#613D2B" }}
                  >
                    Register
                  </button>
                </div>
                <p className="text-center">
                  Already have an account? Klik,{" "}
                  <a
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#ModalLogin"
                    style={{
                      color: "black",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    here
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
