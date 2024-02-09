import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Owner from "./owner";
import "../App.css";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    start: "",
    end: "",
    email: "",
    phone: "",
    price: 0,
  });

  const [tot, setTot] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  const formHandler = async (e) => {
    e.preventDefault();
    const conflicts = await checkTimeConflicts(
      formData.date,
      formData.start,
      formData.end
    );

    if (conflicts) {
      alert(
        "Selected time is already booked. Please choose a different time."
      );
    } else {
      submitForm();
    }
  };

  const handleTimeChange = () => {
    if (formData.start && formData.end) {
      const startTime = new Date(`${formData.date}T${formData.start}`);
      const endTime = new Date(`${formData.date}T${formData.end}`);
      const timeDifference = endTime - startTime;
      const totalTimeInHours = timeDifference / (1000 * 60 * 60);
      const totalCharge = totalTimeInHours * 5;
      setTot(totalCharge);
      setFormData({ ...formData, price: totalCharge });
    }
  };

  const handleConfirm = () => {
    handleTimeChange();
    setConfirmed(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const conflicts = await checkTimeConflicts(
      formData.date,
      formData.start,
      formData.end
    );

    if (conflicts) {
      alert(
        "Selected time is already booked. Please choose a different time."
      );
    } else {
      submitForm();
    }
  };

  const checkTimeConflicts = async (date, start, end) => {
    try {
      const response = await fetch(
        `http://localhost:5000/sign?date=${date}&start=${start}&end=${end}`
      );
      const data = await response.json();
      return data.conflicts;
    } catch (error) {
      console.error("Error checking time conflicts:", error);
      return true;
    }
  };

  const submitForm = async () => {
    try {
      const response = await fetch("http://localhost:5000/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          name: "",
          date: "",
          start: "",
          end: "",
          email: "",
          phone: "",
        });

        setTot(0);
        setConfirmed(false);
        alert("Thank you for submitting!");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div>
      <div className="row justify-content-center">
        <div>
          <form onSubmit={formHandler}>
            {/* ... (rest of your form) ... */}
          </form>
          <div>
            <h2>${tot} is your total</h2>
          </div>
        </div>
      </div>

      {/* Link to navigate to the /owner route */}
      <Link to="/owner">Go to Owner Page</Link>

      <Router>
        <Routes>
          <Route path="/owner" element={<Owner />} />
        </Routes>
      </Router>
    </div>
  );
}

export default Form;
