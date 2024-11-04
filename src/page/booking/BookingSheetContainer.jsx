import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import '../../styles/booking/BookingSheet.css';
import FirstStepForm from "./components/FirstStepForm";
import SecondStepForm from "./components/SecondStepForm";
import ThirdStepForm from "./components/ThirdStepForm";
import FourthStepForm from "./components/FourthStepForm";
import LastStepForm from "./components/LastStepForm";
import { useSheetBooking } from "../../context/SheetContext";

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
    }
  })

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const closeSheet = () => {
    methods.reset();
    setCurrentStep(1);
    toggleShow();
  };

  const renderForm = () => {
    switch(currentStep) {
      case 1:
        return <FirstStepForm next={nextStep} />;
      case 2:
        return <SecondStepForm next={nextStep} prev={prevStep} />
      case 3:
        return <ThirdStepForm next={nextStep} prev={prevStep} />
      case 4:
        return <FourthStepForm next={nextStep} prev={prevStep} />
      case 5:
        return <LastStepForm prev={prevStep} onSubmit={methods.handleSubmit(onSubmit)} />
      default:
        return null;
    }
  };

  const onSubmit = (data) => {
    console.log("Final Submission Data:", data);
    toggleShow();
  };

  return (
    <div className={`sheet_container ${show ? "show" : "hidden"}`}>
      <div className="sheet_main">
        <button className="sheet_button sheet_button__close" onClick={closeSheet}>Close</button>
        <h3 className="sheet_header">Make an Appointment</h3>
        <FormProvider {...methods}>
          <div className="sheet_content">{renderForm()}</div>
        </FormProvider>
      </div>
    </div>
  )
}

export default BookingSheetContainer