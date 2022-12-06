import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const Index = () => {
  const oderStateModel = {
    carColor: "",
    carModel: "",
    carName: "",
    carRegistration: "",
    userEmail: "",
    userName: "",
  };
  const [orderDetil, setOrderCarData] = useState({
    ordermodel: oderStateModel,
  });
  const location = useLocation();
  useEffect(() => {
    if (location?.state) {
      setOrderCarData((prev) => ({
        ...prev,
        ordermodel: location?.state.orderData,
      }));
    }
  }, [location?.state]);
  const { ordermodel } = orderDetil;
  return (
    <div className="b-container-orderDetail">
      <div className="table-responsive m-t-15">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">User Name</th>
              <th scope="col">userEmail</th>
              <th scope="col">carName</th>
              <th scope="col">carColor</th>
              <th scope="col">carModel</th>
              <th scope="col">carRegistration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{ordermodel.userName}</td>
              <td>{ordermodel.userEmail}</td>
              <td>{ordermodel.carName}</td>
              <td>{ordermodel.carColor}</td>
              <td>{ordermodel.carModel}</td>
              <td>{ordermodel.carRegistration}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Index;
