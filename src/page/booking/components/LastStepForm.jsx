import { useFormContext } from "react-hook-form";
import VNPayLogo from "../../../images/vnpay.svg";

const LastStepForm = ({ prev, onSubmit }) => {
  const { register, watch } = useFormContext();

  const service = watch("service");
  const serviceData = service
    ? JSON.parse(service)
    : { name: "Not Selected", price: 0 };

  return (
    <div className="sheet_form">
      <table className="sheet_table">
        <tbody>
          <tr>
            <td>{serviceData?.name}</td>
            <td className="sheet_table__value">${serviceData?.price}</td>
          </tr>
          <tr>
            <td>Subtotal</td>
            <td className="sheet_table__value">${serviceData?.price}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td className="sheet_table__value">${serviceData?.price}</td>
          </tr>
        </tbody>
      </table>
      <div className="sheet_form__field option">
        <label htmlFor="onSite" className="sheet_option">
          <input
            type="radio"
            id="onSite"
            value="onSite"
            {...register("payMethod")}
          />
          <span className="sheet_option__name">Pay On-site</span>
        </label>
        <label htmlFor="vnPay" className="sheet_option">
          <input
            type="radio"
            id="vnPay"
            value="vnPay"
            {...register("payMethod")}
          />
          <div className="sheet_option__content">
            <img
              src={VNPayLogo}
              alt="vnpay logo"
              className="sheet_option__image"
            />
            <span className="sheet_option__name">VNPAY e-wallet</span>
          </div>
        </label>
      </div>
      <div className="sheet_form__action">
        <button className="sheet_button sheet_button__next" onClick={onSubmit}>Reserve</button>
        <button className="sheet_button sheet_button__back" onClick={prev}>
          Back
        </button>
      </div>
    </div>
  );
};

export default LastStepForm;
