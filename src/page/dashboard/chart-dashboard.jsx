import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../../styles/dashboard/chart.css'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BookingChart = () => {
    const chartRef = useRef(null);

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Booking',
                data: [50, 200, 150, 100, 200, 80, 120, 90, 160, 250, 180, 70],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                borderRadius: 30,
            }
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Booking Overall Customer', 
                font: {
                    size: 24,
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
        },
    };

    useEffect(() => {
        const handleResize = () => {
            if (chartRef.current) {
                chartRef.current.chartInstance.resize();
            }
        };
        
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <div className="chart-container">
            <Bar data={data} options={options} />
        </div>
    );
};

export default BookingChart;