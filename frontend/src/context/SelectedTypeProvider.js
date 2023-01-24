import { createContext, useState } from "react";

const SelectedTypeContext = createContext({});

export const SelectedTypeProvider = ({ children }) => {
  const [selectedType, setSelectedType] = useState({});
  return (
    <SelectedTypeContext.Provider value={{ selectedType, setSelectedType }}>
      {children}
    </SelectedTypeContext.Provider>
  );
};

export default SelectedTypeContext;
