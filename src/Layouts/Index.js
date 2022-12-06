import React from "react";
import Sidebar from "./SideBar";

import { Outlet } from "react-router-dom";
const Index = () => {
  // h-100
  return (
    <>
      <div className="full-height">
        <div className="main-page-admin">
          <div className="row" style={{ height: "100vh" }}>
            <Sidebar />
            <div className="col-xl-10 col-lg-9">
              <div className="content-page-admin">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
