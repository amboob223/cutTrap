import React, { useState, useEffect } from "react";
import "../App.css";

function Owner() {
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getTotal = async () => {
      try {
        const response = await fetch("http://localhost:5000/sign", {
          method: "GET",
        });

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

    // Call the function to fetch data when the component mounts
    getTotal();
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  return (
    <div>
      <h2>Total Revenue for the Day: ${total}</h2>
      {/* Render other components or display additional information as needed */}
    </div>
  );
}

export default Owner;
