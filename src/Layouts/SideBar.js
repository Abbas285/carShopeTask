import React from "react";
import { Link, useLocation } from "react-router-dom";
import left_bar_icon_1 from "images/left-bar-icon-1.svg";
import left_bar_icon_2 from "images/left-bar-icon-2.svg";
import left_bar_icon_3 from "images/icn-04.svg";
import { useDispatch } from "react-redux";
import { cleartoken } from "Redux/AuthSlice";
const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  let path = location.pathname;
  const logoutUser = () => {
    dispatch(cleartoken());
  };
  return (
    <div className="col-xl-2 col-lg-3">
      <div className="left-side-menu-admin">
        <div className="navbar-expand-lg p-0">
          <div className="scrollabel">
            <div id="accordionExample">
              <ul
                id="side-main-menu"
                className="side-navbar side-menu list-unstyled"
              >
                <li>
                  <Link
                    to="/dashboard"
                    className={` mt-2  ${
                      path === "/dashboard" ? "active" : ""
                    }`}
                  >
                    <span className="img-icon">
                      <img
                        className="img-fluid icon-bike"
                        src={left_bar_icon_1}
                        alt="imageprop"
                      />
                    </span>{" "}
                    <span className="text-hidee">Dashboard </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/addnew"
                    className={` mt-2  ${
                      path === "/dashboard/addnew" ? "active" : ""
                    }`}
                  >
                    <span className="img-icon">
                      <img
                        className="img-fluid icon-bike"
                        src={left_bar_icon_2}
                        alt="imageprop"
                      />
                    </span>{" "}
                    <span className="text-hidee">Add new Order</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="#/"
                    className={` mt-2  ${
                      path === "/dashboard/addnew" ? "active" : ""
                    }`}
                    onClick={logoutUser}
                  >
                    <span className="img-icon">
                      <img
                        className="img-fluid icon-bike"
                        src={left_bar_icon_3}
                        alt="imageprop"
                      />
                    </span>{" "}
                    <span className="text-hidee">Log Out</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
