import React, { useEffect, useState } from "react";
import jumbotron from "../../assets/images/jumbotron.png";
import Navbaruser from "../../components/navbaruser";
import { useNavigate } from "react-router-dom";
import Rupiah from "rupiah-format";
import { API } from "../../config/api";

function Mainuser() {
  const [products, setProducts] = useState([]);

  //   GET PRODUCTS
  const getProducts = async () => {
    const response = await API.get("/products");
    setProducts(response.data.data);
  };

  useEffect(() => {
    getProducts();
  }, []);
  console.log(products);

  const navigate = useNavigate();
  const handleDetail = (id) => {
    navigate(`/detailproduct/${id}`);
  };

  return (
    <>
      <Navbaruser />
      <div class="mx-5">
        <div class="d-flex justify-content-center my-3 mt-5">
          <img src={jumbotron} alt="" />
        </div>

        <div class="row mx-5">
          {products?.map((item, index) => (
            <div className="col-3 p-5" key={index}>
              <div className="card" style={{ width: 241 }}>
                <img
                  className="rounded-top img-fulids"
                  src={item?.image}
                  alt="Card image cap"
                  onClick={() => handleDetail(item.id)}
                  height={312}
                />
                <div
                  className="card-body rounded-bottom"
                  style={{ backgroundColor: "#F6E6DA" }}
                >
                  <p className="card-text fw-bold" style={{color:"#613D2B"}}>{item?.title}</p>
                  <p className="card-text text-danger my-0">
                    {Rupiah.convert(item?.price)}
                  </p>
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

export default Mainuser;
