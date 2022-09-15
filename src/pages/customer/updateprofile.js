import React, { useState, useEffect } from "react";
import blank from "../../assets/images/blank-profile.png";
import Navbaruser from "../../components/navbaradmin";
import "../../assets/css/addproduct.css";
import { useMutation, useQuery } from "react-query";
import { API } from "../../config/api";
import { useNavigate, useParams } from "react-router-dom";

function Updateprofile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [preview, setPreview] = useState(null);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    address: "",
    postcode: "",
    image: "",
  });

const { data: profileData } = useQuery("userCache", async () => {
  const response = await API.get("/user/" + id);
  return response.data.data;
});

useEffect(() => {
  if (profileData) {
    setPreview(profileData?.image);
    setProfile({
      ...profile,
      name: profileData?.name,
      email: profileData?.email,
      address: profileData?.address,
      postcode: profileData?.postcode,
    });
  }
}, [profileData]);
console.log(profile);
console.log(preview);



  const handleOnChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };
  console.log(preview);

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Store data with FormData as object
      const data = new FormData();
      if (profile?.image) {
        data.set("image", profile?.image[0], profile?.image[0]?.name);
      }
      data.set("name", profile?.name);
      data.set("email", profile?.email);
      data.set("address", profile?.address);
      data.set("postcode", profile?.postcode);

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Insert product data
      const response = await API.patch(`/user/${id}`, data, config);
      console.log(response.data);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Navbaruser />
      <div className="container row m-auto mt-5 pt-5">
        <div className="col-6 pe-4">
          <form className="m-0" onSubmit={(e) => handleSubmit.mutate(e)}>
            <h4
              className="text-start pt-5 pb-5 fw-bold"
              style={{ color: "#613D2B" }}
            >
              Edit Profile
            </h4>
            <div className="input-group mb-4">
              <input
                type="text"
                placeholder="Name"
                name="name"
                onChange={handleOnChange}
                className="form-control text-black border-form"
                value={profile?.name}
                style={{
                  borderColor: "#613D2B",
                  borderWidth: 2,
                  backgroundColor: "#613D2B40",
                }}
              />
            </div>
            <div className="input-group mb-4">
              <input
                type="email"
                placeholder="Stock"
                name="email"
                onChange={handleOnChange}
                className="form-control text-black border-form"
                value={profile?.email}
                style={{
                  borderColor: "#613D2B",
                  borderWidth: 2,
                  backgroundColor: "#613D2B40",
                }}
              />
            </div>
            <div className="input-group mb-4">
              <input
                type="text"
                placeholder="Address"
                name="address"
                onChange={handleOnChange}
                className="form-control text-black border-form"
                value={profile?.address}
                style={{
                  borderColor: "#613D2B",
                  borderWidth: 2,
                  backgroundColor: "#613D2B40",
                }}
              />
            </div>
            <div className="input-group mb-4">
              <input
                type="number"
                placeholder="Postcode"
                name="postcode"
                onChange={handleOnChange}
                className="form-control text-black border-form"
                value={profile?.postcode}
                style={{
                  borderColor: "#613D2B",
                  borderWidth: 2,
                  backgroundColor: "#613D2B40",
                }}
              />
            </div>

            <div class="mb-4">
              <input
                class="form-control text-secondary border-rounded inputfile icon"
                type="file"
                name="image"
                onChange={handleOnChange}
                placeholder="Photo Product"
                // value={product?.image}
                style={{
                  borderColor: "#613D2B",
                  borderWidth: 2,
                  backgroundColor: "#613D2B40",
                  width: "40%",
                }}
              />
            </div>

            <div className="text-center">
              <button
                className="btn text-white fw-bold my-5"
                type="submit"
                style={{
                  backgroundColor: "#613D2B",
                  paddingLeft: 50,
                  paddingRight: 50,
                }}
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>

        <div className="col-6 ps-4">
          <div className="ms-3 mt-3 mb-5">
            <img
              style={{ width: 436, height: 555 }}
              src={preview || blank}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Updateprofile;
