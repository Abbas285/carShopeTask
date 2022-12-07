import React, { useState, useEffect } from "react";
import { getApiData, postApiData } from "Api Methods/Api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Index = () => {
  const [formData, setFormData] = useState({
    carField: "",
    colorField: "",
    modelField: "",
    regestrationField: "",
    regesterdCarData: [],
    carColorData: [],
    carModelData: [],
  });
  const curentUser = useSelector((state) => state.curentUser);
  const navigate = useNavigate();
  useEffect(() => {
    getApiData({ route: "cars" }).then((res) => {
      setFormData((prev) => ({
        ...prev,
        regesterdCarData: res.data,
      }));
    });
  }, []);
  const carHandleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const validation = () => {
    const { carField, colorField, modelField, regestrationField } = formData;
    let error = false;
    if (carField.trim() === "") {
      error = true;
    } else if (carField === "Select Car") {
      error = true;
    } else if (colorField.trim() === "") {
      error = true;
    } else if (modelField.trim() === "") {
      error = true;
    } else if (regestrationField.trim() === "") {
      error = true;
    }
    return error;
  };
  useEffect(() => {
    if (formData.carField && formData.carField !== "Select Car") {
      const selectcarData = formData.regesterdCarData.filter(
        (item) => item.carName.replace(/"/g, "") === formData.carField
      );

      setFormData((prev) => ({
        ...prev,
        carColorData: selectcarData[0].carColor,
        carModelData: selectcarData[0].model,
        regestrationField: selectcarData[0].regestrationNo,
        colorField: "",
        modelField: "",
      }));
    }
  }, [formData.carField, formData.regesterdCarData]);
  const submitHandleForm = (e) => {
    e.preventDefault();
    const validationresult = validation();
    if (validationresult) {
      toast.error("please select field first");
      return;
    }
    const apiModel = {
      userName: curentUser.userName,
      userEmail: curentUser.userEmail,
      carName: formData.carField,
      carColor: formData.colorField,
      carModel: formData.modelField,
      carRegistration: formData.regestrationField,
    };
    postApiData({
      route: "order",
      data: apiModel,
    })
      .then(() => {
        toast("success");
        navigate("/dashboard");
      })
      .catch((error) => {
        toast(error.message);
      });
  };
  const {
    regesterdCarData,
    carField,
    colorField,
    carColorData,
    modelField,
    carModelData,
    regestrationField,
  } = formData;

  return (
    <div className="b-addNew-container">
      <h4 className="b-addNew-container__title ">Add New </h4>
      <form onSubmit={submitHandleForm}>
        <div className="row b-addNew-container__row ">
          <div className="col-sm-12 col-md-6 col-lg-4 b-addNew-container__fieldSection">
            <select
              id="carField"
              value={carField}
              name="carField"
              onChange={carHandleChange}
            >
              <option value="Select Car">Select Car</option>
              {regesterdCarData.length > 0 &&
                regesterdCarData.map((item) => {
                  return (
                    <option key={item.carId} value={item.carName}>
                      {item.carName}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 b-addNew-container__fieldSection">
            <select
              id="colorField"
              value={colorField}
              name="colorField"
              onChange={carHandleChange}
            >
              <option value="">Select Car Color</option>
              {carColorData.length > 0 &&
                carColorData.map((item) => {
                  return (
                    <option key={item.colorId} value={item.color}>
                      {item.color}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 b-addNew-container__fieldSection">
            <select
              id="modelField"
              value={modelField}
              name="modelField"
              onChange={carHandleChange}
            >
              <option value="">Select Car Model</option>
              {carModelData.length > 0 &&
                carModelData.map((item) => {
                  return (
                    <option key={item.modelId} value={item.modelYear}>
                      {item.modelYear}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 b-addNew-container__fieldSection">
            <input
              placeholder="registration car number"
              value={regestrationField}
              disabled
            />
          </div>
        </div>
        <div className="row b-addNew-container__row ">
          <div className="col-sm-12 col-md-6 col-lg-4 b-addNew-container__button">
            <button type="submit"> Add Car</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Index;
