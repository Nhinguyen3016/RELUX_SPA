import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import '../../styles/dashboard/chart.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const API_BASE_URL = 'http://localhost:3000/dashboard';

const BookingChart = () => {
    const [selectedYear, setSelectedYear] = useState(2024);
    const [bookingData, setBookingData] = useState([]);
    const [revenueData, setRevenueData] = useState([]);

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Static',
                font: {
                    size: 18,
                    family: 'Arial, sans-serif', 
                    weight: 'bold',
                },
                color: '#000000', 
                padding: {
                    top: 20,
                    bottom: 10,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 50,
                },
            },
            x: {
                position: 'bottom',
                ticks: {
                    padding: 10,
                },
            },
        },
    };

    const fetchData = async (year) => {
        try {
            const bookingData = [];
            const revenueData = [];

            for (let month = 1; month <= 12; month++) {
                const response = await axios.get(`${API_BASE_URL}/chart/booking`, {
                    params: { month, year }
                });
                const bookingCount = response.data.count || 0;
                bookingData.push(bookingCount);
            }

            for (let month = 1; month <= 12; month++) {
                const response = await axios.get(`${API_BASE_URL}/chart/revenue`, {
                    params: { month, year }
                });
                const revenue = response.data.revenue || 0;
                revenueData.push(revenue);
            }

            setBookingData(bookingData);
            setRevenueData(revenueData);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData(selectedYear);
    }, [selectedYear]);

    const bookingChartData = {
        labels: labels,
        datasets: [
            {
                label: 'Booking',
                data: bookingData,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                borderRadius: 30,
            }
        ],
    };

    const revenueChartData = {
        labels: labels,
        datasets: [
            {
                label: 'Revenue',
                data: revenueData,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                borderRadius: 30,
            }
        ],
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    return (
        <div className="chart-container">
            <div className="year-selector">
                <label htmlFor="year">Year: </label>
                <select id="year" value={selectedYear} onChange={handleYearChange}>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                </select>
            </div>

            <div className="chart">
                <h3>Bookings in {selectedYear}</h3>
                <Bar data={bookingChartData} options={options} />
            </div>

            <div className="chart">
                <h3>Revenue in {selectedYear}</h3>
                <Bar data={revenueChartData} options={options} />
            </div>
        </div>
    );
};

export default BookingChart;
