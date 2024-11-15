import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import '../../styles/booking/BookingSheet.css';
import { useSheetBooking } from "../../context/SheetContext";
import { customerSchema } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import BookingSheetProvider from "./BookingSheetProvider";

const BookingSheetContainer = () => {
  const { show, toggleShow } = useSheetBooking();
  const [currentStep, setCurrentStep] = useState(1);

  const methods = useForm({
    defaultValues: {
      appointmentDate: new Date(),
      timeZone: "9:00",
      employee: "",
      location: "",
      service: "",
      bookingNote: "",
      email: "",
      name: "",
      phone: "",
      note: "",
      payMethod: "onSite"
    }, 
    resolver: zodResolver(customerSchema),
  });

  const closeSheet = () => {
    methods.reset();
    setCurrentStep(1);
    toggleShow();
  };

  return (
    <div className={`sheet_container ${show ? "show" : "hidden"}`}>
      <div className="sheet_main">
        <button className="sheet_button sheet_button__close" onClick={closeSheet}>Close</button>
        <h3 className="sheet_header">Make an Appointment</h3>
        <BookingSheetProvider currentStep={currentStep} setCurrentStep={setCurrentStep}  />
      </div>
    </div>
  )
}

export default BookingSheetContainer