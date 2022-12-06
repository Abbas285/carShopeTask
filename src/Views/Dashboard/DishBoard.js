import React, { useEffect, useState } from "react";
import { getApiData, DleteApiData } from "Api Methods/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { SortingTable } from "components/ReactTable/Index";
const DishBoard = () => {
  const [carsData, setCarsData] = useState({
    noOfCars: [],
    noOfOrders: [],
    noOfCarColor: "",
    nofCarModels: "",
  });
  const navigate = useNavigate();
  const fechAllApiData = () => {
    getApiData({ route: "cars" }).then((res) => {
      setCarsData((prev) => ({
        ...prev,
        noOfCars: res.data,
        noOfCarColor: res.data.length,
        nofCarModels: res.data.length,
      }));
    });
    getApiData({ route: "order" }).then((res) => {
      setCarsData((prev) => ({
        ...prev,
        noOfOrders: res.data,
      }));
    });
  };
  useEffect(() => {
    fechAllApiData();
  }, []);
  const handleRemove = (data) => {
    DleteApiData({ route: `order/${data.id}` })
      .then(() => {
        toast("delete order Successfully");
        fechAllApiData();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const handleUpdate = (data) => {
    navigate("/dashboard/update", { state: { orderData: data } });
    console.log("issue", data);
  };
  const handleDetails = (data) => {
    navigate("/dashboard/details", { state: { orderData: data } });
  };

  const { noOfCars, noOfOrders, noOfCarColor, nofCarModels } = carsData;
  return (
    <div className="b-container-dashboard">
      <div className="col-12 m-b-20 m-t-20">
        <h4 className="tite-admin">Dashboard</h4>
      </div>
      <div className="row">
        <div className="col-xl-3 col-lg-6">
          <div className="admin-report gradientbg-primary align-items-center d-flex">
            <div className="ml-4">
              <h6>{noOfCars.length}</h6>
              <div className="ddd">No of Registered Cars</div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6">
          <div className="admin-report gradientbg-warning align-items-center d-flex">
            <div className="ml-4">
              <h6>{nofCarModels * nofCarModels}</h6>
              <div className="ddd">No of Registered Cars Models</div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6">
          <div className="admin-report gradientbg-default align-items-center d-flex">
            <div className="ml-4">
              <h6>{noOfCarColor * noOfCarColor}</h6>
              <div className="ddd">No of Registered cars color</div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6">
          <div className="admin-report gradientbg-pink align-items-center d-flex">
            <div className="ml-4">
              <h6>{noOfOrders.length || 0}</h6>
              <div className="ddd">Total order</div>
            </div>
          </div>
        </div>
      </div>
      <div className="row m-b-20">
        <div className="col-xl-12">
          <div className="card">
            <div className="d-flex chart-head justify-content-between align-items-center">
              <h5 className="tite-admin">Ordr list</h5>
            </div>

            <SortingTable
              handleUpdate={handleUpdate}
              handleRemove={handleRemove}
              handleDetails={handleDetails}
              tabledata={noOfOrders}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishBoard;
