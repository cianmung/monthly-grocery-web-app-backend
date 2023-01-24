import { useContext } from "react";
import SelectedTypeContext from "../context/SelectedTypeProvider";

const useSelectedType = () => {
  return useContext(SelectedTypeContext);
};

export default useSelectedType;
