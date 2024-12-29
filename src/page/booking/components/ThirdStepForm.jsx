import { useFormContext } from "react-hook-form";
import "../../../styles/booking/stepForm/ThirdStepForm.css";

const ThirdStepForm = ({ next, prev }) => {
  const { watch } = useFormContext();

  const employee = watch("employee");
  const service = watch("service");

  console.log({ employee, service });

  const employeeData = employee ? JSON.parse(employee) : { name: "Not Selected", fee: 0 };
  const serviceData = service ? JSON.parse(service) : { name: "Not Selected", price: 0 };

  const location = watch("location");

  const appointmentDate = watch("appointmentDate");
  const formattedDate = appointmentDate ? new Date(appointmentDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }) : "Not selected";

  return (
    <div className="sheet_form form_step_third">
      <div className="sheet_information">
        <div className="sheet_info__content">
          <h4 className="sheet_info__content-header">{serviceData?.name}</h4>
          <p className="sheet_info__content-second">{formattedDate}, {watch("timeZone")}</p>
        </div>
        <div className="sheet_info__content">
          <h4 className="sheet_info__content-header">Location</h4>
          <p className="sheet_info__content-second">{location}</p>
        </div>
        <div className="sheet_info__combo">
          <div className="sheet_info__content">
            <h4 className="sheet_info__content-header">Employee</h4>
            <p className="sheet_info__content-second">{employeeData?.name}</p>
          </div>
          <div className="sheet_info__content">
            <h4 className="sheet_info__content-header">Price</h4>
            <p className="sheet_info__content-second">${serviceData?.price}</p>
          </div>
        </div>
      </div>
      <h3 className="sheet_info__total-price">Total: ${serviceData?.price}</h3>
      <div className="sheet_form__action">
        <button className="sheet_button sheet_button__back" onClick={prev}>Back</button>
        <button className="sheet_button sheet_button__next" onClick={next}>Next</button>
      </div>
    </div>
  )
}

export default ThirdStepForm