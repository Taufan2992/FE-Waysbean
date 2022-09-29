import React, { useState, useContext, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import code from "../../assets/images/code.png";
import "../../assets/css/profile.css";
import Navbaruser from "../../components/navbaruser";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/api";
import { UserContext } from "../../context/user-context";
import Moment from "moment";
import { useQuery } from "react-query";
import Rupiah from "rupiah-format";

function Profile() {
  const [state, _] = useContext(UserContext);
  const ID = state.user.id;
  console.log(state);
  const Navigate = useNavigate();
  const [profile, setProfile] = useState({});

  // GET PROFILE DATA
  const getProfile = async () => {
    const response = await API.get("/user/" + ID);
    setProfile(response?.data?.data);
  };

  let { data: transactions } = useQuery("transactionsCache", async () => {
    const response = await API.get("/transactionId");
    return response.data.data;
  });

  useEffect(() => {
    getProfile();
  }, []);

  const editProfile = () => {
    Navigate("/updateprofile/" + ID);
  };

  return (
    <>
      <Navbaruser />
      <div class="row mx-5 mt-3">
        <div class="col-6 p-5">
          <h3 class="pb-4" style={{ color: "#613D2B" }}>
            My Profile
          </h3>
          <div class="row">
            <div class="col-5">
              <img
                src={"http://localhost:5000/uploads/" + profile?.image}
                class="card-img-top rounded"
                alt="..."
                style={{ width: 180, height: 220 }}
              />
            </div>
            <div class="col-7 ps-0">
              <div class="card-body p-0">
                <h5 class="card-title mb-0" style={{ color: "#613D2B" }}>
                  Full Name
                </h5>
                <p class="card-text">{profile?.name}</p>
                <h5 class="card-title mb-0" style={{ color: "#613D2B" }}>
                  Email
                </h5>
                <p class="card-text">{profile?.email}</p>
                <h6 class="card-title mb-0" style={{ color: "#613D2B" }}>
                  Address
                </h6>
                <p class="card-text">{profile?.address}</p>
                <h6 class="card-title mb-0" style={{ color: "#613D2B" }}>
                  Post Code
                </h6>
                <p class="card-text">{profile?.postcode}</p>
              </div>
            </div>
          </div>
          <div>
            <button
              style={{ backgroundColor: "#613D2B" }}
              className="btn mx-auto text-white fw-bold mt-3"
              onClick={() => {
                editProfile(profile?.id);
              }}
            >
              Edit Profile
            </button>
          </div>
        </div>

        <div class="col-6 p-5">
          <h3 class="pb-4" style={{ color: "#613D2B" }}>
            My Transaction
          </h3>
          <div class="row">
            {transactions?.map((item, index) => (
              <div
                class="mb-2"
                style={{ backgroundColor: "#F6E6DA" }}
                key={index}
              >
                <div class="row">
                  {item?.carts?.map((data) => (
                    <div className="col-8">
                      <div className="row">
                        <div class="col-sm-5 pt-3 ps-3 pe-0">
                          <img
                            src={
                              data?.product?.image
                            }
                            class="card-img-top"
                            alt="..."
                            height={120}
                            style={{ width: 90 }}
                          />
                        </div>
                        <div class="col-sm-7 py-3 px-0">
                          <div class="card-body p-0">
                            <h5
                              class="card-title mt-0 mb-0"
                              style={{ color: "#613D2B" }}
                            >
                              {item?.product?.title}
                            </h5>
                            <p
                              class="card-text"
                              style={{ fontSize: "14px", color: "#613D2B" }}
                            >
                              {Moment(item?.created_at).format("MMM Do YY")}
                            </p>
                            <p
                              class="card-text mb-0"
                              style={{ fontSize: "12px", color: "#974A4A" }}
                            >
                              {Rupiah.convert(data?.product?.price)}
                            </p>
                            <p
                              class="card-text mb-0"
                              style={{ fontSize: "12px", color: "#974A4A" }}
                            >
                              {data?.qty}
                            </p>
                            <p
                              class="card-text fw-bold"
                              style={{ fontSize: "12px", color: "#974A4A" }}
                            >
                              {Rupiah.convert(data?.subamount)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div class="col-sm-4 ">
                    <div class="card-body">
                      <div>
                        <img
                          src={logo}
                          alt=""
                          style={{ height: 22, width: 73 }}
                          class="d-block mx-auto my-3"
                        />
                      </div>
                      <div>
                        <img src={code} alt="" class="d-block mx-auto mb-3" />
                      </div>
                      <div className="pb-2">
                        <p
                          className={
                            item?.status === "Waiting Approve"
                              ? "status-transaction-WaitingApprove"
                              : item?.status === "Success"
                              ? "status-transaction-Success"
                              : "status-transaction-Cancel"
                          }
                        >
                          {item?.status}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
