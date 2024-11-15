import FirstStepForm from "./components/FirstStepForm";
import SecondStepForm from "./components/SecondStepForm";
import ThirdStepForm from "./components/ThirdStepForm";
import FourthStepForm from "./components/FourthStepForm";
import LastStepForm from "./components/LastStepForm";
import '../../styles/booking/BookingSheet.css';

import { useForm, FormProvider } from "react-hook-form";
import { customerSchema } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";


const BookingSheetProvider = () => {
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

    const nextStep = () => setCurrentStep((prev) => prev + 1);
    const prevStep = () => setCurrentStep((prev) => prev - 1);
  
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
    };

    return (
        <FormProvider {...methods}>
          <div className="sheet_content">{renderForm()}</div>
        </FormProvider>
    )
}

export default BookingSheetProvider;