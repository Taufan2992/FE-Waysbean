import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/user-context";
import jumbotron from "../../assets/images/jumbotron.png";
import Navbarlogin from "../../components/navbarlogin";
import { API } from "../../config/api";
import Login from "./login";
import Rupiah from "rupiah-format";

function Main() {
  const [state, _] = useContext(UserContext);
  const [products, setProducts] = useState([]);
  console.log(state);

  //   GET PRODUCTS
  const getProducts = async () => {
    const response = await API.get("/products");
    setProducts(response.data.data);
  };

  useEffect(() => {
    getProducts();
  }, []);
  console.log(products);

  return (
    <>
      <Navbarlogin />
      <Login />
      <div className="mx-5">
        <div className="carousel slide" id="carousels">
          <div className="carousel-indicators">
            <button data-bs-target="#carousels" data-bs-slide-to="0" className="active"></button>
            <button data-bs-target="#carousels" data-bs-slide-to="1"></button>
          </div>
          <div className="carousel-inner">
            <div className="my-3 mt-5 carousel-item active">
              <img src={jumbotron} alt="" />
            </div>
            <div className="my-3 mt-5 carousel-item">
              <img src={jumbotron} alt="" />
            </div>
          </div>
          <button className="carousel-control-prev" data-bs-target="#carousels" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button className="carousel-control-next" data-bs-target="#carousels" data-bs-slide="next">
            <span className="carousel-control-prev-next"></span>
          </button>

        </div>

        <div className="row mx-5">
          {products?.map((item, index) => (
            <div className="col-3 p-5" key={index}>
              <div className="card" style={{ width: 241 }}>
                <img
                  className="rounded-top img-fulids"
                  src={item?.image}
                  alt="Card image cap"
                  data-bs-toggle="modal"
                  data-bs-target="#ModalLogin"
                  height={312}
                />
                <div
                  className="card-body rounded-bottom"
                  style={{ backgroundColor: "#F6E6DA" }}
                >
                  <p className="card-text fw-bold" style={{color:"#613D2B"}}>{item?.title}</p>
                  <p className="card-text text-danger my-0">{Rupiah.convert(item?.price)}</p>
                  <p className="card-text text-danger">Stock:{" "}{item?.stock}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Main;
