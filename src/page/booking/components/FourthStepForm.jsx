import { useFormContext } from "react-hook-form";
import "../../../styles/booking/stepForm/FourthStepForm.css";
import 'react-international-phone/style.css';
import { PhoneInput } from 'react-international-phone';
import FormErrorMessage from "../../account/component/FormErrorMessage";

const FourthStepForm = ({ next, prev }) => {
  const { register, setValue , formState: { errors }, } = useFormContext();

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
        {errors.name && (
          <FormErrorMessage>{errors.name.message}</FormErrorMessage>
        )}
      </div>
      <div className="sheet_form__field">
        <label htmlFor="email">Email</label>
        <input
          {...register("email")}
          type="email"
          className="sheet_form__input"
          id="email"
        />
        {errors.email && (
          <FormErrorMessage>{errors.email.message}</FormErrorMessage>
        )}
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
        {errors.phone && (
          <FormErrorMessage>{errors.phone.message}</FormErrorMessage>
        )}
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