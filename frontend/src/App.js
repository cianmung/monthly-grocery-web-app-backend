import { Route, Routes } from "react-router-dom";
//components
import Layout from "./components/Layout";
import Home from "./components/Home/Home";
import About from "./components/About";
import AddNewGrocery from "./components/AddNewGrocery";
import PaymentDetails from "./components/PaymentDetails";
import EditPaymentDetail from "./components/EditPaymentDetail";
import ResultPayments from "./components/ResultPayments";
import Login from "./components/Login";
import SelectGroceryType from "./components/SelectGroceryType";
import Profile from "./components/Profile";

import RequiredAuth from "./components/auth/RequiredAuth";
import PersistLogin from "./components/auth/PersistLogin";
import Error from "./components/auth/Error";

const ROLES = {
  Admin: 1001,
  User: 1002,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        {/* protected routes */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequiredAuth allowedRoles={[ROLES.Admin, ROLES.User]} />}
          >
            <Route index element={<Home />} />
            <Route path="selectgrocerytype" element={<SelectGroceryType />} />
            <Route path="about" element={<About />} />
            <Route path="profile" element={<Profile />} />
            <Route path="newgrocery" element={<AddNewGrocery />} />
            <Route path="paymentdetail">
              <Route path=":name" element={<PaymentDetails />} />
            </Route>
            <Route path="editpaymentdetail">
              <Route path=":id" element={<EditPaymentDetail />} />
            </Route>
            <Route path="calculatepayments" element={<ResultPayments />} />
          </Route>
        </Route>
        {/* error */}
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
