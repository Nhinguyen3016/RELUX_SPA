import { useFormContext } from "react-hook-form";
import "../../../styles/booking/stepForm/FirstStepForm.css";

const employees = [
  { id: 1, name: "Smith", fee: 100 },
  { id: 2, name: "Johnson", fee: 200 },
  { id: 3, name: "Williams", fee: 300 },
];

const services = [
  { id: 1, name: "Aroma Therapy", price: 100 },
  { id: 2, name: "Deep Tissue", price: 200 },
  { id: 3, name: "Swedish", price: 300 },
]

const FirstStepForm = ({ next }) => {
  const { register } = useFormContext();

  return (
    <div className="sheet_form">
      <div className="sheet_form__field">
        <label htmlFor="service">Service</label>
        <select
          {...register("service")}
          className="sheet_form__select"
          id="service"
        >
          <option value=""> -Select- </option>
          {services.map((service) => (
            <option key={service.id} value={JSON.stringify(service)}>
              {service.name}
            </option>
          ))}
        </select>
      </div>
      <div className="sheet_form__field">
        <label htmlFor="location">Location</label>
        <select
          {...register("location")}
          className="sheet_form__select"
          id="location"
        >
          <option value=""> -Any- </option>
          <option value="DaNang">Location 1</option>
          <option value="HaNoi">Location 2</option>
          <option value="HoChiMinh">Location 3</option>
        </select>
      </div>
      <div className="sheet_form__field">
        <label htmlFor="employee">Employee</label>
        <select
          {...register("employee")}
          className="sheet_form__select"
          id="employee"
        >
          <option value=""> -Any- </option>
          {employees.map((employee) => (
            <option key={employee.id} value={JSON.stringify(employee)}>
              {employee.name}
            </option>
          ))}
        </select>
      </div>
      <button className="sheet_button first_step__button" onClick={next}>
        Next
      </button>
    </div>
  );
};

export default FirstStepForm;