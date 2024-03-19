import React, { useState } from 'react';
import AiwithImage from '../components/AiwithImage';

const Home = () => {
  const [aiWith, setLAiWith] = useState('text');

  const handleAiWith = (value) => {
    setLAiWith(value);
  }

  return (
    <div>
      <h1>Turners</h1>
      <p>Find your next with us</p>

      

      {
          <AiwithImage />
      }
    </div>
  );
};

export default Home;