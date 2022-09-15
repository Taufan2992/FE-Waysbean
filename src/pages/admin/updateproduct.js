import React, { useState, useEffect } from "react";
import blank from "../../assets/images/blank-profile.png";
import Navbaradmin from "../../components/navbaradmin";
import "../../assets/css/addproduct.css";
import { useMutation, useQuery } from "react-query";
import { API } from "../../config/api";
import { useNavigate, useParams } from "react-router-dom";

function Updateproduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [preview, setPreview] = useState(null);
  const [product, setProduct] = useState({
    title: "",
    stock: "",
    price: "",
    description: "",
    image: "",
  });

  const { data: productData } = useQuery("productCache", async () => {
    const response = await API.get("/product/" + id);
    return response.data.data;
  });

  useEffect(() => {
    if (productData) {
      setPreview(productData?.image);
      setProduct({
        ...product,
        title: productData?.title,
        stock: productData?.stock,
        price: productData?.price,
        description: productData?.description,
      });
    }
  }, [productData]);

  const handleOnChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Store data with FormData as object
      const formData = new FormData();
      if (product?.image) {
        formData.set("image", product?.image[0], product?.image[0]?.name);
      }
      formData.set("title", product?.title);
      formData.set("stock", product?.stock);
      formData.set("price", product?.price);
      formData.set("description", product?.description);

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Insert product data
      const response = await API.patch(`/product/${id}`, formData, config);
      console.log(response.data);
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
                value={product?.title}
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
                value={product?.stock}
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
                value={product?.price}
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
                value={product?.description}
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

export default Updateproduct;
