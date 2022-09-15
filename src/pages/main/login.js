import React, { useState, useContext } from 'react'
import { UserContext } from '../../context/user-context';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { API } from "../../config/api";

function Login() {
  const navigate = useNavigate()
  const [message, setMessage] = useState(null)
  const [state, dispatch] = useContext(UserContext)
  const [datas, setDatas] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setDatas({
      ...datas,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
  
      // CONFIG TYPE DATA
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
  
      // CONVERT DATA TO STRING
      const body = JSON.stringify(datas);
      console.log(datas);
      // INPUT DATA
      const response = await API.post('/login', body, config);
      const { status, name } = response.data.data
      console.log(response.data.data);
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data.data
      })
      
      if(status == 'customer'){
        alert(`Welcome ${name} !`)
        navigate('/mainuser')
      } else if(status == 'admin'){ 
        alert(`Welcome ${name} !`)
        navigate('/transaction')
      } else {
        alert("status tidak terdaftar")
      }
    } catch (error) {
      const alert = (
        <div class="alert alert-danger mt-3 p-3" role="alert">
          {error.response.data.message}
        </div>
      )
      console.error(error);
      setMessage(alert)
    }
  })

  return (
    <>
      <div className="modal fade" id="ModalLogin">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ width: 400 }}>
          {message}
            <form action="" onSubmit={(e) => handleSubmit.mutate(e)}>
              <div className="ms-3 mt-4">
                <h5 style={{ color: "#613D2B", fontSize: 22, fontWeight: 900 }}>
                  Login
                </h5>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <input
                    style={{
                      backgroundColor: "#613D2B40",
                      borderColor: "#613D2B",
                      borderWidth: "2px",
                    }}
                    onChange={handleChange}
                    type="email"
                    name="email"
                    className="form-control"
                    id="loginemail"
                    placeholder="Email"
                  />
                </div>

                <div className="mb-4">
                  <input
                    style={{
                      backgroundColor: "#613D2B40",
                      borderColor: "#613D2B",
                      borderWidth: "2px",
                    }}
                    onChange={handleChange}
                    type="password"
                    name="password"
                    className="form-control"
                    id="loginpassword"
                    placeholder="Password"
                  />
                </div>
                <div className="mb-3">
                  <button
                    type="submit"
                    className="btn mx-auto w-100 text-white fw-bold"
                    data-bs-dismiss={state.isLogin === true ? 'modal' : 'modal'}
                    style={{ backgroundColor: "#613D2B" }}
                  >
                    
                    Login
                  </button>
                </div>
                <p className="text-center">
                  Don't have an account? Klik,{" "}
                  <a
                    href=""
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#ModalRegister"
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

export default Login;
