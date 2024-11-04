import { useFormContext } from "react-hook-form";
import "../../../styles/booking/stepForm/FourthStepForm.css";
import 'react-international-phone/style.css';
import { PhoneInput } from 'react-international-phone';

const FourthStepForm = ({ next, prev }) => {
  const { register, setValue } = useFormContext();

  const handleChangePhone = (value) => {
    setValue("phone", value);
  }

  return (
    <div className="sheet_form">
      <div className="sheet_form__field">
        <label htmlFor="name">Name</label>
        <input
          {...register("name")}
          type="text"
          className="sheet_form__input"
          id="name"
        />
      </div>
      <div className="sheet_form__field">
        <label htmlFor="email">Email</label>
        <input
          {...register("email")}
          type="email"
          className="sheet_form__input"
          id="email"
        />
      </div>
      <div className="sheet_form__field">
        <label htmlFor="phone">Phone</label>
        <PhoneInput
          defaultCountry="vn"
          onChange={handleChangePhone}
          className="sheet_form__phone-input"
          id="phone"
          name="phone"
        />
      </div>
      <div className="sheet_form__field">
        <label htmlFor="booking-note">Booking Note</label>
        <textarea
          {...register("bookingNote")}
          className="sheet_form__textarea"
          placeholder="Enter examination details..."
          id="booking-note"
        />
      </div>
      <div className="sheet_form__action">
        <button className="sheet_button sheet_button__back" onClick={prev}>Back</button>
        <button className="sheet_button sheet_button__next" onClick={next}>Next</button>
      </div>
    </div>
  )
}

export default FourthStepForm