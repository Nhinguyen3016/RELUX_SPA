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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_HOST}/v1/service-categories`);
        setCategories(res.data.data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
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

      try {
        const res = await axios.get(`${API_HOST}/v1/services/category/${selectedCategory}`);
        setServices(res.data.data || []);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedEmployee) {
      const employee = allEmployees.find(emp => emp.id === selectedEmployee);
      if (employee && employee.location) {
        setSelectedLocation(employee.location.id); // Automatically set the location when employee is selected
        setFilteredLocations([employee.location]); // Filter locations based on employee's location
        setFilteredEmployees([employee]); // Only show the selected employee
      }
    } else {
      setFilteredLocations(allLocations);
      setFilteredEmployees(allEmployees);
    }
  }, [selectedEmployee, allEmployees, allLocations]);

  useEffect(() => {
    if (selectedLocation) {
      const employeesInLocation = allEmployees.filter(employee =>
        employee.location && employee.location.id === selectedLocation
      );
      setFilteredEmployees(employeesInLocation);
      
      // Optionally, if there are employees in the selected location, auto-select the first one
      if (employeesInLocation.length > 0) {
        setSelectedEmployee(employeesInLocation[0].id);
      } else {
        setSelectedEmployee('');
      }
    } else {
      setFilteredEmployees(allEmployees);
    }
  }, [selectedLocation, allEmployees]);

  const handleEmployeeChange = (e) => {
    const employeeId = e.target.value;
    setSelectedEmployee(employeeId);
    setSelectedLocation(''); // Reset location when employee changes
  };

  const handleLocationChange = (e) => {
    const locationId = e.target.value;
    setSelectedLocation(locationId);
    setSelectedEmployee(''); // Reset employee when location changes
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      serviceCategory: e.target.serviceCategory.value,
      service: e.target.service.value,
      location: e.target.location.value,
      employee: e.target.employee.value,
    };

    onSubmit(formData);
  };

  return (
    <form className="service-form" onSubmit={handleSubmit}>
      {/* Service Category */}
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

      {/* Services */}
      <label htmlFor="service">Service</label>
      <select id="service" name="service" required>
        <option value="">- Select Service -</option>
        {services.map((service) => (
          <option key={service.id} value={service.id}>
            {service.name}
          </option>
        ))}
      </select>

      {/* Employees */}
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

      {/* Locations */}
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
