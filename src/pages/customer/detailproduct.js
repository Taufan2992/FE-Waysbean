import React, { useState, useEffect, useContext } from "react";
import Navbaruser from "../../components/navbaruser";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import { UserContext } from "../../context/user-context";
import Rupiah from "rupiah-format";

function Detailproduct() {
  const navigate = useNavigate();
  const [state] = useContext(UserContext);
  // console.log(state)
  const UserID = state.user.id;
  console.log(UserID);

  // GET PRODUCT
  const [gettingProduct, setGettingProduct] = useState({});
  const { id } = useParams();
  console.log(id);
  const getDetailProduct = async () => {
  const response = await API.get(`/product/${id}`);
    setGettingProduct(response.data.data);
  };

    const [stock, setStock] = useState({});
    const getStock = async () => {

    const response = await API.get(`/cartproduct/${id}`);
    console.log(response);
      setStock(response.data.data.qty);
    };
    console.log(stock);
  // FETCH
  useEffect(() => {
    getDetailProduct();
    getStock()
  }, []);

  

  const handleToCart = useMutation(async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      let dataCart = {
        product_id: gettingProduct?.id,
        user_id: UserID,
        qty:1,
        subamount: gettingProduct?.price,
        stockproduct: gettingProduct?.stock - 1
      };
      const body = JSON.stringify(dataCart);

      const response = await API.post("/cart", body, config);
      console.log(response);

      alert("Data added succesfully");
      if (response.data.status == "Success") {
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Navbaruser/>
      <div
        class="container-fluid p-5"
        style={{ marginRight: 50, marginLeft: 20, marginTop: 30 }}
      >
        <div class="row">
          <div class="col-md-5 px-5">
            <div class="lc-block">
              <img
                class="img-fluid"
                alt="Photo by Anders Jildén"
                src={gettingProduct?.image}
              />
            </div>
          </div>
          <div class="col-md-7 px-5">
            <div style={{ color: "#613D2B", fontWeight: 900 }}>
              <h2>{gettingProduct?.title}</h2>
            </div>
{/* {stock?.map((item) =>(  */}
            <div style={{ color: "#974A4A" }}>
              <p>Stock:{" "}{gettingProduct?.stock - stock}</p>
              {/* <p>{item?.product_id == gettingProduct.id ? item?.stockproduct : null}</p> */}
            </div>
{/* ))} */}
            <div class="pe-5" style={{ textAlign: "justify", height:200 }}>
              <p>{gettingProduct?.description}</p>
            </div>

            <div class="text-end pe-5 pb-3" style={{ color: "#974A4A" }}>
              <p>{Rupiah.convert(gettingProduct?.price)}</p>
            </div>

            <div class="me-5">
              <button
                class="container btn text-white fw-bold mt-3 mb-5"
                style={{ backgroundColor: "#613D2B" }}
                onClick={(e) => {
                  handleToCart.mutate(e);
                }}
                type="submit"
              >
                Add Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Detailproduct;
