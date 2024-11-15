import { useFormContext } from "react-hook-form";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import CustomHeaderDatePicker from "./CustomHeaderDatePicker";
import "../../../styles/booking/stepForm/SecondStepForm.css";

const timeZones = [
  { label: "9:00", value: "9:00" },
  { label: "10:00", value: "10:00" },
  { label: "11:00", value: "11:00" },
  { label: "12:00", value: "12:00" },
  { label: "13:00", value: "13:00" },
  { label: "14:00", value: "14:00" },
];

const SecondStepForm = ({ next, prev }) => {
  const { register, setValue } = useFormContext();

  const handleDateChange = (date) => {
    setValue("appointmentDate", date);
  };

  return (
    <div className="sheet_form">
      <DatePicker
        calendarClassName="sheet_form__calendar"
        onChange={handleDateChange}
        inline
        minDate={new Date()}
        renderCustomHeader={CustomHeaderDatePicker}
      />
      <div className="sheet_form__time">
        {timeZones.map((zone) => (
          <div key={zone.value} className="sheet_form__time_item">
            <input
              type="radio"
              value={zone.value}
              id={zone.value}
              {...register("timeZone")}
            />
            <label htmlFor={zone.value}>{zone.label}</label>
          </div>
        ))}
      </div>
      <div className="sheet_form__action">
        <button className="sheet_button sheet_button__back" onClick={prev}>Back</button>
        <button className="sheet_button sheet_button__next" onClick={next}>Next</button>
      </div>
    </div>
  )
}

export default SecondStepForm