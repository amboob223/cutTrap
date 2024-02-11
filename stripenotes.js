//this is some of the stripe stuff
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
require('dotenv').config();

//middleware
app.use(cors());
app.use(express.json());

app.post("/help",async(req,res)=>{
    const {name,phone,email,industry,bproblem} = req.body;
    const data = await pool.query(
    "INSERT INTO help( name,phone,email,industry,bproblem) VALUES($1,$2,$3,$4,$5) RETURNING *",
    [name,phone,email,industry,bproblem]
        ) 
    res.json(data.rows[0]);
 
})

const storeItems = new Map([
    [ 1, {priceInCents:10000, name:"Econometrics"}],
    [2,{priceInCents:10000, name:"Blockchain Dev"}],
      [3,{priceInCents:10000, name:"Business Dev"}]
])


app.post("/create-checkout-session", async (req, res) => {
  const { items } = req.body;

  try {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    const lineItems = items.map(item => {
      const storeItem = storeItems.get(item.id);
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: storeItem.name,
            // You can add more details to the product_data if needed
          },
          unit_amount: storeItem.priceInCents,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/success.html",
      cancel_url: "http://localhost:3000/cancel.html",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).send("Internal Server Error");
  }
});


app.listen("5000",()=>{
    console.log("server Works")
})



//and


import {React,useState} from "react";
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe("pk_test_51Od38iLYxzXgDlcw7O1YAHla6vvYavDll3IWvVlR2afP7RtD2MQ4TiZ1CTT1P6ZWfHFOLdelqHK1GQvLbyEkrD0j00aczd4JTs");


const Help = () => {
  const [formData,setFormData] = useState({
    name:"",
    phone:"",
    email:"",
    industry:"",
    bproblem:""
  });

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }; // this is makeing an function called handle input change that takes an
     // event parameter and puts it target in a variaobject hat takes and then
     // in the setformdata we give it an object it uses the spread operatorto 
     //repeat the value of the formdata and we erapolate from the varible the name as the key 
     // 

     //stripe
     const ECheckoutClick = async () => {
    try {
      const stripe = await stripePromise;

      const response = await fetch('http://localhost:5000/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          items: [
            { id: 1, quantity: 1 }, // Replace with the correct item IDs and quantities
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

  const BCheckoutClick = async () => {
    try {
      const stripe = await stripePromise;

      const response = await fetch('http://localhost:5000/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          items: [
            { id: 2, quantity: 1 }, // Replace with the correct item IDs and quantities
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

  const BBCheckoutClick = async () => {
    try {
      const stripe = await stripePromise;

      const response = await fetch('http://localhost:5000/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          items: [
            { id: 3, quantity: 1 }, // Replace with the correct item IDs and quantities
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




  const handleSubmit = async(e) => {
    try {
      e.preventDefault();
      const response = await fetch("http://localhost:5000/help",{
        method:"POST",
        headers:{"Content-type":"Application/json"},
        body:JSON.stringify(formData)
      })
        if (response.ok) {
      // Handle success, e.g., show a success message or redirect
      console.log('Form submitted successfully');
      alert("we will get back with you shortly")
    } else {
      // Handle errors, e.g., show an error message
      console.error('Form submission failed');
    }
    } catch (error) {
      console.error('Error submitting form:', error);
    }

    setFormData({
      name:"",
    phone:"",
    email:"",
    industry:"",
    bproblem:""
    })
    
    
  };

  return <>
  
  <div className="help-container">

  
  
    <section>
  <h2>Econsensus helps with..</h2>
  <br/>
 

  <h3>Elevated Decision-Making through Data-Driven Insights</h3>
  <p>
    Harness the power of advanced data collection, survey creation,econometric models, and comprehensive economic reports to help you make the most informed decison everytime.
  </p>
<button className="btn btn-success" onClick={ECheckoutClick}>
          Checkout for Econometrics
        </button>
        <button className="btn btn-warning">

    
      <a class="buy-with-crypto"
        href="https://commerce.coinbase.com/checkout/0c0d43cb-056c-45a9-9783-1dae8d8e2686">
        Buy with Crypto
      </a>
      <script src="https://commerce.coinbase.com/v1/checkout.js?version=201807">
      </script>
    

        </button>
  <h3>Blockchain Solutions Tailored for Your Business</h3>
  <p>
    Explore the potential of blockchain with our feasibility and use case studies. Identify specific applications for your business, and let our experts develop custom DAOs, DApps, custom tokens, or NFTs. Leverage the transformative capabilities of smart contracts and blockchain technology to enhance operational efficiency and security.
  </p>
  <button className="btn btn-success" onClick={BCheckoutClick}>
          Checkout for Blockchain Solutions
        </button>
        <button className="btn btn-warning">

   
      <a class="buy-with-crypto"
        href="https://commerce.coinbase.com/checkout/79ae64ac-73e6-41ce-852f-8f9f612ce0ee">
        Buy with Crypto
      </a>
      <script src="https://commerce.coinbase.com/v1/checkout.js?version=201807">
      </script>
 

        </button>
  <h3>Holistic Business Development Services</h3>
  <p>
    Propel your business forward with our comprehensive web development, SEO, social media management (SMM), and content marketing solutions. From building a strong online presence to executing successful marketing campaigns, our business development offerings are designed to enhance your brand visibility and drive growth.
  </p>
    <button className="btn btn-success" onClick={BBCheckoutClick}>
          Checkout for Business Development Services
        </button>
        <button className="btn btn-warning">

    
      <a class="buy-with-crypto"
        href="https://commerce.coinbase.com/checkout/5fdd83e6-315d-4847-910c-3b2f3e75ba19">
        Buy with Crypto
      </a>
      <script src="https://commerce.coinbase.com/v1/checkout.js?version=201807">
      </script>
  

        </button>
<br>
</br>
<div>
   <p>
Our services are designed to empower your company, fostering innovation, efficiency, and sustained success in today's dynamic market.
    Please feel free to complete the form and a representative will be with you shortly.
  </p>
</div>
 
  
      
      
</section>

    
       <form action="http://localhost:5000:/help" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            name="phone"
            id="phone"
             className="form-control"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            id="email"
             className="form-control"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="industry">Industry:</label>
          <input
            type="text"
            name="industry"
            id="industry"
             className="form-control"
            value={formData.industry}
            onChange={handleInputChange}
            placeholder="Industry"
          />
        </div>
        <div className="form-group">
          <label htmlFor="bproblem">Business Problem:</label>
          <textarea
            type="text"
            name="bproblem"
            id="bproblem"
            value={formData.bproblem}
             className="form-control"
            onChange={handleInputChange}
            placeholder="Business Problem"
            rows={4}
          />
        </div>
        <button  className = "btn btn-warning" type="submit" id="btn">
          Submit
        </button>
      </form>
      </div>
    </>

};
 export default Help;