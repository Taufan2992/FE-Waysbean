import React, { useEffect, useState } from "react";
import Navbaradmin from "../../components/navbaradmin"
import "../../assets/css/transaction.css"
import { API } from "../../config/api";


function Transaction() {
  const [transactions, setTransactions] = useState([])

  //   GET TRANSACTION
  const getTransactions = async () => {
    const response = await API.get('/transactions')
    console.log('====================================');
    console.log(response.data.data);
    console.log('====================================');
    setTransactions(response.data.data)
  }
    
  useEffect(() => {
    getTransactions()
  },[])

  return (
    <div>

      <Navbaradmin/>

      <div className="container" style={{color:"#613D2B", marginBottom:70, marginTop:100, marginLeft:80 }}>
        <h3>Income Transaction</h3>
      </div>

      <div className="container px-5">
        <table className="table table-bordered border-dark">
            <thead>
            <tr>
                <th scope="col" className="bg-secondary bg-opacity-10">No</th>
                <th scope="col" className="bg-secondary bg-opacity-10">Name</th>
                <th scope="col" className="bg-secondary bg-opacity-10">Address</th>
                <th scope="col" className="bg-secondary bg-opacity-10">Post Code</th>
                <th scope="col" className="bg-secondary bg-opacity-10">Product Order</th>
                <th scope="col" className="bg-secondary bg-opacity-10">Status</th>
            </tr>
            </thead>
            <tbody>
            {transactions?.map((data, index) => (
            <tr>
                <th scope="row">{index + 1}</th>
                <td>{data?.user?.name}</td>
                <td>{data?.user?.address}</td>
                <td>{data?.user?.postcode}</td>
              {data?.carts?.map((item,index) => (
                <td key={index}>{item?.product?.title}</td>
              ))}
                <td className= {data?.status === "Waiting Approve" ? "status-transaction-WaitingApprove" : data?.status === "Success" ? "status-transaction-Success" : "status-transaction-Cancel"}>{data?.status}</td>
            </tr>
            ))}
            </tbody>
        </table>
      </div>

    </div>
  );
}

export default Transaction;
