import React, { useEffect, useState } from 'react';
import '../../../styles/home/ServiceForm.css';
import axios from 'axios';

const ServiceForm = ({ onSubmit, host }) => {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [locations, setLocations] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
     
        const categoryRes = await axios.get(`${host}/v1/service-categories`);
        setCategories(categoryRes.data);

        const serviceRes = await axios.get(`${host}/v1/services/1`);
        setServices(serviceRes.data); 
        
      
        const locationRes = await axios.get(`${host}/v1/services/1`);
        setLocations(locationRes.data);

        const employeeRes = await axios.get(`${host}/v1/services/1`);
        setEmployees(employeeRes.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [host]); 

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      serviceCategory: e.target.serviceCategory.value,
      service: e.target.service.value,
      location: e.target.location.value,
      employee: e.target.employee.value
    };

    onSubmit(formData);
  };

  return (
    <form className="service-form" onSubmit={handleSubmit}>
      <label htmlFor="serviceCategory">Service Category</label>
      <select id="serviceCategory" name="serviceCategory" required>
        <option value="">-Any-</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>

      <label htmlFor="service">Service</label>
      <select id="service" name="service" required>
        <option value="">-Select-</option>
        {services.map(service => (
          <option key={service.id} value={service.id}>{service.name}</option>
        ))}
      </select>

      <label htmlFor="location">Location</label>
      <select id="location" name="location" required>
        <option value="">-Any-</option>
        {locations.map(location => (
          <option key={location.id} value={location.id}>{location.name}</option>
        ))}
      </select>

      <label htmlFor="employee">Employee</label>
      <select id="employee" name="employee" required>
        <option value="">-Any-</option>
        {employees.map(employee => (
          <option key={employee.id} value={employee.id}>{employee.name}</option>
        ))}
      </select>

      <button type="submit" className="next-btn">Next</button>
    </form>
  );
};

export default ServiceForm;
