import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import "../App.css";


const stripePromise = loadStripe("pk_test_51Oia2ME02fj2AjRf2JEN09ww7eJklTtuJFaZLQUXBRcLgCC8TRwy36OQg54s4BwYpxeYSAvLJv4daoX3vMIuzcrN00d4dfDJHm"); // Replace with your actual publishable key


function Form() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    start: "",
    end: "",
    email: "",
    phone: "",
    price: 0 // Initial value for the price
  });

  const [tot, setTot] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  const formHandler = async (e) => {
    e.preventDefault();

    // Check for time conflicts before submitting the form
    const conflicts = await checkTimeConflicts(formData.date, formData.start, formData.end);

    if (conflicts) {
      alert("Selected time is already booked. Please choose a different time.");
    } else {
      // If no conflicts, proceed with submitting the form
      submitForm();
    }
  };

  const handleTimeChange = () => {
    if (formData.start && formData.end) {
      const startTime = new Date(`${formData.date}T${formData.start}`);
      const endTime = new Date(`${formData.date}T${formData.end}`);
      const timeDifference = endTime - startTime;
      const totalTimeInHours = timeDifference / (1000 * 60 * 60);
      const totalCharge = totalTimeInHours * 5; // $5 per hour
      setTot(totalCharge);
      setFormData({...formData, price:totalCharge})
    }
  };

  const handleConfirm = () => {
    handleTimeChange(); // Calculate total charge when confirming
    setConfirmed(true);
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for time conflicts before submitting the form
    const conflicts = await checkTimeConflicts(formData.date, formData.start, formData.end);

   if (conflicts) {
      alert(
        "Selected time is already booked. Please choose a different time."
      );
    } else {
      // If no conflicts, proceed with submitting the form
      submitForm();
    }
  
  };

  const checkTimeConflicts = async (date, start, end) => {
    try {
      const response = await fetch(`http://localhost:5000/sign?date=${date}&start=${start}&end=${end}`);
      const data = await response.json();
      return data.conflicts; // Assuming the server responds with a property 'conflicts'
    } catch (error) {
      console.error("Error checking time conflicts:", error);
      return true; // Assume conflict in case of an error
    }
  };

  const submitForm = async () => {
    try {
      // Proceed with submitting the form (making a POST request to sign endpoint)
      const response = await fetch("http://localhost:5000/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      handlePayment()
  
      // Check if the response is successful (status code 2xx)
      if (response.ok) {
        // Clear form data after successful submission
        setFormData({
          name: "",
          date: "",
          start: "",
          end: "",
          email: "",
          phone: ""
        });
  
        setTot(0); // Reset total charge
        setConfirmed(false); // Reset confirmation status
        alert("Thank you for submitting!");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };
  
const handlePayment = async () => {
  
  try {
  
    const stripe = await stripePromise;

    const response = await fetch('http://localhost:5000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer sk_test_51Oia2ME02fj2AjRfCm6lH09HloiDztl2Qm0Qf4VjvAORMYCR38bs4qvXZbWs8fjYXfdVMur8D1Jf8ZMupnZ4A2wU00hzkAXUBT`,
      },
      body: JSON.stringify({
        items: [
          { id: 1, quantity: 1, priceInCents:Math.round(tot * 100) }, // Use tot as the price in cents
        ],
      }),
    });

    if (response.ok) {
      const session = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } else {
      console.error('Failed to create checkout session');
    }
  } catch (error) {
    console.error('Error handling checkout:', error);
  }
};

  return (
    <div>
      <div className="row justify-content-center" >
        <div style={{display:"flex", justifyItems:"space-between",marginTop:"2%"}}>

<div style={{width:"50%", justifyItems:"space-between"}}>
  <h1>
    What is the CutTrap
  </h1>
  <p>
  Welcome to CutTrap – your go-to for booth bookings and managing hair-cutting schedules.
   Shop owners can sign up to track daily bookings and easily manage their appointments.
    Enjoy the convenience of paying with Stripe. 
     Join CutTrap now!
  </p>
  
</div>
         


          <div>
             <h1>
            Book your booth space
          </h1>
          <form onSubmit={formHandler}>
         
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" className="form-control" id="name" name="name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input type="date" className="form-control" id="date" name="date" onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="start">Start Time:</label>
              <input type="time" className="form-control" id="start" name="start" onChange={(e) => setFormData({ ...formData, start: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="end">End Time:</label>
              <input type="time" className="form-control" id="end" name="end" onChange={(e) => setFormData({ ...formData, end: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="text" className="form-control" id="email" name="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input type="text" className="form-control" id="phone" name="phone" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </div>
            

            {confirmed ? (
              <>
                               <button type="button" className="btn btn-success" onClick={handleSubmit}>
                  Pay Now
                </button>
              </>
            ) : (
              <>
                <button type="button" className="btn btn-success" onClick={handleConfirm}>
                  Confirm
                </button>

              </>
            )}
          </form>
          <div>
          </div>
         
            <h2>${tot} is your total</h2>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Form;