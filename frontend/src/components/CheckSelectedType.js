import { Outlet, Navigate, useLocation } from "react-router-dom";
import useSelectedType from "../hooks/useSelectedType";

const CheckSelectedType = () => {
  const { selectedType } = useSelectedType();
  const location = useLocation();

  return (
    <>
      {selectedType ? (
        <Outlet />
      ) : (
        <Navigate to="/selectgrocerytype" state={{ from: location }} replace />
      )}
    </>
  );
};

export default CheckSelectedType;
