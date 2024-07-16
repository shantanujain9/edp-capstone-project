import React from 'react';
//import './Contact.css';

const Contact = () => {
  return (
    <div className="container contact-container">
      <h2>Contact Us</h2>
      <p>If you have any questions or comments, please don't hesitate to contact us at <a href="mailto:contact@umbrella.com">contact@umbrella.com</a>.</p>
      <p>You can also reach us by phone at (123) 456-7890.</p>
      <h3>Our Office</h3>
      <p>Umbrella Store</p>
      <p>1234 Market Street</p>
      <p>City, State, ZIP</p>
      <h3>Business Hours</h3>
      <p>Monday - Friday: 9:00 AM to 5:00 PM</p>
      <p>Saturday: 10:00 AM to 4:00 PM</p>
      <p>Sunday: Closed</p>
    </div>
  );
};

export default Contact;
