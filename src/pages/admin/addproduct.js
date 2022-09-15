import React, { useState } from "react";
import blank from "../../assets/images/blank-profile.png";
import Navbaradmin from "../../components/navbaradmin";
import "../../assets/css/addproduct.css";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import { useNavigate } from "react-router-dom";

function Addproduct() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [product, setProduct] = useState({
    title: "",
    stock: "",
    price: "",
    description: "",
    image: "",
  });

  const handleOnChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set("image", product.image[0], product.image[0].name);
      formData.set("title", product.title);
      formData.set("price", product.price);
      formData.set("stock", product.stock);
      formData.set("description", product.description);

      // Insert product data
      const response = await API.post("/product", formData, config);
      console.log(response);
      navigate("/listproduct");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Navbaradmin />
      <div className="container row m-auto mt-5 pt-5">
        <div className="col-6 pe-4">
          <form className="m-0" onSubmit={(e) => handleSubmit.mutate(e)}>
            <h4
              className="text-start pt-5 pb-5 fw-bold"
              style={{ color: "#613D2B" }}
            >
              Add Product
            </h4>
            <div className="input-group mb-4">
              <input
                type="text"
                placeholder="Name"
                name="title"
                onChange={handleOnChange}
                className="form-control text-black border-form"
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
                placeholder="Stock"
                name="stock"
                onChange={handleOnChange}
                className="form-control text-black border-form"
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
                placeholder="Price"
                name="price"
                onChange={handleOnChange}
                className="form-control text-black border-form"
                style={{
                  borderColor: "#613D2B",
                  borderWidth: 2,
                  backgroundColor: "#613D2B40",
                }}
              />
            </div>
            <div className="input-group mb-4">
              <textarea
                type="text"
                placeholder="Description"
                name="description"
                onChange={handleOnChange}
                className="form-control text-black border-form"
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
                Add Product
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

export default Addproduct;
