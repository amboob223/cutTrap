import React, { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";


function Owner() {
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getTotal = async () => {
    try {
      const formattedDate = selectedDate.toISOString().split("T")[0];

      const response = await fetch(`http://localhost:5000/owner?date=${formattedDate}`);
      const fetchedData = await response.json();

      if (fetchedData) {
        setData(fetchedData);

        // Calculate total revenue for the day
        const dayTotal = fetchedData.reduce(
          (accumulator, item) => accumulator + parseFloat(item.price),
          0
        );
        setTotal(dayTotal);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Call the function to fetch data when the component mounts or when the selectedDate changes
    getTotal();
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleDelete = async (id) => {
    try {
      // Perform a delete request to remove the entry with the given id
      await fetch(`http://localhost:5000/owner/${id}`, {
        method: "DELETE",
      });

      // After deletion, refresh the data
      getTotal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
       <Link to="/">Home</Link>
      <h2>Total Revenue for the Day: ${total}</h2>
      <label>Select Date: </label>
      <input
        type="date"
        value={selectedDate.toISOString().split("T")[0]}
        onChange={(e) => handleDateChange(new Date(e.target.value))}
      />
      
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.name}</td>
              <td>{entry.start_time}</td>
              <td>{entry.end_time}</td>
              <td>{entry.phone}</td>
              <td>{entry.email}</td>
              <td>
                <button onClick={() => handleDelete(entry.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Owner;
