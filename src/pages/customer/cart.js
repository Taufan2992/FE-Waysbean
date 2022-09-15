import React, { useState, useEffect } from "react";
import bin from "../../assets/images/bin.png";
import Navbaruser from "../../components/navbaruser";
import {useNavigate} from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import Modaldelete from "../../components/modaldelete";
import Rupiah from "rupiah-format";

function Cart() {
  const [message, setMessage] = useState(null)
  const [carts, setCarts] = useState([]);
  const Navigate = useNavigate();

  const getCarts = async ()  =>{
    try{
        const response = await API.get("/cartuser");
        setCarts(response.data.data);
  }catch(error){
    console.log(error);
   }
  };

  useEffect(() => {
    getCarts();
  }, []);

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const handleDelete = (id) => {
    setIdDelete(id);
  };

  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/cart/${id}`);
      const response = await API.get("/cartuser");
      setCarts(response.data.data);
      
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (confirmDelete) {
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }},[confirmDelete])

  let resultTotal = carts?.reduce((a, b) => {
    return a + b.product?.price * b.qty;
  }, 0);

  let qtyTotal = carts?.reduce((a, b) => {
    return a + b.qty;
  }, 0);

  const handleDecrement = async(id, qty, Subamount, price, stockproduct, stock) => {
    const config = {
     headers: {
       "Content-type": "application/json",
     },
   }

   if(qty === 0){
     return;  
   }

   const newQty = qty - 1
   const newTotal = Subamount - price * newQty
   const newStock = stock - newQty
   const body = JSON.stringify({
       Qty : newQty,
       Subamount : newTotal * newQty,
       Stockproduct : newStock
     })
   await API.patch(`/cart/${id}`, body, config)
   const response = await API.get("/cartuser");
   setCarts(response.data.data)
 }

 const handleIncrement = async(id, qty, subamount, price, stockproduct, stock) => {
    const config = {
     headers: {
       "Content-type": "application/json",
     },
   }

   const newQty = qty + 1
   const newTotal = price * newQty
   const newStock = stock - newQty
   const body = JSON.stringify({
       Qty : newQty,
       Subamount : newTotal,
       Stockproduct : newStock
     })
   await API.patch(`/cart/${id}`, body, config)
  
   const response = await API.get("/cartuser");
   setCarts(response.data.data)
 }

 const handleSubmit = useMutation(async (e) => {
  try {
    e.preventDefault()

    const alert = (
      <div class="alert alert-success mt-3 p-3" role="alert">
        Thank you for ordering in us, please wait to verify you order
      </div>
    )
    setMessage(alert)
    // Data body
       const body = JSON.stringify({
        total: resultTotal,
      });
    // Configuration
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    // Insert transaction data
    const response = await API.post("/transaction", body, config);
    const idTransaction = response.data.data.id

    for (let i=0; i<carts.length; i++){
      await API.patch(`/carttrans/${carts[i].id}`, {"transaction_id": idTransaction}, config )
        }

    const midtransToken = await API.get(`/midtrans/${idTransaction}`)

    // Create variabel for store token payment from response here ...
    const token = midtransToken.data.data.token;

    // Init Snap for display payment page with token here ...
    window.snap.pay(token, {
      onSuccess: function (result) {
        /* You may add your own implementation here */
        console.log(result);
        Navigate("/profile");
      },
      onPending: function (result) {
        /* You may add your own implementation here */
        console.log(result);
        Navigate("/profile");
      },
      onError: function (result) {
        /* You may add your own implementation here */
        console.log(result);
      },
      onClose: function () {
        /* You may add your own implementation here */
        alert("you closed the popup without finishing the payment");
      },
    });
  } catch (error) {
    console.log(error);
  }
});

useEffect(() => {
  //change this to the script source you want to load, for example this is snap.js sandbox env
  const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
  //change this according to your client-key
  const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;
  let scriptTag = document.createElement("script");
  scriptTag.src = midtransScriptUrl;
  // optional if you want to set script attribute
  // for example snap.js have data-client-key attribute
  scriptTag.setAttribute("data-client-key", myMidtransClientKey);

  document.body.appendChild(scriptTag);
  return () => {
    document.body.removeChild(scriptTag);
  };
}, []);

  return (
    <>
      <Navbaruser />
      <Modaldelete 
      setConfirmDelete={setConfirmDelete}
      />
      {message}
      <div>
        <div className="p-5 mx-5">
          <div className="px-5 mb-3 text-red">
            <h3>My Cart</h3>
          </div>
          <div className="px-5">
            <p className="mb-0 text-red">Review your order</p>
          </div>

          <div className="row">
            <div className="col-8 px-5">
              <hr />

              <div className="card mb-3 scroll" style={{ border: "none" }}>
                {carts?.map((item,index) => (
                  <div className="row g-0 mb-2" key={index}>
                    <div className="col-md-2">
                      <img
                        src={
                          "http://localhost:5000/uploads/" +
                          item?.product?.image
                        }
                        alt=""
                        className="rounded"
                        height={"100px"}
                        width={"100px"}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="col-md-10 row">
                      <div className="col-md-9">
                        <div className="card-body px-0">
                          <p
                            className="card-title text-red"
                            style={{
                              fontSize: "18px",
                              fontWeight: "900",
                              color: "#613D2B",
                            }}
                          >
                            {item?.product?.title}
                          </p>

                          <div class="mt-3">
                            <button class="bg-light border-0 me-2" onClick={() => handleDecrement(item.id, item.qty, item.subamount, item.product.price, item.stockproduct, item.product.stock)}>
                              -
                            </button>
                            <p style={{
                                display:"inline",
                                padding: 5
                              }}>
                              {item?.qty}
                            </p>
                            <button class="bg-light border-0 ms-2" onClick={(id, qty) => handleIncrement(item.id, item.qty, item.subamount, item.product.price, item.stockproduct, item.product.stock, item.product_id)}>
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="card-body px-0">
                          <p
                            className="card-title text-red pb-2"
                            style={{
                              fontSize: "16px",
                              fontWeight: "400",
                              textAlign: "right",
                            }}
                          >
                            {Rupiah.convert(item?.product?.price)}
                          </p>

                          <img
                            src={bin}
                            alt=""
                            style={{ float: "right", cursor: "pointer" }}
                            data-bs-target="#Modaldelete" 
                            data-bs-toggle="modal"
                            onClick={() => {
                              handleDelete(item.id);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <hr />
            </div>

            <div className=" col-4 px-5">
              <div className="text-red">
                <hr />

                <div className="d-flex justify-content-between">
                  <p className="d-flex">Subtotal</p>
                  <p className="d-flex">{Rupiah.convert(resultTotal)}</p>
                </div>

                <div className="d-flex justify-content-between">
                  <p className="d-flex">Qty</p>
                  <p className="d-flex">{qtyTotal}</p>
                </div>

                <hr />

                <div className="d-flex justify-content-between">
                  <p className="d-flex">Total</p>
                  <p className="d-flex">{Rupiah.convert(resultTotal)}</p>
                </div>
              </div>

              <div className="mt-4">
                <div className="d-flex">
                  <button
                    className="container btn border-0 mt-2 text-white"
                    style={{ backgroundColor: "#613D2B" }}
                    type="submit"
                    onClick={(e) => handleSubmit.mutate(e)}
                  >
                    Pay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
