import React, { useEffect, useState } from 'react';
import '../../../styles/home/ServiceForm.css';
import axios from 'axios';

const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:3000';

const ServiceForm = ({ onSubmit }) => {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${API_HOST}/v1/service-categories`);
        setCategories(res.data.data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to fetch categories');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let allEmployees = [];
        let page = 1;
        let moreEmployees = true;

        while (moreEmployees) {
          const employeeRes = await axios.get(`${API_HOST}/v1/employees?page=${page}&limit=10`);
          const employeesData = employeeRes.data.data || [];
          allEmployees = [...allEmployees, ...employeesData];
          moreEmployees = employeesData.length === 10;
          page++;
        }

        setAllEmployees(allEmployees);

        const locationsData = allEmployees.flatMap(employee => employee.location ? [employee.location] : []);
        const uniqueLocations = Array.from(new Set(locationsData.map(loc => loc.id)))
          .map(id => locationsData.find(loc => loc.id === id));

        setAllLocations(uniqueLocations);
        setFilteredLocations(uniqueLocations);
      } catch (error) {
        console.error('Error fetching employees and locations:', error);
        setError('Failed to fetch employees and locations');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      if (!selectedCategory) {
        setServices([]);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${API_HOST}/v1/services/category/${selectedCategory}`);
        setServices(res.data.data || []);
      } catch (error) {
        console.error('Error fetching services:', error);
        setError('Failed to fetch services');
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedEmployee) {
      const employeeId = parseInt(selectedEmployee, 10);
      const employee = allEmployees.find(emp => emp.id === employeeId);
      if (employee && employee.location) {
        setFilteredLocations([employee.location]);
        setFilteredEmployees([employee]);
        setSelectedLocation(employee.location.id.toString());
      } else {
        setFilteredLocations([]);
        setFilteredEmployees([]);
      }
    } else {
      setFilteredLocations(allLocations);
      setFilteredEmployees(allEmployees);
    }
  }, [selectedEmployee, allEmployees, allLocations]);

  useEffect(() => {
    if (selectedLocation) {
      const locationId = parseInt(selectedLocation, 10);
      const employeesInLocation = allEmployees.filter(employee =>
        employee.location && employee.location.id === locationId
      );
      setFilteredEmployees(employeesInLocation);
      
      if (!employeesInLocation.some(emp => emp.id.toString() === selectedEmployee)) {
        setSelectedEmployee("");
      }
    } else {
      setFilteredEmployees(allEmployees);
    }
  }, [selectedLocation, allEmployees, selectedEmployee]);

  const handleEmployeeChange = (e) => {
    const employeeId = e.target.value;
    setSelectedEmployee(employeeId);
  };

  const handleLocationChange = (e) => {
    const locationId = e.target.value;
    setSelectedLocation(locationId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      serviceCategory: parseInt(e.target.serviceCategory.value, 10),
      service: parseInt(e.target.service.value, 10),
      location: parseInt(selectedLocation, 10),
      employee: parseInt(selectedEmployee, 10),
    };

    // Get selected service's price and promotionId
    const selectedService = services.find(service => service.id === formData.service);
    const price = selectedService ? selectedService.price : null;
    const promotionId = selectedService ? selectedService.promotionId : null;

    // Fetch promotion details if promotionId exists
    if (promotionId) {
      axios.get(`${API_HOST}/v1/promotions/${promotionId}`)
        .then((res) => {
          const discountPercentage = res.data.data ? parseFloat(res.data.data.discountPercentage) : 0;

          // Store selected data in localStorage
          localStorage.setItem('selectedEmployeeId', formData.employee.toString());
          localStorage.setItem('selectedLocationId', formData.location.toString());
          if (price) localStorage.setItem('servicePrice', price);
          if (discountPercentage) localStorage.setItem('serviceDiscountPercentage', discountPercentage);
          if (promotionId) localStorage.setItem('promotionId', promotionId);  // Store promotionId

          console.log('Submitting form data:', formData);
          onSubmit({ ...formData, discountPercentage });
        })
        .catch((error) => {
          console.error('Error fetching promotion details:', error);
          setError('Failed to fetch promotion');
        });
    } else {
      console.log('No promotion for this service');
      localStorage.setItem('serviceDiscountPercentage', 0);
      onSubmit(formData);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <form className="service-form-home" onSubmit={handleSubmit}>
      <label htmlFor="serviceCategory">Service Category</label>
      <select
        id="serviceCategory"
        name="serviceCategory"
        required
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">- Select Category -</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <label htmlFor="service">Service</label>
      <select 
        id="service" 
        name="service" 
        required
        disabled={!selectedCategory}
      >
        <option value="">- Select Service -</option>
        {services.map((service) => (
          <option key={service.id} value={service.id}>
            {service.name}
          </option>
        ))}
      </select>

      <label htmlFor="employee">Employee</label>
      <select 
        id="employee" 
        name="employee" 
        required
        value={selectedEmployee}
        onChange={handleEmployeeChange}
      >
        <option value="">- Select Employee -</option>
        {filteredEmployees.map((employee) => (
          <option key={employee.id} value={employee.id}>
            {employee.name}
          </option>
        ))}
      </select>

      <label htmlFor="location">Location</label>
      <select 
        id="location" 
        name="location" 
        required
        value={selectedLocation}
        onChange={handleLocationChange}
      >
        <option value="">- Select Location -</option>
        {filteredLocations.map((location) => (
          <option key={location.id} value={location.id}>
            {location.address}
          </option>
        ))}
      </select>

      <button type="submit" className="next-btn">Next</button>
    </form>
  );
};

export default ServiceForm;
