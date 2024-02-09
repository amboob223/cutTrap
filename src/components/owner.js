import React, { useState, useEffect } from "react";
import "../App.css";

function Owner() {
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const getTotal = async () => {
      try {
        const formattedDate = selectedDate.toISOString().split("T")[0];

        const response = await fetch(`http://localhost:5000/owner?date=${formattedDate}`);
        const fetchedData = await response.json();

        if (fetchedData) {
          setData(fetchedData);

          // Calculate total revenue for the day
          const dayTotal = fetchedData.reduce(
            (accumulator, item) => accumulator + item.price,
            0
          );

          setTotal(dayTotal);
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Call the function to fetch data when the component mounts or when the selectedDate changes
    getTotal();
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <h2>Total Revenue for the Day: ${total}</h2>
      <label>Select Date: </label>
      <input
        type="date"
        value={selectedDate.toISOString().split("T")[0]}
        onChange={(e) => handleDateChange(new Date(e.target.value))}
      />
      {/* Render other components or display additional information as needed */}
    </div>
  );
}

export default Owner;
