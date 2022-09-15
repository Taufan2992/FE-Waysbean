import React, {useState, useEffect} from "react";
import Navbaradmin from "../../components/navbaradmin";
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { API } from "../../config/api";
import Modaldelete from "../../components/modaldelete"
import Rupiah from "rupiah-format";

function Listproduct() {

  const [products, setProducts] = useState([])

  //   GET PRODUCTS
  const getProducts = async () => {
    const response = await API.get('/products')
    setProducts(response.data.data)
}

useEffect(() => {
    getProducts()
},[])

const editProduct = (id) => {
  navigate('/updateproduct/' + id)
} 

const [idDelete, setIdDelete] = useState(null);
const [confirmDelete, setConfirmDelete] = useState(null);
const handleDelete = (id) => {
  setIdDelete(id);
};

const deleteById = useMutation(async (id) => {
  try {
    await API.delete(`/product/${id}`);
    const response = await API.get("/products");
    setProducts(response.data.data);
    
  } catch (error) {
    console.log(error);
  }
});

useEffect(() => {
  if (confirmDelete) {
    deleteById.mutate(idDelete);
    setConfirmDelete(null);
  }

  },[confirmDelete])

const navigate = useNavigate()

const handleDetail = (id) => {
navigate(`/detailproduct/${id}`)
}
  return (
    <div>
      <Navbaradmin />
      <Modaldelete 
      setConfirmDelete={setConfirmDelete}
      />

      <div
        className="container"
        style={{
          color: "#613D2B",
          marginBottom: 70,
          marginTop: 100,
          marginLeft: 80,
        }}
      >
        <h3>List Product</h3>
      </div>

      <div className="container px-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th
                scope="col"
                className="bg-secondary bg-opacity-10"
                style={{ textAlign: "center" }}
              >
                {" "}
                No
              </th>
              <th
                scope="col"
                className="bg-secondary bg-opacity-10"
                style={{ textAlign: "center" }}
              >
                Image
              </th>
              <th
                scope="col"
                className="bg-secondary bg-opacity-10"
                style={{ textAlign: "center" }}
              >
                Name
              </th>
              <th
                scope="col"
                className="bg-secondary bg-opacity-10"
                style={{ textAlign: "center" }}
              >
                Stock
              </th>
              <th
                scope="col"
                className="bg-secondary bg-opacity-10"
                style={{ textAlign: "center" }}
              >
                Price
              </th>
              <th
                scope="col"
                className="bg-secondary bg-opacity-10"
                style={{ textAlign: "center" }}
              >
                Description
              </th>
              <th
                scope="col"
                className="bg-secondary bg-opacity-10"
                style={{ textAlign: "center" }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
          {products?.map((item, index) => (
            <tr>
              <th scope="row" style={{ textAlign: "center", paddingTop: 55 }}>
              {index + 1}
              </th>
              <td className="d-flex justify-content-center">
                {" "}
                <img src={item?.image} alt="" style={{ height: 120, width: 90 }} onClick={() => handleDetail(item.id)}/>
              </td>
              <td style={{ textAlign: "center", paddingTop: 55 }}>
              {item?.title}
              </td>
              <td style={{ textAlign: "center", paddingTop: 55 }}>{item?.stock}</td>
              <td style={{ textAlign: "center", paddingTop: 55 }}>{Rupiah.convert(item?.price)}</td>
              <td style={{ textAlign: "center", paddingTop: 55 }}>
              {item?.description}
              </td>
              <td className="">
                <div
                  class="d-flex justify-content-center align-item-center my-5"
                  style={{}}
                >
                  <button
                    class="btn px-4 py-0 me-2 fs-6 bg-opacity-50 text-white "
                    style={{ backgroundColor: "#FF0742" }}
                    data-bs-target="#Modaldelete" 
                    data-bs-toggle="modal"
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  >
                    {" "}
                    Delete{" "}
                  </button>
                  <button
                    class="btn px-4 py-0 fs-6 text-white"
                    style={{ backgroundColor: "#0ACF83" }}
                    onClick={() => {
                      editProduct(item.id)
                  }}
                  >
                    {" "}
                    Update{" "}
                  </button>
                </div>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Listproduct;
