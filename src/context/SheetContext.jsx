import { createContext, useContext, useState } from "react";

export const SheetContext = createContext(null);

export const SheetProvider = ({ children }) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow((prev) => !prev);

  return (
    <SheetContext.Provider value={{ show, setShow, toggleShow }}>
      {children}
    </SheetContext.Provider>
  )
}

export const useSheetBooking = () => useContext(SheetContext);