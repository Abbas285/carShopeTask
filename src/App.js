import "styles/App.scss";
import { Routes, Route } from "react-router-dom";
import LoginPage from "Views/LoginScreen/LoginPage";
import SignInPage from "Views/LoginScreen/SignInPage";
import Dashboard from "Views/Dashboard/DishBoard";
import ProtectedRoutes from "Routes/ProtectedRoutes";
import { ToastContainer } from "react-toastify";
import Layouts from "Layouts/Index";
import UpdateRecourd from "Views/Update Order/Index";
import AddNewOrder from "Views/AddOrder/Index";
import DetailOrder from "Views/OrderDetails/Index";
function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signin" element={<SignInPage />}></Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Layouts />
            </ProtectedRoutes>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/dashboard/update" element={<UpdateRecourd />} />
          <Route path="/dashboard/addnew" element={<AddNewOrder />} />
          <Route path="/dashboard/details" element={<DetailOrder />} />
        </Route>

        <Route path="*" element={<LoginPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
